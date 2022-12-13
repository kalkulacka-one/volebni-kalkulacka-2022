from datetime import datetime
import time
from typing import Optional

from gspread import Client
from gspread import Worksheet

from generator import logger
from generator.extract_helpers import extract_answers
from generator.extract_helpers import extract_contacts
from generator.extract_helpers import extract_key
from generator.extract_helpers import extract_order
from generator.extract_helpers import extract_question_definitions
from generator.extract_helpers import reorder_question_definitions
from generator.types import Candidate
from generator.types import CandidateType
from generator.types import District
from generator.types import Election
from generator.types import gen_candidate_id
from generator.types import gen_district_id
from generator.types import gen_question_id
from generator.types import InstructionKey
from generator.types import Party
from generator.types import QuestionDefinition
from generator.types import QuestionDefinitionColumnNames
from generator.types import SheetRow


def extract_election_komunalni(
    gc: Client, row: SheetRow, wait: int, election: Optional[Election] = None
) -> Election:
    name = str(row["name"])

    if election is None:
        return _extract_election_komunalni(gc, row, wait=wait)
    else:
        time.sleep(wait)
        return _update_election_komunalni(gc, row, name, election)
        return election


def _extract_election_komunalni(gc: Client, row: SheetRow, wait: int) -> Election:
    election = Election(
        id="komunalni-2022",
        key="komunalni-2022",
        name="Komunální volby 2022",
        description="PLACEHOLDER",
        voting_from=datetime(2022, 9, 23, 14, 0, 0),
        voting_to=datetime(2022, 9, 24, 14, 0, 0),
        instructions={
            InstructionKey.HEADER: "Zvolte své město",
            InstructionKey.STEP_1_1: "PLACEHOLDER",
            InstructionKey.STEP_2_1: """
Čeká vás 30-40 otázek. Na stejné otázky nám odpověděly kandidující
strany. Zodpovězení otázek zabere cca 10 minut.
Na konci se dozvíte, jak se strany shodují s Vašimi názory.
                """,
        },
    )

    url_questions = str(row["otázky originál"])
    key_questions = extract_key(url_questions)
    logger.info("Loading questions from URL %s (%s)", url_questions, key_questions)

    # load file
    doc_questions = gc.open_by_key(key_questions)

    # read existing districts
    logger.info("Loading districts")
    election.add_districts(
        extract_komunalni_districts(doc_questions.worksheet("seznam"), election)
    )
    time.sleep(wait)

    # for each district load set of questions
    logger.info("Loading question definitions")
    for pos, district in enumerate(election.districts.values()):
        if not district.active:
            logger.info("Skipping loading questions for district %s", district)
            continue
        logger.info(
            "\t%d: Extracting question definitions for district: %s", pos, district
        )
        election.add_question_definitions(
            district,
            extract_komunalni_question_definitions(
                doc_questions.worksheet(district.name),
                election,
                district,
            ),
        )
        time.sleep(wait)

    url_candidates = str(row["kandidáti"])
    key_candidates = extract_key(url_candidates)
    # load file
    doc_candidates = gc.open_by_key(key_candidates)
    # for each district load set of candidates
    logger.info("Loading list of candidates")
    for pos, district in enumerate(election.districts.values()):
        if not district.active:
            logger.info("Skipping loading questions for district %s", district)
            continue
        logger.info("\t%d: Extracting candidates for district: %s", pos, district)
        election.add_candidates(
            district,
            extract_komunalni_candidates(
                doc_candidates.worksheet(district.name),
                election,
                district,
            ),
        )
        time.sleep(wait)

    num_active_districts = len([d for d in election.districts.values() if d.active])

    election.description = (
        f"K dispozici jsou kalkulačky pro **{num_active_districts}** "
        "měst České republiky."
    )
    election.instructions[InstructionKey.STEP_1_1] = election.description

    return election


def extract_komunalni_districts(
    sheet: Worksheet,
    election: Election,
) -> dict[str, District]:
    logger.info("Extracting districts for election %s", election)
    districts: dict[str, District] = {}
    for row in sheet.get_all_records(
        expected_headers=[
            "město",
            "code",
            "description",
            "active",
        ]
    ):
        active = str(row["active"]).strip()
        code = str(row["code"])
        district = District(
            id=gen_district_id(election, code),
            name=str(row["město"]),
            code=code,
            show_code=False,
            description=str(row["description"]),
            active=bool(int(active)) if active else False,
            on_hp_from=datetime(2022, 9, 1, 0, 0, 0),
            on_hp_to=datetime(2022, 9, 30, 14, 0, 0),
        )
        logger.info("\tExtracted district: %s", district)
        districts[str(row["město"])] = district
    logger.info("Districts extracted: %d", len(districts))

    return districts


def extract_komunalni_question_definitions(
    sheet: Worksheet,
    election: Election,
    district: District,
) -> list[QuestionDefinition]:
    return extract_question_definitions(
        sheet=sheet,
        election=election,
        district=district,
        columns=QuestionDefinitionColumnNames(
            id="číslo",
            name="jméno otázky",
            title="otázka",
            gist="popis",
            detail="vysvětlení pojmů",
            tags="tagy",
            order="order",
        ),
    )

    logger.info("Extracting question definitions")
    definitions: list[QuestionDefinition] = []
    for row in sheet.get_all_records(
        expected_headers=[
            "číslo",
            "jméno otázky",
            "otázka",
            "popis",
            "vysvětlení pojmů",
            "tagy",
        ]
    ):
        question_num = int(row["číslo"])
        definition = QuestionDefinition(
            id=gen_question_id(election, district, question_num),
            num=question_num,
            name=str(row["jméno otázky"]),
            title=str(row["otázka"]),
            gist=str(row["popis"]),
            detail=str(row["vysvětlení pojmů"]),
            tags=[s.strip() for s in str(row["tagy"]).split(",")]
            if str(row["tagy"]).strip()
            else [],
            order=extract_order(row, "order"),
        )
        definitions.append(definition)
    logger.info("Extracted question definitions: %d", len(definitions))
    return reorder_question_definitions(definitions)


def extract_komunalni_candidates(
    sheet: Worksheet,
    election: Election,
    district: District,
) -> dict[str, Candidate]:
    logger.info("Extracting candidates")
    candidates: dict[str, Candidate] = {}
    for row in sheet.get_all_records():
        secret_code = str(row["code"])
        candidate_id = gen_candidate_id(election, district, secret_code)
        contacts = extract_contacts(row)
        candidate = Candidate(
            id=candidate_id,
            num=int(row["id"]),
            name=str(row["name"]),
            short_name=str(row["short_name"]),
            abbreviation=str(row["abbreviation"]),
            description=str(row["name"]),
            secret_code=secret_code,
            important=bool(int(row["important"] or "0")),
            active=True,
            type=CandidateType.party,
            logo=None,  # logo never contains valid value => ignore - str(row["logo"])
            contact=str(row["contact 1"]) or None,
            contact_party=str(row["contact party"]) or None,
            contacts=contacts,
            people=str(row["people"]) or None,
            parties=[
                Party(
                    id=f"{candidate_id}-p",
                    name=str(row["name"]),
                    short_name=str(row["short_name"]),
                    abbreviation=str(row["abbreviation"]),
                    description=str(row["name"]),
                    contacts=contacts,
                )
            ],
        )
        candidates[secret_code] = candidate
    logger.info("Extraction candidates: %d", len(candidates))

    return candidates


def _update_election_komunalni(
    gc: Client, row: SheetRow, name: str, election: Election
) -> Election:
    # now read answers for different cities
    district = election.districts.get(name)
    if not district:
        logger.error(
            "Unknown district: %s; known districts: %s",
            name,
            [(d.name, d.name == name) for d in election.districts.values()],
        )
        return election
    if district not in election.definitions:
        logger.info(
            "Skipping district %s - no question definitions",
            district,
        )
        return election
    if not district.active:
        logger.info(
            "Skipping district %s - not active",
            district,
        )
        return election

    logger.info("Extracting answers for district: %s", district)
    url_answers = str(row["odpovědi"])
    key_answers = extract_key(url_answers)
    # load file
    doc_answers = gc.open_by_key(key_answers)
    election.add_answers(
        district,
        extract_answers(
            doc_answers.worksheet("Form Responses 1"),
            election,
            district,
        ),
    )

    return election

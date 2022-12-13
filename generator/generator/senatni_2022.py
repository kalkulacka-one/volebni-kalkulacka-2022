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
from generator.types import SheetRow


def extract_election_senat(
    gc: Client, row: SheetRow, wait: int, election: Optional[Election] = None
) -> Election:
    election = Election(
        id="senatni-2022",
        key="senatni-2022",
        name="Senátní volby 2022",
        description="Letos se volí v třetině obvodů v rámci ČR.",
        voting_from=datetime(2022, 9, 23, 14, 0, 0),
        voting_to=datetime(2022, 9, 24, 14, 0, 0),
        instructions={
            InstructionKey.HEADER: "Zvolte svůj senátní obvod",
            InstructionKey.STEP_1_1: "Letos se volí v třetině obvodů v rámci ČR.",
            InstructionKey.STEP_1_2: "Více o senátních obvodech",
            InstructionKey.STEP_1_LINK: "https://2022.programydovoleb.cz/senatni-volby",
            InstructionKey.STEP_2_1: """
Odpovězte na 40 otázek.
Na stejné otázky odpověděli kandidáti na senátory ve vašem volebním obvodu.
Zodpovězení otázek zabere cca 10 minut.
Na konci se dozvíte,
jak se kandidáti shodují s Vašimi názory.
            """,
        },
    )

    url_candidates = str(row["kandidáti"])
    key_candidates = extract_key(url_candidates)
    # load file
    doc_candidates = gc.open_by_key(key_candidates)
    sheet_candidates = doc_candidates.worksheet("candidates")
    # read existing districts
    logger.info("Loading districts")
    election.add_districts(extract_senatni_districts(sheet_candidates, election))
    time.sleep(wait)

    # for each district load set of candidates
    logger.info("Loading list of candidates")
    for pos, district in enumerate(election.districts.values()):
        logger.info("\t%d: Extracting candidates for district: %s", pos, district)
        election.add_candidates(
            district, extract_senatni_candidates(sheet_candidates, election, district)
        )

    time.sleep(wait)

    url_questions = str(row["otázky originál"])
    key_questions = extract_key(url_questions)
    logger.info("Loading questions from URL %s (%s)", url_questions, key_questions)

    # load file
    doc_questions = gc.open_by_key(key_questions)
    sheet_questions = doc_questions.worksheet("OTÁZKY")
    district_global = District(
        gen_district_id(election, "global"), "global", "global", "global", True
    )
    question_definitions = extract_senatni_question_definitions(
        sheet_questions,
        election,
        district_global,
    )

    # for each district load set of questions
    logger.info("Loading question definitions")
    for pos, district in enumerate(election.districts.values()):
        logger.info(
            "\t%d: Extracting question definitions for district: %s", pos, district
        )
        if not district.active:
            logger.info("Skipping loading questions for district %s", district)
            continue
        election.add_question_definitions(
            district,
            question_definitions,
        )
    time.sleep(wait)

    logger.info("Extracting answers")
    url_answers = str(row["odpovědi"])
    key_answers = extract_key(url_answers)
    # load file
    doc_answers = gc.open_by_key(key_answers)
    sheet_answers = doc_answers.worksheet("Form Responses 1")

    for district in election.districts.values():
        if not district.active:
            logger.info("Skipping loading questions for district %s", district)
            continue
        candidates = election.candidates[district]
        answers = extract_answers(sheet_answers, election, district)
        election.add_answers(
            district, {c: a for c, a in answers.items() if c in candidates}
        )
        time.sleep(wait)

    return election


def extract_senatni_districts(
    sheet: Worksheet,
    election: Election,
) -> dict[str, District]:
    logger.info("Extracting districts for election %s", election)
    districts: dict[str, District] = {}
    for row in sheet.get_all_records():
        code = str(row["obvod"])
        if code not in districts:
            active = str(row["active"]).strip()
            districts[code] = District(
                id=gen_district_id(election, code),
                name=str(row["obvod_name"]),
                description=str(row["obvod_description"]),
                code=code,
                show_code=True,
                active=bool(int(active)) if active else False,
                on_hp_from=datetime(2022, 9, 1, 0, 0, 0),
                on_hp_to=datetime(2022, 9, 30, 14, 0, 0),
            )

    return districts


def extract_senatni_candidates(
    sheet: Worksheet, election: Election, district: District
) -> dict[str, Candidate]:
    logger.info("Extracting candidates")
    candidates: dict[str, Candidate] = {}
    for row in sheet.get_all_records():
        if str(row["obvod"]) != district.code:
            continue
        secret_code = str(row["code"])
        name = f"{row['given_name']} {row['family_name']}"
        candidate_id = gen_candidate_id(election, district, secret_code)
        contacts = extract_contacts(row)
        is_active = bool(int(str(row["active_candidate"]) or "1"))
        candidate = Candidate(
            id=candidate_id,
            num=len(candidates) + 1,
            name=name,
            short_name=name,
            abbreviation=name,
            description=name,
            given_name=str(row["given_name"]),
            family_name=str(row["family_name"]),
            secret_code=secret_code,
            important=bool(int(str(row["important"]) or "0")),
            active=is_active,
            type=CandidateType.person,
            logo=None,  # photo never contains valid value => ignore str(row["photo"])
            contact=str(row["contact 1"]) or None,
            contact_party=str(row["contact party"]) or None,
            contacts=contacts,
            people=None,
            parties=[
                Party(
                    id=f"{candidate_id}-p",
                    name=str(row["party"]),
                    short_name=str(row["party"]),
                    abbreviation=str(row["party"]),
                    description=str(row["party"]),
                    contacts=contacts,
                )
            ],
        )
        candidates[secret_code] = candidate
    logger.info("Extraction candidates: %d", len(candidates))
    return candidates


def extract_senatni_question_definitions(
    sheet: Worksheet,
    election: Election,
    district: District,
) -> list[QuestionDefinition]:
    logger.info("Extracting question definitions")
    definitions: list[QuestionDefinition] = []
    for row in sheet.get_all_records():
        q_num = int(row["id"])
        definition = QuestionDefinition(
            id=gen_question_id(election, district, q_num),
            num=q_num,
            name=str(row["name"]),
            title=str(row["question"]),
            gist=str(row["description"]),
            detail=str(row["vysvětlení pojmů"]),
            tags=[str(row["téma"])],
            order=extract_order(row, "order"),
        )
        definitions.append(definition)
    logger.info("Extracted question definitions: %d", len(definitions))
    return reorder_question_definitions(definitions)

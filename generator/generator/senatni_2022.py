import time
from typing import Optional

from gspread import Client
from gspread import Worksheet

from generator import logger
from generator.extract_helpers import extract_answers
from generator.extract_helpers import extract_candidate
from generator.extract_helpers import extract_key
from generator.extract_helpers import extract_question_definitions
from generator.types import Candidate
from generator.types import District
from generator.types import Election
from generator.types import ElectionMetadata
from generator.types import gen_district_id
from generator.types import QuestionDefinition
from generator.types import QuestionDefinitionColumnNames
from generator.types import SheetRow


def extract_election_senatni(
    gc: Client,
    row: SheetRow,
    metadata: ElectionMetadata,
    wait: int,
    election: Optional[Election] = None,
) -> Election:
    election = Election(
        id=metadata.key,
        key=metadata.key,
        name=metadata.name,
        description=metadata.description,
        voting_from=metadata.voting_from,
        voting_to=metadata.voting_to,
        instructions=metadata.instructions,
    )

    url_candidates = str(row["kandidáti"])
    key_candidates = extract_key(url_candidates)
    # load file
    doc_candidates = gc.open_by_key(key_candidates)
    sheet_candidates = doc_candidates.worksheet("candidates")
    # read existing districts
    logger.info("Loading districts")
    election.add_districts(
        extract_senatni_districts(sheet_candidates, election, metadata)
    )
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
    metadata: ElectionMetadata,
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
                on_hp_from=metadata.on_hp_from,
                on_hp_to=metadata.on_hp_to,
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
        candidate = extract_candidate(row, len(candidates) + 1, election, district)

        candidates[candidate.secret_code] = candidate
    logger.info("Extraction candidates: %d", len(candidates))
    return candidates


def extract_senatni_question_definitions(
    sheet: Worksheet,
    election: Election,
    district: District,
) -> list[QuestionDefinition]:
    return extract_question_definitions(
        sheet=sheet,
        election=election,
        district=district,
        columns=QuestionDefinitionColumnNames(
            id="id",
            name="name",
            title="question",
            gist="description",
            detail="vysvětlení pojmů",
            tags="téma",
            order="order",
        ),
    )

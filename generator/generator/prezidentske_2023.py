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


def extract_election_prezidentske(
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

    districts_with_sheets = [
        (
            District(
                '2e0e6853-4305-4dec-abdc-a47d458b1b95',
                "Pro každého",
                "Kalkulačka vhodná pro všechny občany.",
                "1-kolo",
                False,
                on_hp_from=metadata.on_hp_from,
                on_hp_to=metadata.on_hp_to,
            ),
            "classic",
        ),
        (
            District(
                '575a8e7b-b2a5-4257-9a61-c25db4242403',
                "Pro politické nadšence",
                "Kalkulačka vhodná pro všechny politické nadšence.",
                "pro-politicke-nadsence-1-kolo",
                False,
                on_hp_from=metadata.on_hp_from,
                on_hp_to=metadata.on_hp_to,
            ),
            "ultimate",
        ),
        (
            District(
                'b82ed10e-72b3-4a3c-8019-e024fd8c1ea4',
                "Pro mladé",
                "Kalkulačka vhodná pro všechny mladé občany.",
                "pro-mlade",
                False,
                on_hp_from=metadata.on_hp_from,
                on_hp_to=metadata.on_hp_to,
            ),
            "young",
        ),
    ]

    for ds in districts_with_sheets:
        district = ds[0]
        sheet_name = ds[1]
        election.add_districts({district.code: district})

        url_candidates = str(row["kandidáti"])
        key_candidates = extract_key(url_candidates)
        # load file
        doc_candidates = gc.open_by_key(key_candidates)
        sheet_candidates = doc_candidates.worksheet("candidates")

        logger.info("Loading list of candidates")
        election.add_candidates(
            district,
            extract_prezidentske_candidates(sheet_candidates, election, district),
        )

        time.sleep(wait)

        url_questions = str(row["otázky originál"])
        key_questions = extract_key(url_questions)
        logger.info("Loading questions from URL %s (%s)", url_questions, key_questions)

        # load file
        doc_questions = gc.open_by_key(key_questions)
        sheet_questions = doc_questions.worksheet(sheet_name)

        question_definitions = extract_prezidentske_question_definitions(
            sheet_questions,
            election,
            district,
        )

        # for each district load set of questions
        logger.info("Loading question definitions")
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


def extract_prezidentske_candidates(
    sheet: Worksheet, election: Election, district: District
) -> dict[str, Candidate]:
    logger.info("Extracting candidates")
    candidates: dict[str, Candidate] = {}
    for row in sheet.get_all_records():
        candidate = extract_candidate(row, len(candidates) + 1, election, district)

        candidates[candidate.secret_code] = candidate
    logger.info("Extraction candidates: %d", len(candidates))
    return candidates


def extract_prezidentske_question_definitions(
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
            detail="detail",
            tags="tags",
            order="order",
        ),
    )

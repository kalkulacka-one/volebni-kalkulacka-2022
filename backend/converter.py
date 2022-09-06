#!/usr/bin/env python

import argparse
from dataclasses import dataclass
from hashlib import md5
import logging
from random import randint
import re
import sys
import time
from typing import Any, Optional
import uuid

import gspread

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stderr)
handler.setLevel(logging.INFO)
logger.addHandler(handler)

parser = argparse.ArgumentParser()
parser.add_argument(
    "--wait",
    type=float,
    help="Wait the specified number of seconds between requests to Google Sheet",
    default=2.0,
)
parser.add_argument(
    "--doc-parties",
    help="Google Sheet key for parties",
    default="1ifl4AvHbY2VwyF3XkXIFwBhaZUSPmOx1RGHX6c74CZM",
)

# It expects google sheet, where one sheet contains the list of cities
# other sheets - named by the cities contain questions
parser.add_argument(
    "--questions-doc-key",
    help="Google Sheet key for questions",
    default="1Cie7HLf1VTYvQyqKwOfzkzDnxl2e9CMDwS0URmxOVGI",
)

parser.add_argument(
    "--questions-district-list",
    help="Google Sheet key for questions",
    default="seznam",
)


# https://docs.google.com/spreadsheets/d/1pXDk3Bv1TOKZEo_G3qDb-alvJHNbdjH0AKotrgXfZuI
parser.add_argument(
    "--doc-answers",
    help="Google Sheet key for answers",
    default="1pXDk3Bv1TOKZEo_G3qDb-alvJHNbdjH0AKotrgXfZuI",
)

parser.add_argument(
    "--sheet-answers", help="Sheet name for answers", default="Form Responses 1"
)

parser.add_argument("--output", help="Output folder")

# TODO: there should be some sheet or additional parameters
# describing voting districts

args = parser.parse_args()


def add_element(struct: dict[str, str], key: str, val: Optional[str]) -> None:
    if val is not None:
        struct[key] = val


@dataclass(eq=True, frozen=True)
class District:
    name: str
    code: str


@dataclass
class QuestionDefinition:
    id: uuid.UUID
    num: int
    name: str
    title: str
    gist: str
    detail: str
    tags: list[str]


class Election:
    def __init__(self) -> None:
        self._districts: list[District] = []
        self._definitions: dict[District, list[QuestionDefinition]] = {}

    def add_districts(self, districts: list[District]) -> None:
        self._districts.extend(districts)

    @property
    def districts(self) -> list[District]:
        return self._districts

    def add_question_definitions(
        self, district: District, definitions: list[QuestionDefinition]
    ) -> None:
        self._definitions[district] = definitions


@dataclass
class Question:
    answer: Optional[str] = None
    comment: Optional[str] = None


@dataclass
class Candidate:
    name: str
    questions: dict[str, Question]


def extract_questions(row: dict[str, Any]) -> dict[str, Question]:
    def convert_answer(a: str) -> Optional[str]:
        return {"ano": "yes", "ne": "no"}.get(a.lower())

    questions = dict()
    text = ""
    answer = ""
    for k, v in row.items():
        if re.match(r"\d+\.", k):
            text = k
            answer = v
        if text:
            questions[text] = Question(convert_answer(answer), v)
            text = ""

    return questions


def generate_question_id(pos: int, txt: str) -> str:
    return f"q-{pos:03}-{md5(txt.encode()).hexdigest()}"


def generate_questions(questions: dict[str, Question]) -> list[dict[str, Any]]:
    result = []
    for pos, text in enumerate(questions.keys()):
        result.append(
            {
                "id": generate_question_id(pos, text),
                "name": f"?Name: {text[:15]}",
                "title": text,
                "gist": f"?Gist: {randint(2, 4) * text}",
                "detail": f"?Detail: {randint(3, 6) * text}",
                "tags": [f"?tag-{randint(1, 5)}" for _ in range(randint(1, 3))],
            }
        )

    return result


def generate_candidate_id(pos: int, txt: str) -> str:
    return f"c-{pos:03}-{md5(txt.encode()).hexdigest()}"


def generate_candidates(candidates: dict[str, Candidate]) -> list[dict[str, str]]:
    result = []
    for pos, key in enumerate(candidates.keys()):
        candidate = candidates[key]
        result.append(
            {
                "id": generate_candidate_id(pos, key),
                "name": candidate.name,
                "type": "party",  # TODO
                "description": f"?Desc: {candidate.name}",
            }
        )
    return result


def generate_answers(candidates: dict[str, Candidate]) -> list[dict[str, str]]:
    result = []
    for c_pos, c_key in enumerate(candidates.keys()):
        candidate = candidates[c_key]
        for q_pos, q_key in enumerate(candidate.questions.keys()):
            question = candidate.questions[q_key]
            candidate_id = generate_candidate_id(c_pos, c_key)
            question_id = generate_question_id(q_pos, q_key)
            answer_structure = {
                "id": f"{candidate_id}-{question_id}",
                "candidate_id": candidate_id,
                "question_id": question_id,
            }
            add_element(answer_structure, "answer", question.answer)
            add_element(answer_structure, "comment", question.comment)
            result.append(answer_structure)
    return result


def extract_districts(sheet: gspread.worksheet.Worksheet) -> list[District]:
    logger.info("Extracting districts")
    districts: list[District] = []
    for pos, row in enumerate(sheet.get_all_values()):
        if not pos:
            # first line is header => so lets skip it
            continue
        district = District(row[0], row[1])
        logger.info("\tExtracted district: %s", district)
        districts.append(district)
    logger.info("Districts extracted: %d", len(districts))

    return districts


def extract_question_definitions(
    sheet: gspread.worksheet.Worksheet,
) -> list[QuestionDefinition]:
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
        definition = QuestionDefinition(
            id=uuid.uuid4(),
            num=int(row["číslo"]),
            name=str(row["jméno otázky"]),
            title=str(row["otázka"]),
            gist=str(row["popis"]),
            detail=str(row["vysvětlení pojmů"]),
            tags=[s.strip() for s in str(row["tagy"]).split(",")],
        )
        definitions.append(definition)
    logger.info("Extraction question definitions: %d", len(definitions))
    return definitions


gc = gspread.service_account()

election = Election()

doc_questions = gc.open_by_key(args.questions_doc_key)

# read existing districts
logger.info("Loading districts")
election.add_districts(
    extract_districts(doc_questions.worksheet(args.questions_district_list))
)
time.sleep(args.wait)

# for each district load set of questions
logger.info("Loading question definitions")
for district in election.districts:
    logger.info("\tExtracting question definitions for district: %s", district)
    election.add_question_definitions(
        district, extract_question_definitions(doc_questions.worksheet(district.name))
    )
    time.sleep(args.wait)


# 1 / 0

# doc_answers = gc.open_by_key(args.doc_answers)

# sheet_answers = doc_answers.worksheet(args.sheet_answers)

# data_answers = sheet_answers.get_all_records()

# candidates = dict()

# known_questions = []
# for row in data_answers:
#     name = str(row["Jméno strany:"])
#     questions = extract_questions(row)
#     candidates[name] = Candidate(name, questions)
#     known_questions = questions


# output_structure = {
#     "id": "?senatni-2022-51",
#     "name": "?Senatni volby 2022 - obvod 51",
#     "description": "?Senatni volby - description",
#     "election": {
#         "id": "?uuid-sen-senatni-2022",
#         "key": "?senatni-2022",
#         "name": "?Senatni volby 2022",
#         "description": "?Senatni volby - description",
#     },
#     "questions": {},
#     "candidates": {},
#     "answers": {},
# }  # type: Dict[str, Any]

# output_structure["questions"] = generate_questions(questions)
# output_structure["candidates"] = generate_candidates(candidates)
# output_structure["answers"] = generate_answers(candidates)


# print(json.dumps(output_structure))

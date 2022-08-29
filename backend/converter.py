#!/usr/bin/env python

import argparse
from dataclasses import dataclass
from hashlib import md5
import json
from random import randint
import re
from typing import Any

import gspread

parser = argparse.ArgumentParser()
parser.add_argument(
    "--doc-parties",
    help="Google Sheet key for parties",
    default="1ifl4AvHbY2VwyF3XkXIFwBhaZUSPmOx1RGHX6c74CZM",
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


def add_element(struct: dict[str, str], key: str, val: str | None) -> None:
    if val is not None:
        struct[key] = val


@dataclass
class Question:
    answer: str | None = None
    comment: str | None = None


@dataclass
class Candidate:
    name: str
    questions: dict[str, Question]


def extract_questions(row: dict[str, str]) -> dict[str, Question]:
    def convert_answer(a: str) -> str | None:
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


gc = gspread.service_account()
doc_answers = gc.open_by_key(args.doc_answers)

sheet_answers = doc_answers.worksheet(args.sheet_answers)

data_answers = sheet_answers.get_all_records()

candidates = dict()

for row in data_answers:
    name = row["Jméno strany:"]
    questions = extract_questions(row)
    candidates[name] = Candidate(name, questions)


output_structure = {
    "id": "?senatni-2022-51",
    "name": "?Senatni volby 2022 - obvod 51",
    "description": "?Senatni volby - description",
    "election": {
        "id": "?uuid-sen-senatni-2022",
        "key": "?senatni-2022",
        "name": "?Senatni volby 2022",
        "description": "?Senatni volby - description",
    },
    "questions": {},
    "candidates": {},
    "answers": {},
}  # type: dict[str, Any]

output_structure["questions"] = generate_questions(questions)
output_structure["candidates"] = generate_candidates(candidates)
output_structure["answers"] = generate_answers(candidates)


print(json.dumps(output_structure))

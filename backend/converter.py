#!/usr/bin/env python

import argparse
from dataclasses import dataclass
from datetime import datetime
from hashlib import md5
import json
import logging
from pathlib import Path
from random import randint
import re
import sys
import time
from typing import Any, Dict, Optional
import uuid

import gspread

SheetRow = dict[str, Any]

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stderr)
handler.setLevel(logging.INFO)
logger.addHandler(handler)


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


@dataclass(eq=True, frozen=True)
class Candidate:
    id: uuid.UUID
    num: int
    name: str
    short_name: str
    abbreviation: str
    secret_code: str
    important: bool
    contact: Optional[str]
    contact_party: Optional[str]
    fb: Optional[str]
    tw: Optional[str]
    ig: Optional[str]
    wiki: Optional[str]
    web: Optional[str]
    yt: Optional[str]
    program: Optional[str]
    linkedin: Optional[str]
    people: Optional[str]


@dataclass
class QuestionAnswer:
    answer: Optional[str] = None
    comment: Optional[str] = None
    is_important: bool = False


@dataclass
class CandidateAnswers:
    timestamp: datetime
    candidate: str
    filled_by: str
    secret_code: str
    answers: list[QuestionAnswer]


class Election:
    def __init__(self, *, id: str, key: str, name: str, description: str) -> None:
        self.id = id
        self.key = key
        self.name = name
        self.description = description
        self._districts: dict[str, District] = {}
        self._definitions: dict[District, list[QuestionDefinition]] = {}
        self._candidates: dict[District, dict[str, Candidate]] = {}
        self._answers: dict[District, dict[str, CandidateAnswers]] = {}

    def add_districts(self, districts: dict[str, District]) -> None:
        self._districts.update(districts)

    @property
    def districts(self) -> dict[str, District]:
        return self._districts

    def add_question_definitions(
        self, district: District, definitions: list[QuestionDefinition]
    ) -> None:
        self._definitions[district] = definitions

    @property
    def definitions(self) -> dict[District, list[QuestionDefinition]]:
        return self._definitions

    def add_candidates(
        self, district: District, candidates: dict[str, Candidate]
    ) -> None:
        self._candidates[district] = candidates

    @property
    def candidates(self) -> dict[District, dict[str, Candidate]]:
        return self._candidates

    def add_answers(
        self, district: District, answers: dict[str, CandidateAnswers]
    ) -> None:
        self._answers[district] = answers

    @property
    def answers(self) -> dict[District, dict[str, CandidateAnswers]]:
        return self._answers


def extract_questions(row: dict[str, Any]) -> dict[str, QuestionAnswer]:
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
            questions[text] = QuestionAnswer(convert_answer(answer), v)
            text = ""

    return questions


def generate_question_id(pos: int, txt: str) -> str:
    return f"q-{pos:03}-{md5(txt.encode()).hexdigest()}"


def generate_questions(questions: dict[str, QuestionAnswer]) -> list[dict[str, Any]]:
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


# def generate_answers(candidates: dict[str, Candidate]) -> list[dict[str, str]]:
#     result = []
#     for c_pos, c_key in enumerate(candidates.keys()):
#         candidate = candidates[c_key]
#         for q_pos, q_key in enumerate(candidate.questions.keys()):
#             question = candidate.questions[q_key]
#             candidate_id = generate_candidate_id(c_pos, c_key)
#             question_id = generate_question_id(q_pos, q_key)
#             answer_structure = {
#                 "id": f"{candidate_id}-{question_id}",
#                 "candidate_id": candidate_id,
#                 "question_id": question_id,
#             }
#             add_element(answer_structure, "answer", question.answer)
#             add_element(answer_structure, "comment", question.comment)
#             result.append(answer_structure)
#     return result


def extract_districts(sheet: gspread.worksheet.Worksheet) -> dict[str, District]:
    logger.info("Extracting districts")
    districts: dict[str, District] = {}
    for pos, row in enumerate(sheet.get_all_values()):
        if not pos:
            # first line is header => so lets skip it
            continue
        district = District(row[0], row[1])
        logger.info("\tExtracted district: %s", district)
        districts[row[0]] = district
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
            tags=[s.strip() for s in str(row["tagy"]).split(",")]
            if str(row["tagy"]).strip()
            else [],
        )
        definitions.append(definition)
    logger.info("Extracted question definitions: %d", len(definitions))
    return definitions


def extract_candidates(
    sheet: gspread.worksheet.Worksheet,
) -> dict[str, Candidate]:
    logger.info("Extracting candidates")
    candidates: dict[str, Candidate] = {}
    for row in sheet.get_all_records():
        secret_code = str(row["code"])
        candidate = Candidate(
            id=uuid.uuid4(),
            num=int(row["id"]),
            name=str(row["name"]),
            short_name=str(row["short_name"]),
            abbreviation=str(row["abbreviation"]),
            secret_code=secret_code,
            important=bool(int(row["important"] or "0")),
            contact=str(row["contact 1"]) or None,
            contact_party=str(row["contact party"]) or None,
            fb=str(row["fb"]) or None,
            tw=str(row["tw"]) or None,
            ig=str(row["ig"]) or None,
            wiki=str(row["wiki"]) or None,
            web=str(row["web"]) or None,
            yt=str(row["yt"]) or None,
            program=str(row["program"]) or None,
            linkedin=str(row["linkedin"]) or None,
            people=str(row["people"]) or None,
        )
        candidates[secret_code] = candidate
    logger.info("Extraction candidates: %d", len(candidates))

    return candidates


def extract_answers(
    sheet: gspread.worksheet.Worksheet,
) -> dict[str, CandidateAnswers]:
    logger.info("Extracting answers: %s", sheet.title)
    res: dict[str, CandidateAnswers] = {}
    # TODO: We are relaying on fixed column order
    for pos, row in enumerate(sheet.get_all_values()):
        if pos == 0:
            # skip header
            continue
        ts = datetime.strptime(str(row[0]), "%m/%d/%Y %H:%M:%S")
        candidate = str(row[1])
        filled_by = str(row[2])
        secret_code = str(row[3])
        answers: list[QuestionAnswer] = []
        for i in range(4, len(row), 3):
            if i + 2 > len(row):
                continue
            # print(i, row[i])
            answers.append(
                QuestionAnswer(
                    answer=str(row[i]) or None,
                    comment=str(row[i + 1]) or None,
                    # TODO: find how it's marked
                    is_important=False,
                )
            )

        candidate_answer = CandidateAnswers(
            timestamp=ts,
            candidate=candidate,
            filled_by=filled_by,
            secret_code=secret_code,
            answers=answers,
        )

        res[secret_code] = candidate_answer

    logger.info("Extracted candidates: %d", len(res))
    return res


GOOGLE_SHEET_URL_REGEX = re.compile("https://docs.google.com/spreadsheets/d/([^/]+)/.*")


def extract_key(url: str) -> Optional[str]:
    """
    >>> extract_key("https://docs.google.com/spreadsheets/d/1-VqiamcH8ph/edit#gid=0")
    '1-VqiamcH8ph'
    >>> extract_key("foo") is None
    True
    """
    match = GOOGLE_SHEET_URL_REGEX.match(url)
    if match:
        return match.group(1)
    return None


def extract_election_senat(gc: gspread.Client, row: SheetRow) -> Election:
    return Election(
        id="senat-2022",
        key="senat-2022",
        name="senat-2022",
        description="senat-2022",
    )


def extract_election_komunalni(gc: gspread.Client, row: SheetRow) -> Election:
    election = Election(
        id="komunalni-2022",
        key="komunalni-2022",
        name="komunalni-2022",
        description="komunalni-2022",
    )

    url_questions = str(row["otázky originál"])
    key_questions = extract_key(url_questions)
    logger.info("Loading questions from URL %s (%s)", url_questions, key_questions)

    # load file
    doc_questions = gc.open_by_key(key_questions)

    # read existing districts
    logger.info("Loading districts")
    election.add_districts(extract_districts(doc_questions.worksheet("seznam")))
    time.sleep(args.wait)

    # for each district load set of questions
    logger.info("Loading question definitions")
    for pos, district in enumerate(election.districts.values()):
        logger.info(
            "\t%d: Extracting question definitions for district: %s", pos, district
        )
        election.add_question_definitions(
            district,
            extract_question_definitions(doc_questions.worksheet(district.name)),
        )
        time.sleep(args.wait)
        # if pos > 2:
        #     break

    url_candidates = str(row["kandidáti"])
    key_candidates = extract_key(url_candidates)
    # load file
    doc_candidates = gc.open_by_key(key_candidates)
    # for each district load set of candidates
    logger.info("Loading list of candidates")
    for pos, district in enumerate(election.districts.values()):
        logger.info("\t%d: Extracting candidates for district: %s", pos, district)
        election.add_candidates(
            district, extract_candidates(doc_candidates.worksheet(district.name))
        )
        time.sleep(args.wait)
        # if pos > 2:
        #     break

    return election


def convert_answer(a: str) -> Optional[str]:
    return {
        "ano": "yes",
        "ne": "no",
        "Nevím / nemáme jednoznačný názor": "dont_know",
    }.get(a.lower())


def generate_calculator_dict(election: Election, district: District) -> dict[str, Any]:
    logger.info(
        "Generate dict for election: %s and district: %s", election.id, district
    )
    d = {
        "id": f"{election.id}-{district.code}",
        "name": district.name,
        "description": f"{district.name} - DESCRIPTION",
        "district_code": district.code,
        "election": {
            "id": election.id,
            "key": election.key,
            "name": election.name,
            "description": election.description,
        },
        "questions": [],
        "candidates": [],
        "answers": [],
    }  # type: Dict[str, Any]

    q_def = election.definitions[district]
    for q in q_def:
        d["questions"].append(
            {
                "id": f"{election.id}-{district.code}-question-{q.num}",
                "name": q.name,
                "title": q.title,
                "gist": q.gist,
                "detail": q.detail,
                "tags": q.tags,
            }
        )
    candidates = election.candidates[district]
    for candidate in candidates.values():
        c_dict = {
            "id": f"{election.id}-{district.code}-candidate-{candidate.secret_code}",
            "name": candidate.name,
            "type": "party",
            "description": f"{candidate.name} - DESCRIPTION",
        }  # type: Dict[str, Any]

        contacts = {"web": []}  # type: Dict[str, Any]
        if candidate.fb:
            contacts["facebook"] = candidate.fb
        if candidate.tw:
            contacts["twitter"] = candidate.tw
        if candidate.ig:
            contacts["instagram"] = candidate.ig
        if candidate.web:
            contacts["web"].append(
                {
                    "url": candidate.web,
                    "label": "web",
                }
            )
        if candidate.program:
            contacts["web"].append(
                {
                    "url": candidate.program,
                    "label": "program",
                }
            )
        if candidate.wiki:
            contacts["web"].append(
                {
                    "url": candidate.wiki,
                    "label": "wiki",
                }
            )
        if candidate.linkedin:
            contacts["web"].append(
                {
                    "url": candidate.linkedin,
                    "label": "linkedin",
                }
            )

        c_dict["contacts"] = contacts
        c_dict["parties"] = [
            {
                "id": f"{election.id}-{district.code}-{candidate.secret_code}-party",
                "name": candidate.name,
                "description": f"{candidate.name} - DESCRIPTION",
                "contacts": contacts,
                "abbreviation": candidate.abbreviation,
            }
        ]
        d["candidates"].append(c_dict)

    all_answers = election.answers[district]
    for secret_code, candidate_answers in all_answers.items():
        q_num = 1
        if secret_code not in candidates:
            logger.warning(
                "Unknown secret code %s for election %s and district %s",
                secret_code,
                election.key,
                district,
            )
            continue
        for answer in candidate_answers.answers:
            answer_dict = {
                "id": f"{election.id}-{district.code}-answer-{secret_code}-{q_num}",
                "candidate_id": (
                    f"{election.id}-{district.code}-candidate-{secret_code}"
                ),
                "question_id": (f"{election.id}-{district.code}-question-{q_num}"),
            }
            add_element(
                answer_dict,
                "answer",
                convert_answer(answer.answer) if answer.answer else None,
            )
            add_element(answer_dict, "comment", answer.comment)

            d["answers"].append(answer_dict)
            q_num += 1

    return d


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--wait",
        type=float,
        help="Wait the specified number of seconds between requests to Google Sheet",
        default=5.0,
    )
    parser.add_argument(
        "--doc-key",
        help="Google Sheet key for parties",
        default="1-VqiamcH8phGtg2glC2FcOyxvYrXSaNiir1mMlVEXPs",
    )
    parser.add_argument(
        "--output",
        help="Output folder",
        default="../data/kalkulacka",
    )

    # TODO: there should be some sheet or additional parameters
    # describing voting districts

    args = parser.parse_args()

    gc = gspread.service_account()

    elections: dict[str, Election] = {}
    doc_overview = gc.open_by_key(args.doc_key)
    city_started = False
    for rec in doc_overview.worksheet("Sheet1").get_all_records():
        name = str(rec["name"])
        if name == "Senát":
            elections["senat-2022"] = extract_election_senat(gc, rec)
        elif name == "Města":
            elections["komunalni-2022"] = extract_election_komunalni(gc, rec)
            city_started = True
        elif city_started and name:
            election = elections["komunalni-2022"]
            # now read answers for different cities
            district = election.districts.get(name)
            if not district:
                logger.error(
                    "Unknown district: %s; known districts: %s",
                    name,
                    [d.name for d in election.districts.values()],
                )
                continue
            if district not in election.definitions:
                continue

            logger.info("Extracting answers for district: %s", district)
            url_answers = str(rec["odpovědi"])
            key_answers = extract_key(url_answers)
            # load file
            doc_answers = gc.open_by_key(key_answers)
            election.add_answers(
                district, extract_answers(doc_answers.worksheet("Form Responses 1"))
            )
            time.sleep(args.wait)

    # produce output file
    output_root = Path(args.output)
    output_root.mkdir(parents=True, exist_ok=True)

    calculators_dict = {
        "elections": [],
        "calculators": [],
    }  # type: Dict[str, Any]
    for election_key, election in elections.items():
        calculators_dict["elections"].append(
            {
                "id": election.id,
                "key": election.key,
                "name": election.name,
                "description": election.description,
            }
        )
        for district in election.districts.values():
            calculators_dict["calculators"].append(
                {
                    "election_id": election.id,
                    "district_code": district.code,
                    "name": district.name,
                    "description": f"{district.name} - DESCRIPTION",
                    # TODO
                    "on_hp_from": "2021-01-01",
                    "on_hp_to": "2031-01-01",
                }
            )
            calculator_dict = generate_calculator_dict(election, district)
            calculator_file = output_root / election_key / f"{district.code}.json"
            with calculator_file.open(mode="w", encoding="utf-8") as fh:
                json.dump(calculator_dict, fh, indent=2, ensure_ascii=False)

    calculators_file = output_root / "calculators.json"
    with calculators_file.open(mode="w", encoding="utf-8") as fh:
        json.dump(calculators_dict, fh, indent=2, ensure_ascii=False)


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

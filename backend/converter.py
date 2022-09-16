#!/usr/bin/env python

import argparse
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime
from enum import Enum
import json
import logging
from pathlib import Path
import re
import sys
import time
from typing import Any, Dict, Optional

import gspread

SheetRow = dict[str, Any]

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stderr)
handler.setLevel(logging.INFO)
logger.addHandler(handler)


def add_element(struct: dict[str, Any], key: str, val: Optional[Any]) -> None:
    if val is not None:
        struct[key] = val


@dataclass(eq=True, frozen=True)
class District:
    id: str
    name: str
    description: str
    code: str
    show_code: bool = False
    active: bool = True
    on_hp_from: Optional[datetime] = None
    on_hp_to: Optional[datetime] = None


@dataclass
class QuestionDefinition:
    id: str
    num: int
    name: str
    title: str
    gist: str
    detail: str
    tags: list[str]
    order: Optional[float] = None


class CandidateType(Enum):
    party = "party"
    person = "person"


@dataclass(eq=True, frozen=True)
class Contacts:
    fb: Optional[str]
    tw: Optional[str]
    ig: Optional[str]
    wiki: Optional[str]
    web: Optional[str]
    yt: Optional[str]
    program: Optional[str]
    linkedin: Optional[str]


@dataclass(eq=True, frozen=True)
class Party:
    id: str
    name: str
    short_name: str
    abbreviation: str
    description: str
    contacts: Contacts


@dataclass(eq=True, frozen=True)
class Candidate:
    id: str
    num: int
    name: str
    short_name: str
    abbreviation: str
    description: str
    secret_code: str
    important: bool
    type: CandidateType
    parties: list[Party]
    contacts: Contacts
    logo: Optional[str]
    contact: Optional[str]
    contact_party: Optional[str]
    people: Optional[str]
    given_name: Optional[str] = None
    family_name: Optional[str] = None


@dataclass
class QuestionAnswer:
    id: str
    question_id: str
    candidate_id: str
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
    motto: Optional[str] = None


class InstructionKey(Enum):
    HEADER = "header"
    STEP_1_1 = "step_1_1"
    STEP_1_2 = "step_1_2"
    STEP_1_LINK = "step_1_link"
    STEP_2_1 = "step_2_1"


class Election:
    def __init__(
        self,
        *,
        id: str,
        key: str,
        name: str,
        description: str,
        voting_from: datetime,
        voting_to: datetime,
        instructions: dict[InstructionKey, str],
    ) -> None:
        self.id = id
        self.key = key
        self.name = name
        self.description = description
        self.voting_from = voting_from
        self.voting_to = voting_to
        self.instructions = instructions
        self._districts: dict[str, District] = {}
        self._definitions: dict[District, list[QuestionDefinition]] = defaultdict(list)
        self._candidates: dict[District, dict[str, Candidate]] = defaultdict(dict)
        self._answers: dict[District, dict[str, CandidateAnswers]] = defaultdict(dict)

    def add_districts(self, districts: dict[str, District]) -> None:
        logger.info("Adding district %d", len(districts))
        self._districts.update(districts)

    @property
    def districts(self) -> dict[str, District]:
        return self._districts

    def add_question_definitions(
        self, district: District, definitions: list[QuestionDefinition]
    ) -> None:
        logger.info(
            "Adding definitions for district %s: %d", district, len(definitions)
        )
        self._definitions[district].extend(definitions)

    @property
    def definitions(self) -> dict[District, list[QuestionDefinition]]:
        return self._definitions

    def add_candidates(
        self, district: District, candidates: dict[str, Candidate]
    ) -> None:
        logger.info("Adding candidates for district %s: %d", district, len(candidates))
        self._candidates[district].update(candidates)

    @property
    def candidates(self) -> dict[District, dict[str, Candidate]]:
        return self._candidates

    def add_answers(
        self, district: District, answers: dict[str, CandidateAnswers]
    ) -> None:
        logger.info("Adding answers for district %s: %d", district, len(answers))
        self._answers[district].update(answers)

    @property
    def answers(self) -> dict[District, dict[str, CandidateAnswers]]:
        return self._answers

    def __str__(self) -> str:
        return f"Election(id='{self.id}', key='{self.key}', name='{self.name}')"


def gen_district_id(election: Election, code: str) -> str:
    return f"{election.key}-{code}"


def gen_id(election: Election, district: District, suffix: str) -> str:
    return f"{election.key}-{district.code}-{suffix}"


def gen_question_id(election: Election, district: District, num: int) -> str:
    return gen_id(election, district, f"q-{num}")


def gen_candidate_id(election: Election, district: District, code: str) -> str:
    return gen_id(election, district, f"c-{code}")


def gen_answer_id(election: Election, district: District, code: str, num: int) -> str:
    return gen_id(election, district, f"a-{code}-{num}")


def reorder_question_definitions(
    questions: list[QuestionDefinition],
) -> list[QuestionDefinition]:
    orders = {i: q.order for i, q in enumerate(questions)}
    if len(set(orders.values())) == 1:
        # if there is single value => don't do any ordering
        return questions

    return [
        questions[i]
        for i, order in sorted(orders.items(), key=lambda x: (x[1] is None, x[1]))
        if order is not None
    ]


def extract_order(row: dict[str, Any], key: str) -> Optional[float]:
    """
    Extract order from the row
    >>> extract_order({}, "order") is None
    True
    >>> extract_order({'order': '0'}, "order") is None
    True
    >>> extract_order({'order': ' '}, "order") is None
    True
    >>> extract_order({'order': '0.2'}, "order")
    0.2
    """
    order_r = row.get(key)
    if not order_r:
        return None
    order_s = str(order_r).strip()
    if not order_s:
        return None
    order_f = float(order_s)
    if not order_f:
        return None
    return order_f


def extract_komunalni_districts(
    sheet: gspread.worksheet.Worksheet,
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
    sheet: gspread.worksheet.Worksheet,
    election: Election,
    district: District,
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


def extract_contacts(row: SheetRow) -> Contacts:
    return Contacts(
        fb=str(row["fb"]) or None,
        tw=str(row["tw"]) or None,
        ig=str(row["ig"]) or None,
        wiki=str(row["wiki"]) or None,
        web=str(row["web"]) or None,
        yt=str(row["yt"]) or None,
        program=str(row["program"]) or None,
        linkedin=str(row["linkedin"]) or None,
    )


def extract_komunalni_candidates(
    sheet: gspread.worksheet.Worksheet,
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
            type=CandidateType.party,
            logo=str(row["logo"]) or None,
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


def extract_answers(
    sheet: gspread.worksheet.Worksheet,
    election: Election,
    district: District,
) -> dict[str, CandidateAnswers]:
    logger.info("Extracting answers for district: %s", district)
    res: dict[str, CandidateAnswers] = {}
    # TODO: We are relaying on fixed column order

    mapping = {}  # type: Dict[int, str]
    for row in sheet.get_all_records(election):
        ts = datetime.strptime(str(row["Timestamp"]), "%m/%d/%Y %H:%M:%S")
        candidate_name = str(row.get("Jméno kandidáta:", row.get("Jméno strany:")))
        filled_by = str(row["Jméno osoby, která vyplňuje dotazník:"])
        secret_code = str(row["Bezpečnostní kód:"])
        motto = str(row.get('Vaše charakteristika ("bio", "motto"):', "")) or None
        answers: list[QuestionAnswer] = []

        candidate = election.candidates[district].get(secret_code)
        if not candidate:
            logger.warning(
                "Unknown secret code %s for election %s, district %s and candidate %s",
                secret_code,
                election.key,
                district,
                candidate_name,
            )
            continue

        # construct mapping between question number and column name
        # we cannot relly on the fact that there is exactly the same
        # wording
        if not mapping:
            pattern = re.compile(r"(\d+)\. ")
            for key in row.keys():
                m = pattern.match(key)
                if m:
                    mapping[int(m.group(1))] = key

        for q in election.definitions[district]:
            answer_col = mapping.get(q.num)
            if not answer_col:
                logger.error(
                    "Missing answers column for question: %d. %s",
                    q.num,
                    q.title,
                )
                continue
            comment_col = f"Případný komentář k otázce {q.num}"
            is_important_col_kom = f"Téma otázky {q.num} je pro nás velmi důležité."
            is_important_col_sen = f"Téma otázky {q.num} je pro mě velmi důležité."
            answers.append(
                QuestionAnswer(
                    id=gen_answer_id(election, district, secret_code, q.num),
                    question_id=q.id,
                    candidate_id=candidate.id,
                    answer=convert_answer(str(row[answer_col])) or None,
                    comment=convert_comment(str(row[comment_col])) or None,
                    is_important=bool(
                        row.get(is_important_col_kom, row.get(is_important_col_sen))
                    ),
                )
            )

        logger.info(
            "Extracted answers for candidate %s (%s), district %s: %d",
            candidate,
            secret_code,
            district,
            len(answers),
        )

        candidate_answer = CandidateAnswers(
            timestamp=ts,
            candidate=candidate_name,
            filled_by=filled_by,
            secret_code=secret_code,
            answers=answers,
            motto=motto,
        )

        res[secret_code] = candidate_answer

    logger.info("Extracted answers for %d candidates", len(res))
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


def extract_senatni_districts(
    sheet: gspread.worksheet.Worksheet,
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
    sheet: gspread.worksheet.Worksheet, election: Election, district: District
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
            important=bool(int(row["important"] or "0")),
            type=CandidateType.person,
            logo=str(row["photo"]) or None,
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
    sheet: gspread.worksheet.Worksheet,
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


def extract_election_senat(gc: gspread.Client, row: SheetRow) -> Election:
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
    time.sleep(args.wait)

    # for each district load set of candidates
    logger.info("Loading list of candidates")
    for pos, district in enumerate(election.districts.values()):
        logger.info("\t%d: Extracting candidates for district: %s", pos, district)
        election.add_candidates(
            district, extract_senatni_candidates(sheet_candidates, election, district)
        )

    time.sleep(args.wait)

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
    time.sleep(args.wait)

    logger.info("Extracting answers")
    url_answers = str(rec["odpovědi"])
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
        time.sleep(args.wait)

    return election


def extract_election_komunalni(gc: gspread.Client, row: SheetRow) -> Election:
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
    time.sleep(args.wait)

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
        time.sleep(args.wait)

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
        time.sleep(args.wait)

    num_active_districts = len([d for d in election.districts.values() if d.active])

    election.description = (
        f"K dispozici jsou kalkulačky pro **{num_active_districts}** "
        "měst České republiky."
    )
    election.instructions[InstructionKey.STEP_1_1] = election.description

    return election


def convert_answer(a: str) -> Optional[str]:
    return {
        "ano": "yes",
        "ne": "no",
        "nevím / nemám jednoznačný názor": "dont_know",
        "nevím / nemáme jednoznačný názor": "dont_know",
    }.get(a.lower())


def convert_comment(c: str) -> Optional[str]:
    # sometimes is value in empty column 0, so we should handle it
    if c in {"0", ""}:
        return None
    return c


def generate_election_dict(election: Election) -> dict[str, Any]:
    d = {
        "id": election.id,
        "key": election.key,
        "name": election.name,
        "description": election.description,
        "instructions": {k.value: v for k, v in election.instructions.items()},
    }  # type: Dict[str, Any]
    add_element(
        d, "from", election.voting_from.isoformat() if election.voting_from else None
    )
    add_element(d, "to", election.voting_to.isoformat() if election.voting_to else None)

    return d


def generate_contacts(contacts: Contacts) -> dict[str, Any]:
    res = {"web": []}  # type: Dict[str, Any]
    if contacts.fb:
        res["facebook"] = contacts.fb
    if contacts.tw:
        res["twitter"] = contacts.tw
    if contacts.ig:
        res["instagram"] = contacts.ig
    if contacts.web:
        res["web"].append(
            {
                "url": contacts.web,
                "label": "web",
            }
        )
    if contacts.program:
        res["web"].append(
            {
                "url": contacts.program,
                "label": "program",
            }
        )
    if contacts.wiki:
        res["web"].append(
            {
                "url": contacts.wiki,
                "label": "wiki",
            }
        )
    if contacts.linkedin:
        res["web"].append(
            {
                "url": contacts.linkedin,
                "label": "linkedin",
            }
        )
    return res


def generate_party(party: Party) -> dict[str, Any]:
    return {
        "id": party.id,
        "name": party.name,
        "short_name": party.short_name,
        "abbreviation": party.abbreviation,
        "description": party.description,
        "contacts": generate_contacts(party.contacts),
    }


def generate_calculator_dict(election: Election, district: District) -> dict[str, Any]:
    logger.info(
        "Generate dict for election: %s and district: %s", election.id, district
    )
    d = {
        "id": district.id,
        "name": district.name,
        "description": district.description,
        "district_code": district.code,
        "show_district_code": district.show_code,
        "election": generate_election_dict(election),
        "questions": [],
        "candidates": [],
        "answers": [],
    }  # type: Dict[str, Any]

    q_def = election.definitions[district]
    for q in q_def:
        d["questions"].append(
            {
                "id": q.id,
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
            "id": candidate.id,
            "name": candidate.name,
            "type": candidate.type.value,
            "description": candidate.description,
            "short_name": candidate.short_name,
        }  # type: Dict[str, Any]
        add_element(c_dict, "img_url", candidate.logo)
        add_element(c_dict, "given_name", candidate.given_name)
        add_element(c_dict, "family_name", candidate.family_name)

        contacts = generate_contacts(candidate.contacts)

        c_dict["contacts"] = contacts
        c_dict["parties"] = [generate_party(p) for p in candidate.parties]
        answers = election.answers[district].get(candidate.secret_code)
        if answers:
            add_element(c_dict, "motto", answers.motto)
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
        logger.info(
            "Generating answers for district %s and candidate %s with answers %d",
            district,
            candidate_answers.candidate,
            len(candidate_answers.answers),
        )
        for answer in candidate_answers.answers:
            answer_dict = {
                "id": answer.id,
                "candidate_id": answer.candidate_id,
                "question_id": answer.question_id,
            }
            add_element(
                answer_dict,
                "answer",
                answer.answer,
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
            elections["senatni-2022"] = extract_election_senat(gc, rec)
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
                    [(d.name, d.name == name) for d in election.districts.values()],
                )
                continue
            if district not in election.definitions:
                logger.info(
                    "Skipping district %s - no question definitions",
                    district,
                )
                continue
            if not district.active:
                logger.info(
                    "Skipping district %s - not active",
                    district,
                )
                continue

            logger.info("Extracting answers for district: %s", district)
            url_answers = str(rec["odpovědi"])
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
            time.sleep(args.wait)

    # produce output file
    output_root = Path(args.output)
    output_root.mkdir(parents=True, exist_ok=True)

    calculators_dict = {
        "elections": [],
        "calculators": [],
    }  # type: Dict[str, Any]
    for election_key, election in elections.items():
        election_root = output_root / election_key
        election_root.mkdir(parents=True, exist_ok=True)
        calculators_dict["elections"].append(generate_election_dict(election))
        for district in election.districts.values():
            if not district.active:
                logger.info(
                    "Skipping generation for district %s - not active",
                    district,
                )
                continue
            calc_dict = {
                "election_id": election.id,
                "district_code": district.code,
                "show_district_code": district.show_code,
                "name": district.name,
                "description": district.description,
            }
            add_element(
                calc_dict,
                "on_hp_from",
                district.on_hp_from.isoformat() if district.on_hp_from else None,
            )
            add_element(
                calc_dict,
                "on_hp_to",
                district.on_hp_to.isoformat() if district.on_hp_to else None,
            )
            calculators_dict["calculators"].append(calc_dict)
            calculator_dict = generate_calculator_dict(election, district)
            calculator_file = election_root / f"{district.code}.json"
            with calculator_file.open(mode="w", encoding="utf-8") as fh:
                json.dump(calculator_dict, fh, indent=2, ensure_ascii=False)
                logger.info("Calculator file stored into %s", calculator_file)

    calculators_file = output_root / "calculators.json"
    with calculators_file.open(mode="w", encoding="utf-8") as fh:
        json.dump(calculators_dict, fh, indent=2, ensure_ascii=False)
        logger.info("Index stored into %s", calculators_file)

from dataclasses import asdict
from datetime import datetime
import re
from typing import Any, Dict, Optional

from gspread import Worksheet

from generator import logger
from generator.types import Candidate
from generator.types import CandidateAnswers
from generator.types import CandidateType
from generator.types import Contacts
from generator.types import District
from generator.types import Election
from generator.types import gen_answer_id
from generator.types import gen_candidate_id
from generator.types import gen_question_id
from generator.types import Party
from generator.types import QuestionAnswer
from generator.types import QuestionDefinition
from generator.types import QuestionDefinitionColumnNames
from generator.types import SheetRow

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


def get_s(row: SheetRow, key: str) -> Optional[str]:
    if key not in row:
        return None
    return str(row[key]) or None


def get_sf(row: SheetRow, key: str) -> Optional[str]:
    res = get_s(row, key)
    if not res:
        res = get_s(row, f"{key}:")
    return res


def extract_contacts(row: SheetRow) -> Contacts:
    return Contacts(
        fb=get_s(row, "fb"),
        tw=get_s(row, "tw"),
        ig=get_s(row, "ig"),
        wiki=get_s(row, "wiki"),
        web=get_s(row, "web"),
        yt=get_s(row, "yt"),
        program=get_s(row, "program"),
        linkedin=get_s(row, "linkedin"),
    )


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


def extract_answers(
    sheet: Worksheet,
    election: Election,
    district: District,
) -> dict[str, CandidateAnswers]:
    logger.info("Extracting answers for district: %s", district)
    res: dict[str, CandidateAnswers] = {}
    # TODO: We are relaying on fixed column order

    mapping = {}  # type: Dict[int, str]
    for row in sheet.get_all_records():
        ts = datetime.strptime(str(row["Timestamp"]), "%m/%d/%Y %H:%M:%S")
        candidate_name = str(row.get("Jméno kandidáta:", row.get("Jméno strany:")))
        filled_by = get_sf(row, "Jméno osoby, která vyplňuje dotazník")
        assert filled_by is not None
        secret_code = get_sf(row, "Bezpečnostní kód")
        assert secret_code is not None
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


def convert_answer(a: str) -> Optional[str]:
    return {
        "ano": "yes",
        "ne": "no",
        "nevím / nemám jednoznačný názor": "dont_know",
        "nevím / nemáme jednoznačný názor": "dont_know",
    }.get(a.lower())


def convert_comment(c: str) -> Optional[str]:
    """
    Sometimes is value in empty column 0, so we should handle it

    >>> convert_comment("") is None
    True
    >>> convert_comment("0") is None
    True
    >>> convert_comment("AAA")
    'AAA'
    """

    if c in {"0", ""}:
        return None
    return c


def extract_candidate(
    row: SheetRow, pos: int, election: Election, district: District
) -> Candidate:
    secret_code = str(row["code"])
    name = f"{row['given_name']} {row['family_name']}"
    candidate_id = gen_candidate_id(election, district, secret_code)
    contacts = extract_contacts(row)
    is_active = bool(int(str(row["active_candidate"]) or "1"))
    parties = []
    if "party" in row:
        parties.append(
            Party(
                id=f"{candidate_id}-p",
                name=str(row["party"]),
                short_name=str(row["party"]),
                abbreviation=str(row["party"]),
                description=str(row["party"]),
                contacts=contacts,
            )
        )
    return Candidate(
        id=candidate_id,
        num=pos,
        name=name,
        short_name=name,
        abbreviation=name,
        description=name,
        given_name=str(row["given_name"]),
        family_name=str(row["family_name"]),
        secret_code=secret_code,
        important=bool(int(get_s(row, "important") or "0")),
        active=is_active,
        type=CandidateType.person,
        logo=None,  # photo never contains valid value => ignore str(row["photo"])
        contact=get_s(row, "contact 1"),
        contact_party=get_s(row, "contact party"),
        contacts=contacts,
        people=None,
        parties=parties,
    )


def extract_question_definitions(
    sheet: Worksheet,
    election: Election,
    district: District,
    columns: QuestionDefinitionColumnNames,
) -> list[QuestionDefinition]:
    logger.info("Extracting question definitions")
    definitions: list[QuestionDefinition] = []
    for row in sheet.get_all_records(
        expected_headers=asdict(columns).values(),
    ):
        q_num = int(row[columns.id])
        definition = QuestionDefinition(
            id=gen_question_id(election, district, q_num),
            num=q_num,
            name=str(row[columns.name]),
            title=str(row[columns.title]),
            gist=str(row[columns.gist]),
            detail=str(row[columns.detail]),
            tags=[s.strip() for s in str(row[columns.tags]).split(",")]
            if str(row[columns.tags]).strip()
            else [],
            order=extract_order(row, columns.order),
        )
        definitions.append(definition)
    logger.info("Extracted question definitions: %d", len(definitions))
    return reorder_question_definitions(definitions)

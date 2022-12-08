import json
from pathlib import Path
from typing import Any, Dict, Optional

from generator import logger
from generator.types import Contacts
from generator.types import District
from generator.types import Election
from generator.types import Party


def generate(output_root: Path, elections: dict[str, Election]) -> None:
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


def add_element(struct: dict[str, Any], key: str, val: Optional[Any]) -> None:
    if val is not None:
        struct[key] = val


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
            "is_active": candidate.active,
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

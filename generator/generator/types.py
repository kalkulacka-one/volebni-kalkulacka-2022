from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Any, Optional

from main import ElectionType

from generator import logger

SheetRow = dict[str, Any]


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
    active: bool
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
        instructions: dict[str, str],
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


@dataclass
class ElectionMetadata:
    key: str
    name: str
    election_type: ElectionType
    description: str
    voting_from: datetime
    voting_to: datetime
    on_hp_from: datetime
    on_hp_to: datetime
    instructions: dict[str, str]


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


@dataclass()
class QuestionDefinitionColumnNames:
    id: str = "id"
    name: str = "name"
    title: str = "question"
    gist: str = "description"
    detail: str = "vysvětlení pojmů"
    tags: str = "téma"
    order: str = "order"

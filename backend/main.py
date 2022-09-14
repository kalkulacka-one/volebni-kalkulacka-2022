from datetime import datetime
from enum import Enum
import os
from typing import Optional
import uuid

import boto3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel

app = FastAPI()

origin_regex = r"https://volebni-kalkulacka-2022-git-.*\.vercel\.app"

app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

handler = Mangum(app)

table = None


def get_table():
    global table
    if table is None:
        dynamodb = boto3.resource(
            service_name="dynamodb",
            endpoint_url=os.environ.get("DYNAMODB_URL"),
        )
        table = dynamodb.Table("Results")
    return table


class Answer(BaseModel):
    question_id: str
    answer: str


class Candidate(BaseModel):
    candidate_id: str
    name: str
    short_name: str
    abbreviation: str
    logo: str


class Match(BaseModel):
    candidate: Candidate
    score: int


class ElectionType(str, Enum):
    senatni = "senatni"
    prezidentske = "prezidentske"
    snemovni = "snemovni"
    krajske = "krajske"
    municipalni = "municipalni"
    undefined = "undefined"


class Election(BaseModel):
    id: str
    key: str
    name: str
    description: str
    type: ElectionType


class Calculator(BaseModel):
    id: str
    name: str
    description: str
    district_code: str
    election: Election


class ResultIn(BaseModel):
    answers: list[Answer]  # type: ignore  # noqa
    matches: list[Match]  # type: ignore  # noqa
    calculator: Calculator
    source: Optional[str] = None


class ResultOut(BaseModel):
    result_id: str
    created_at: datetime
    answers: list[Answer]  # type: ignore  # noqa
    matches: list[Match]  # type: ignore  # noqa
    calculator: Calculator
    source: Optional[str] = None


class ResultAdded(BaseModel):
    result_id: str


@app.post("/api/results/", response_model=ResultAdded)
def results_add(result: ResultIn):
    # Specify the table
    result_uuid = str(uuid.uuid4())
    get_table().put_item(
        # Data to be inserted
        Item={
            "result_id": result_uuid,
            "created_at": datetime.now().isoformat(),
            "result": result.dict(),
        }
    )
    return ResultAdded(result_id=result_uuid)


@app.get("/api/results/{result_id}", response_model=ResultOut)
def results_get(result_id: str):
    response = get_table().get_item(Key={"result_id": result_id})
    item = response["Item"]
    result = item["result"]
    calculator = result["calculator"]
    return ResultOut(
        result_id=item["result_id"],
        created_at=datetime.fromisoformat(item["created_at"]),
        answers=[Answer(**a) for a in result["answers"]],
        matches=[
            Match(candidate=Candidate(**m["candidate"]), score=m["score"])
            for m in result["matches"]
        ],
        calculator=Calculator(
            id=calculator["id"],
            name=calculator["name"],
            description=calculator["description"],
            district_code=calculator["district_code"],
            election=Election(
                id=calculator["election"]["id"],
                key=calculator["election"]["key"],
                name=calculator["election"]["name"],
                description=calculator["election"]["description"],
                type=ElectionType(calculator["election"]["type"]),
            ),
        ),
        source=result.get("source"),
    )

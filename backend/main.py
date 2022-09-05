from datetime import datetime
import os
import uuid

import boto3
from fastapi import FastAPI
from mangum import Mangum
from pydantic import BaseModel

app = FastAPI()

handler = Mangum(app)

dynamodb = boto3.resource(
    service_name="dynamodb",
    endpoint_url=os.environ.get("DYNAMODB_URL"),
)


class Answer(BaseModel):
    question_id: str
    answer: str


class ResultIn(BaseModel):
    answers: list[Answer]  # type: ignore  # noqa


class ResultOut(BaseModel):
    result_id: str
    created_at: datetime
    answers: list[Answer]  # type: ignore  # noqa


class ResultAdded(BaseModel):
    result_id: str


@app.post("/api/results/", response_model=ResultAdded)
def results_add(result: ResultIn):
    # Specify the table
    results_table = dynamodb.Table("Results")
    result_uuid = str(uuid.uuid4())
    results_table.put_item(
        # Data to be inserted
        Item={
            "result_id": result_uuid,
            "created_at": datetime.now().isoformat(),
            "result": result.dict(),
        }
    )
    return ResultAdded(result_id=result_uuid)


@app.get("/api/results/{result_id}")
def results_get(result_id: str):
    results_table = dynamodb.Table("Results")
    response = results_table.get_item(Key={"result_id": result_id})
    item = response["Item"]
    return ResultOut(
        result_id=item["result_id"],
        created_at=datetime.fromisoformat(item["created_at"]),
        answers=[Answer(**a) for a in item["result"]["answers"]],
    )

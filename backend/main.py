from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

handler = Mangum(app)


@app.get("/")
def read_root():
    return {"Hello": "World!"}

@app.get("/test")
def test1():
    return {"Test": "Test1"}

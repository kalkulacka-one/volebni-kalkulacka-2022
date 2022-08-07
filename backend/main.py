from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

handler = Mangum(app)


@app.get("/api")
def read_root():
    return {"Hello": "World!!"}

@app.get("/api/test")
def test1():
    return {"Test": "Test1"}

@app.get("/api/test2")
def test2():
    return {"Test": "Test2"}

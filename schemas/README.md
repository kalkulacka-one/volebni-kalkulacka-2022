# Schema

## Idea

- There is pool of available questions (`question.schema.json`).
- There is pool of existing candidates (`candidate.schema.json`).
- There is a database of candidates answers on some subset of questions (`candidate-answers.schema.json`).
- There is pool of existing elections (`election.schema.json`).

From these files we can generate single file that would contain all the questions, candidates, and answers that are relevant for given election and location (`kalkulacka.schema.json`).

## TODO

- How to represent when candidate changes their answer?

# Schema

- https://json-schema.org/understanding-json-schema/index.html

## Idea

- There is a pool of available questions (`question.schema.json`).
- There is a pool of existing candidates (`candidate.schema.json`).
- There is a database of candidates' answers to some subset of questions (`candidate-answers.schema.json`).
- There is a pool of existing elections (`election.schema.json`).

From these files, we can generate a single file that would contain all the questions, candidates, and answers that are relevant for a given election and location (`kalkulacka.schema.json`).

## TODO

- How to represent when a candidate changes their answer?

## Validation

- https://github.com/ajv-validator/ajv-cli
- `./validate.sh`
- to generate validator:
  - install `npm install js-beautify`
  - compile - `ajv compile -s calculator.schema.json -r candidate-answer.schema.json -r candidate.schema.json -r contact.schema.json -r election.schema.json -r party.schema.json -r question.schema.json -o | js-beautify > validate.js`

## Code Generation

- https://www.npmjs.com/package/json-schema-to-typescript
  - install - `npm install json-schema-to-typescript`
  - generate - `json2ts -i '*.schema.json' -o generated` - but it does not work because of references?

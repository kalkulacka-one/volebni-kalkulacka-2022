# Schema

- https://json-schema.org/understanding-json-schema/index.html

## How To Use It

1. Load `data/kalkulacka/calculators.json` to get the list of elections and districts. It has schema `calculators.schema.json`.
2. When the district is selected, then load the calculator itself which is at `data/kalkulacka/${election.key}/${district_id}.json`. It has schema `calculator.schema.json`.

- if the current date is outside of `on_hp_from` and `on_hp_to` - then do not display the calculator

## Idea

- There is a pool of available questions (`question.schema.json`).
- There is a pool of existing candidates (`candidate.schema.json`).
- There is a database of candidates' answers to some subset of questions (`candidate-answers.schema.json`).
- There is a pool of existing elections (`election.schema.json`).

From these files, we can generate a single file that would contain all the questions, candidates, and answers that are relevant for a given election and location (`calculator.schema.json`).

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

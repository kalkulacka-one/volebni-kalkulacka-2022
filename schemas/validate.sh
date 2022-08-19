#!/bin/sh

echo "Validate calculators";
for f in `find ../data/kalkulacka/ -mindepth 2 -name '*.json'`; do
    echo "Validating ${f}";
    ajv validate --verbose -s calculator.schema.json -d "${f}" -r candidate-answer.schema.json -r candidate.schema.json -r contact.schema.json -r election.schema.json -r party.schema.json -r question.schema.json;
done;

echo "Validate list of calculators"
ajv validate --verbose -s calculators.schema.json -d ../data/kalkulacka/calculators.json -r election.schema.json

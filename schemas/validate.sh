#!/bin/sh

echo "Validate calculators";
for f in `find ../data/kalkulacka/ -mindepth 2 -name '*.json'`; do
    echo "Validating ${f}";
    ajv validate --verbose -s calculator.schema.json -d "${f}" -r candidate-answer.schema.json -r candidate.schema.json -r contact.schema.json -r election.schema.json -r party.schema.json -r question.schema.json;
    echo "Candidates: "`jq '.candidates | length' "${f}"`;
    echo "Questions: "`jq '.questions | length' "${f}"`;
    echo "Answers: "`jq '.answers | length' "${f}"`;
    echo ""
done;

echo "Validate list of calculators"
calculators="../data/kalkulacka/calculators.json";
ajv validate --verbose -s calculators.schema.json -d "${calculators}" -r election.schema.json
echo "Elections: "`jq '.elections | length' "${calculators}"`;
echo "Calculators: "`jq '.calculators | length' "${calculators}"`;

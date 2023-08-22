import type { CandidatesAnswers } from '@data/types/candidatesAnswers';
import type { Candidates } from '@data/types/candidates';
import type { Organizations } from '@data/types/organizations';
import type { Persons } from '@data/types/persons';
import type { Questions } from '@data/types/questions';

import type { DeprecatedCandidate } from '@/types/candidate';
import type {
  DeprecatedCalculator,
  DeprecatedCandidateAnswer,
} from '@/types/calculator';
import type { DeprecatedQuestion } from '@/types/question';
import type { DeprecatedCalculators } from '@/types/calculators';

export const deprecatedFetchCalculator = async (
  electionId: string,
  districtId: string,
) => {
  const calculator: DeprecatedCalculator = await fetch(
    `/data/kalkulacka/${electionId}/${districtId}.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return calculator;
};

export const deprecatedFetchCalculators = async () => {
  const data: DeprecatedCalculators = await fetch(
    `/data/kalkulacka/calculators.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return data.calculators;
};

export const deprecatedFetchElections = async () => {
  const data: DeprecatedCalculators = await fetch(
    `/data/kalkulacka/calculators.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return data.elections;
};

export const deprecatedFetchElectionData = async (electionId: string) => {
  const data: DeprecatedCalculators = await fetch(
    `/data/kalkulacka/calculators.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  const election = data.elections.find((x) => x.key === electionId);
  const districts = data.calculators.filter(
    (x) => x.election_id === election?.id,
  );
  return {
    election: election,
    districts: districts,
  };
};

export const fetchCalculatorQuestions = async () => {
  const data: Questions = await fetch(
    '/data/instance/volebnakalkulacka.sk/nrsr-2023/inventura-2020-2023/questions.json',
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
  return data;
};

export const fetchCalculatorCandidatesAnswers = async () => {
  const data: CandidatesAnswers = await fetch(
    '/data/instance/volebnakalkulacka.sk/nrsr-2023/inventura-2020-2023/candidates-answers.json',
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
  return data;
};

export const fetchCalculatorCandidates = async () => {
  const data: Candidates = await fetch(
    '/data/instance/volebnakalkulacka.sk/nrsr-2023/inventura-2020-2023/candidates.json',
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
  return data;
};

export const fetchCalculatorPersons = async () => {
  const data: Persons = await fetch(
    '/data/instance/volebnakalkulacka.sk/nrsr-2023/inventura-2020-2023/persons.json',
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
  return data;
};

export const fetchCalculatorOrganizations = async () => {
  const data: Organizations = await fetch(
    '/data/instance/volebnakalkulacka.sk/nrsr-2023/inventura-2020-2023/organizations.json',
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
  return data;
};

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
  const deprecatedCalculator = {} as DeprecatedCalculator;

  deprecatedCalculator.id = '4d2d81e3-2602-4259-b230-4237e5110005';
  deprecatedCalculator.district_code = 'inventura-2020-2023';
  deprecatedCalculator.show_district_code = false;
  deprecatedCalculator.name = 'Inventúra hlasovaní 2020–2023';
  deprecatedCalculator.description =
    'Volebná kalkulačka na základe skutočných hlasovaní poslancov Národnej rady Slovenskej republiky v 8. volebnom období 2020-2023';
  deprecatedCalculator.election = {
    id: '57a09a41-631b-4b40-ac22-b75b8ce14d84',
    key: 'nrsr-2023',
    name: 'Parlamentné voľby 2023',
    description:
      'Voľby do Národnej rady Slovenskej republiky 30. septembra 2023.',
  };

  // Load questions and map them to deprecated structure
  const questions = await fetchCalculatorQuestions();
  const transformedQuestions = questions.map(
    (question) =>
      ({
        id: question.id,
        name: question.title, // Fill this with appropriate value
        title: question.statement,
        gist: question.detail,
        detail: '',
        tags: [],
      }) as DeprecatedQuestion,
  );
  deprecatedCalculator.questions = transformedQuestions;

  // Load candidates and map them to deprecated structure
  const candidates = await fetchCalculatorCandidates();
  const persons = await fetchCalculatorPersons();
  const organizations = await fetchCalculatorOrganizations();
  const transformedCandidates = candidates.map((candidate) => {
    const transformedCandidate = {
      id: candidate.id,
      is_active: true,
    } as DeprecatedCandidate;

    if (candidate.reference.type == 'person') {
      const person =
        persons.find((person) => person.id === candidate.reference.id) ||
        (() => {
          throw new Error(
            `Person with ID \`${candidate.reference.id}\` not found.`,
          );
        })();

      transformedCandidate.name =
        person.name || `${person.givenName} ${person.familyName}`;
      transformedCandidate.given_name = person.givenName;
      transformedCandidate.family_name = person.familyName;
      transformedCandidate.type = 'person';
      transformedCandidate.short_name = transformedCandidate.name;

      const organizationId = person.memberOf?.[0]?.id;
      if (!organizationId) {
        throw new Error(
          `Person with ID \`${candidate.reference.id}\` has no organization.`,
        );
      }
      const organization =
        organizations.find(
          (organization) => organization.id === organizationId,
        ) ||
        (() => {
          throw new Error(
            `Organization with ID \`${organizationId}\` not found.`,
          );
        })();

      transformedCandidate.parties = [
        {
          id: organization.id,
          name: organization.name,
          short_name: organization.shortName,
          description: '',
        },
      ];
    } else if (candidate.reference.type == 'organization') {
      const organization =
        organizations.find(
          (organization) => organization.id === candidate.reference.id,
        ) ||
        (() => {
          throw new Error(
            `Organization with ID \`${candidate.reference.id}\` not found.`,
          );
        })();

      transformedCandidate.name = organization.name;
      transformedCandidate.type = 'party';
      transformedCandidate.short_name = transformedCandidate.name;
    }
    return transformedCandidate;
  });
  deprecatedCalculator.candidates = transformedCandidates;

  // Load candidates' answers and map them to deprecated structure
  const candidatesAnswers = await fetchCalculatorCandidatesAnswers();
  const transformedCandidatesAnswers = [] as DeprecatedCandidateAnswer[];
  for (const candidateId in candidatesAnswers) {
    const answers = candidatesAnswers[candidateId];
    for (const answer of answers) {
      const transformedAnswer =
        answer.answer === true
          ? 'yes'
          : answer.answer === false
          ? 'no'
          : answer.answer === null
          ? 'dont_know'
          : (() => {
              throw new Error(`Unexpected answer value: ${answer.answer}`);
            })();

      transformedCandidatesAnswers.push({
        id: answer.questionId,
        candidate_id: candidateId,
        question_id: answer.questionId,
        answer: transformedAnswer,
      });
    }
  }
  const ttransformedCandidatesAnswers = transformedCandidatesAnswers.filter(
    (response) =>
      response.candidate_id === '2de03a75-cf63-4fbf-a144-a6e6d71ae2c4',
  );

  deprecatedCalculator.answers = transformedCandidatesAnswers;
  return deprecatedCalculator;
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

import {
  useElectionStore,
  convertAnswerToStr,
  convertStrToAnswer,
} from '@/stores/electionStore';
import type { CalculatorRest } from '@/types/rest/Calculator';
import type { ElectionRest } from '@/types/rest/Election';
import type { Matches, ResultInRest } from '@/types/rest/ResultIn';
import type { ResultOutRest } from '@/types/rest/ResultOut';
import { calculateRelativeAgreement } from './resultParser';
import type { Answers } from '@prisma/client';
import type { Answer } from '@/types/rest/Answer';

//const BASE_URL = 'https://kalkulacka.ceskodigital.cz';
//const BASE_URL = 'http://localhost:8080';
const BASE_URL = '';

const buildResultData = () => {
  const electionStore = useElectionStore();
  if (!electionStore.calculator) {
    throw new Error('Calculator undefined');
  } else if (!electionStore.election) {
    throw new Error('Election undefined');
  }
  if (!electionStore.election.type) {
    console.warn(`Election type undefined, setting to 'undefined'`);
  }
  const answers = electionStore.answers.map((x) => {
    return {
      question_id: x.id,
      answer: convertAnswerToStr(x.answer),
      is_important: x.flag,
    };
  });
  const ra = calculateRelativeAgreement(
    electionStore.calculator.answers,
    electionStore.answers
  );
  const matches: Matches = ra.map((x) => {
    const candidate = electionStore.calculator?.candidates.find(
      (c) => c.id === x.cId
    );
    if (!candidate) {
      throw new Error(`Unknown candidate ${x.cId}`);
    }
    return {
      candidate: {
        candidate_id: candidate.id,
        name: candidate.name,
        short_name: candidate.name,
        abbreviation: candidate.name,
        logo: candidate.img_url || '',
      },
      score: x.result.result_percent,
    };
  });
  const values = {
    answers: answers,
    matches: matches,
    calculatorId: electionStore.calculator.id,
    districtId: electionStore.calculator.district_code,
    electionId: electionStore.election.id,
  };
  return values;
};

export const getResults = async (resultId: string) => {
  const endpointUrl = BASE_URL + `/api/answers/${resultId}`;
  const electionStore = useElectionStore();
  const res = await fetch(endpointUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  if (!res.ok) {
    if (res.status === 422) {
      console.error(await res.json());
      throw new Error('API call FAILED with 422!');
    } else {
      console.error(res.body);
      throw new Error(`API call FAILED with ${res.status}!`);
    }
  }
  console.debug('GET results success!');
  //not completely true as there is a select used see api/answers/[id].ts
  const resParsed: Answers = await res.json();
  if (!resParsed.id || !resParsed.answers) {
    throw new Error(`API call response not valid!`);
  }
  //load election
  await electionStore.loadElection(resParsed.electionId);
  await electionStore.loadCalculator(
    resParsed.electionId,
    resParsed.districtId
  );
  electionStore.answers = (
    resParsed.answers as ReturnType<typeof buildResultData>['answers']
  ).map((x) => {
    return {
      id: x.question_id,
      flag: x.is_important,
      answer: convertStrToAnswer(x.answer),
    };
  });
};

export const patchResults = async (resultId: string, updateToken: string) => {
  const endpointUrl = BASE_URL + `/api/answers/${resultId}`;
  const values = buildResultData();
  const data = {
    ...values,
    updateToken: updateToken,
  };
  const res = await fetch(endpointUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    if (res.status === 422) {
      console.error(await res.json());
      throw new Error('API call FAILED with 422!');
    } else {
      console.error(res.body);
      throw new Error(`API call FAILED with ${res.status}!`);
    }
  } else {
    try {
      const resParsed: Answers = await res.json();
      console.debug('PATCH results success!');
      return resParsed;
    } catch (error) {
      console.debug(res);
      res.text().then((text) => console.debug(text));
      throw error;
    }
  }
};

export const postResults = async (currentEmbed: string) => {
  const endpointUrl = BASE_URL + '/api/answers';
  const values = buildResultData();
  const data = {
    ...values,
    source: currentEmbed,
  };
  const res = await fetch(endpointUrl, {
    method: 'POST',
    //mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    if (res.status === 422) {
      console.error(await res.json());
      throw new Error('API call FAILED with 422!');
    } else {
      console.error(res.body);
      throw new Error(`API call FAILED with ${res.status}!`);
    }
  } else {
    try {
      const resParsed: Answers = await res.json();
      console.debug('POST results success!');
      return resParsed;
    } catch (error) {
      console.debug(res);
      res.text().then((text) => console.debug(text));
      throw error;
    }
  }
};

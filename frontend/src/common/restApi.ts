import {
  useElectionStore,
  convertAnswerToStr,
  convertStrToAnswer,
  UserAnswerEnum,
} from '@/stores/electionStore';
import type { AnswerRest } from '@/types/rest/Answer';
import type { CalculatorRest } from '@/types/rest/Calculator';
import type { ElectionRest } from '@/types/rest/Election';
import type { ResultAddedRest } from '@/types/rest/ResultAdded';
import type { Matches, ResultInRest } from '@/types/rest/ResultIn';
import type { ResultOutRest } from '@/types/rest/ResultOut';
import { calculateRelativeAgreement } from './resultParser';

//const BASE_URL = 'https://kalkulacka.ceskodigital.cz';
//const BASE_URL = 'http://localhost:8080';
const BASE_URL = '';

export const getResults = async (resultUuid: string) => {
  const endpointUrl = BASE_URL + `/api/results/${resultUuid}`;
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
    } else {
      console.error(res.body);
    }
    return;
  }
  console.debug('GET results success!');
  const result = (await res.json()) as ResultOutRest;
  //load election
  await electionStore.loadElection(result.calculator.election.id);
  await electionStore.loadCalculator(
    result.calculator.election.id,
    result.calculator.district_code
  );
  electionStore.answers = result.answers.map((x) => {
    return {
      id: x.question_id,
      flag: x.is_important,
      answer: convertStrToAnswer(x.answer),
    };
  });
};

export const patchResults = async () => {};

export const postResults = async () => {
  const endpointUrl = BASE_URL + '/api/results/';
  const electionStore = useElectionStore();
  if (!electionStore.calculator) {
    throw new Error('Calculator undefined');
  } else if (!electionStore.election) {
    throw new Error('Election undefined');
  } else {
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

    const election: ElectionRest = {
      id: electionStore.election.id,
      key: electionStore.election.key,
      name: electionStore.election.name,
      description: electionStore.election.description,
      type: electionStore.election.type || 'undefined',
    };
    const calculator: CalculatorRest = {
      id: electionStore.calculator?.id,
      name: electionStore.calculator.name,
      description: electionStore.calculator.description,
      district_code: electionStore.calculator.district_code,
      election: election,
    };
    const data: ResultInRest = {
      answers: answers,
      matches: matches,
      calculator: calculator,
    };
    const res = await fetch(endpointUrl, {
      method: 'POST',
      //mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      if (res.status === 422) {
        console.error(await res.json());
      } else {
        console.error(res.body);
      }
      return;
    } else {
      try {
        const resParsed = (await res.json()) as ResultAddedRest;
        console.debug('POST results success!');
        return resParsed;
      } catch (error) {
        console.debug(res);
        res.text().then((text) => console.debug(text));
        throw error;
      }
    }
  }
};

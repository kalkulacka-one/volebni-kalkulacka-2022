import { useElectionStore } from '@/stores/electionStore';
import type { AnswerRest } from '@/types/rest/Answer';
import type { CalculatorRest } from '@/types/rest/Calculator';
import type { ElectionRest } from '@/types/rest/Election';
import type { ResultAddedRest } from '@/types/rest/ResultAdded';
import type { Matches, ResultInRest } from '@/types/rest/ResultIn';
import { calculateRelativeAgreement } from './resultParser';

const BASE_URL = 'https://kalkulacka.ceskodigital.cz/api/';

export const getResults = async (resultUuid: string) => {
  return 0;
};

export const postResults = async () => {
  const endpointUrl = BASE_URL + '/results/';
  const electionStore = useElectionStore();
  if (!electionStore.calculator) {
    throw new Error('Calculator undefined');
  } else if (!electionStore.election) {
    throw new Error('Election undefined');
  } else if (!electionStore.election.type) {
    throw new Error('Election type undefined');
  } else {
    const answers: AnswerRest[] = electionStore.answers.map((x) => {
      return {
        question_id: x.id,
        answer: `${x.flag ? 1 : 0}|${x.answer}`,
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
      type: electionStore.election.type,
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
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return (await res.json()) as ResultAddedRest;
    } else if (res.status === 422) {
      console.error(res.json());
    } else {
      console.error(res.body);
    }
  }
};

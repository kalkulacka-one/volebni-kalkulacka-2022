import { UserAnswerEnum, type UserAnswer } from '@/stores/electionStore';
import type { CandidateAnswer } from '@/types/calculator';
const HEX_VERSIONS = [0];

/*
Answers are encoded as follows:
- 1st two bits are answer type as in UserAnswerEnum
- 3rd bit is for star flag (1:true, 0: false)
- 5 answers are always encoded in 2 bytes with the last bit being not used (3x5=15bits)
- 1st byte in the hex string is an encoding version
- 2nd byte in the hex string is the overall answer count
*/
export const encodeResults = (answers: UserAnswer[]) => {
  const bitCount = answers.length * 3;
  const uint16Array: Uint16Array = new Uint16Array(Math.ceil(bitCount / 15));
  for (let i = 0; i < answers.length; i++) {
    //encode answer
    const answer = answers[i].answer + (answers[i].flag ? 4 : 0);
    const bitShift = (i % 5) * 3;
    uint16Array[Math.floor(i / 5)] += answer << bitShift;
  }
  let hexString = '00' + answers.length.toString(16).padStart(2, '0');
  uint16Array.forEach((x) => (hexString += x.toString(16).padStart(4, '0')));
  return hexString;
};

export const decodeResults = (hexString: string) => {
  const answers: UserAnswer[] = [];
  const answerString = hexString.slice(4);
  const answerCount = parseInt(hexString.slice(2, 4), 16);
  const hexVersion = parseInt(hexString.slice(0, 2), 16);
  for (let i = 0; i < answerString.length; i += 4) {
    //parse the hex and change Int32 to Uint16
    const chunk = parseInt(answerString.slice(i, i + 4), 16) & 0xffff;
    for (let j = 0; j < 5; j++) {
      //shift the uint and apply mask
      const ans = (chunk >> (j * 3)) & 0x07;
      answers.push({
        id: `${ans}`,
        answer: ans & 0x03,
        flag: ans >> 2 === 1,
      });
      if (answerCount === answers.length) break;
    }
  }
  if (answerCount !== answers.length) {
    console.warn(
      `answer count missmatch, expected: ${answerCount}, actual: ${answers.length}`
    );
    answers.length = 0;
  }
  if (!(hexVersion in HEX_VERSIONS)) {
    console.warn(`hex version unknown: ${hexVersion}`);
    answers.length = 0;
  }
  return answers;
};

export interface Result {
  count: 0;
  raw_result: number;
  result: number;
  result_percent: number;
  random: number;
}

export const calculateAnswerResult = (
  ua: UserAnswer,
  ca: CandidateAnswer,
  weight: number
) => {
  let w = ua.flag ? weight : 1;
  let res = 0;
  let caValue = 0;
  switch (ca.answer) {
    case 'yes':
      caValue = 1;
      break;
    case 'no':
      caValue = -1;
      break;
    default:
      caValue = 0;
      break;
  }
  let uaValue = 0;
  switch (ua.answer) {
    case UserAnswerEnum.yes:
      uaValue = 1;
      break;
    case UserAnswerEnum.no:
      uaValue = -1;
      break;
    default:
      uaValue = 0;
      break;
  }
  if (uaValue === 0) {
    w = 0;
  } else if (caValue === 0) {
    //w a res stays same
  } else {
    res = caValue * uaValue * w;
  }
  return [w, res];
};

export const calculateRelativeAgreement = (
  candidateAnswers: CandidateAnswer[],
  userAnswers: UserAnswer[],
  weight = 2
) => {
  const relativeAgreement = new Map<string, Result>();
  candidateAnswers.forEach((ca) => {
    if (!relativeAgreement.has(ca.candidate_id)) {
      relativeAgreement.set(ca.candidate_id, {
        count: 0,
        raw_result: 0,
        result: 0.5,
        result_percent: 50,
        random: Math.random(),
      });
    }
    const res = relativeAgreement.get(ca.candidate_id) as Result;

    //calculate
    const ua = userAnswers.find((x) => x.id === ca.question_id);
    if (ua === undefined) {
      console.warn(
        `Candidate answer ${ca.candidate_id} is not in the user question pool!`
      );
      return;
    }
    const answerRes = calculateAnswerResult(ua, ca, weight);
    res.count += answerRes[0];
    res.raw_result += answerRes[1];
  });
  relativeAgreement.forEach((ra) => {
    if (ra.count === 0) return;
    ra.result = (1 + ra.raw_result / ra.count) / 2;
    ra.result_percent = Math.round(ra.result * 100);
  });
  const result: { cId: string; result: Result }[] = [];
  relativeAgreement.forEach((v, k) => result.push({ cId: k, result: v }));
  result.sort((a, b) => {
    if (a.result.result === b.result.result) {
      return b.result.random - a.result.random;
    } else {
      return b.result.result - a.result.result;
    }
  });
  return result;
};

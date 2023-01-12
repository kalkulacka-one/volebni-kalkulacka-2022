import { fetchCalculator, fetchElectionData } from '@/common/dataFetch';
import { patchResults, postResults } from '@/common/restApi';
import { encodeResults } from '@/common/resultParser';
import type { Calculator } from '@/types/calculator';
import type { Calculators } from '@/types/calculators';
import type { Election } from '@/types/election';
import type { User } from '@/stores/userStore';
import { defineStore } from 'pinia';

export enum UserAnswerEnum {
  yes = 1,
  no = 2,
  skip = 3,
}

export const convertAnswerToBool = (
  answer: UserAnswerEnum
): boolean | undefined => {
  switch (answer) {
    case UserAnswerEnum.yes:
      return true;
    case UserAnswerEnum.no:
      return false;
    default:
      return undefined;
  }
};

export const convertBoolToAnswer = (
  answer: boolean | undefined
): UserAnswerEnum => {
  switch (answer) {
    case true:
      return UserAnswerEnum.yes;
    case false:
      return UserAnswerEnum.no;
    default:
      return UserAnswerEnum.skip;
  }
};

export interface UserAnswer {
  id: string;
  answer: UserAnswerEnum;
  flag: boolean;
}

export const useElectionStore = defineStore('election', {
  state: () => {
    return {
      election: undefined as Election | undefined,
      districts: [] as Calculators['calculators'],
      calculator: undefined as Calculator | undefined,
      answers: [] as UserAnswer[],
      resultsId: null as null | string,
      resultsUpdateToken: null as null | string,
      encodedResults: null as null | string,
      uniqueQuestionTags: new Set<string>(),
    };
  },
  getters: {
    questionCount: (state) => {
      if (state.calculator !== undefined) {
        return state.calculator?.questions.length;
      } else {
        return 0;
      }
    },
    answerCount: (state) => {
      return state.answers.reduce((total, x) => {
        if (x.answer === UserAnswerEnum.yes || x.answer === UserAnswerEnum.no) {
          total++;
        }
        return total;
      }, 0);
    },
  },
  actions: {
    flipAnswerFlag(questionNr: number) {
      if (questionNr < this.answers.length) {
        this.answers[questionNr].flag = !this.answers[questionNr].flag;
      }
    },
    setAnswer(questionNr: number, answer: UserAnswer['answer']) {
      if (questionNr < this.answers.length) {
        this.answers[questionNr].answer = answer;
      }
    },
    async loadElection(electionId: string) {
      this.districts = [];
      this.election = undefined;
      let electionData = undefined;
      try {
        electionData = await fetchElectionData(electionId);
      } catch (error) {
        console.error(error);
      }
      if (electionData?.election !== undefined) {
        this.districts = electionData.districts;
        this.election = electionData.election;
        console.debug('Election fetch complete!');
      } else {
        console.warn('Election data are undefined!');
        // eslint-disable-next-line no-undef
        newrelic?.noticeError(new Error('Election data are undefined!'));
      }
    },
    async loadCalculator(electionId: string, districtId: string) {
      this.calculator = undefined;
      this.uniqueQuestionTags.clear();
      let calculator = undefined;
      try {
        calculator = await fetchCalculator(electionId, districtId);
      } catch (error) {
        console.error(error);
      }

      if (calculator !== undefined) {
        this.calculator = calculator;
        this.answers = calculator.questions.map((x) => {
          x.tags?.forEach((tag) => {
            this.uniqueQuestionTags.add(tag);
          });
          return {
            answer: UserAnswerEnum.skip,
            flag: false,
            id: x.id as string,
          };
        });
        console.debug('District fetch complete!');
      } else {
        console.warn('District data are undefined!');
      }
    },
    async saveResults({
      embedName,
      user,
    }: {
      embedName: string | undefined;
      user: User | null | undefined;
    }) {
      if (user) {
        const res = await fetch('/api/answers');
        const answers = await res.json();
        const calculatorAnswers = answers.filter(
          (answer) => answer.calculatorId === this.calculator?.id
        );
        if (calculatorAnswers.length > 0) {
          this.resultsId = calculatorAnswers[0].id;
        }
      }

      //if results already saved do not save them again
      const newEncodedResults = encodeResults(this.answers);
      //return if results already saved and answers are the same
      const response = {
        action: 'unknown',
        response: null as any,
      };
      const answersCount = this.answers.length;
      const answeredAnswersCount = this.answers.filter(
        (answer) => answer.answer === UserAnswerEnum.skip
      ).length;
      if (answersCount === answeredAnswersCount) {
        response.action = 'no-action';
        console.debug('No question answered.');
      } else if (newEncodedResults === this.encodedResults && this.resultsId) {
        response.action = 'no-action';
        console.debug('Results already saved.');
      }
      //patch if results already saved and user is logged in
      else if (this.resultsId && user) {
        console.debug('Results changed. Patching signed in user...');
        const res = await patchResults({
          resultId: this.resultsId,
        });
        this.resultsId = res?.id ? (res.id as string) : null;
        this.resultsUpdateToken = res?.updateToken
          ? (res.updateToken as string)
          : null;
        response.action = 'update';
        response.response = res;
      }
      //patch if results already saved but answers differ
      else if (this.resultsId && this.resultsUpdateToken) {
        console.debug('Results changed. Patching...');
        const res = await patchResults({
          resultId: this.resultsId,
          updateToken: this.resultsUpdateToken,
        });
        this.resultsId = res?.id ? (res.id as string) : null;
        this.resultsUpdateToken = res?.updateToken
          ? (res.updateToken as string)
          : null;
        response.action = 'update';
        response.response = res;
      }
      //post new reults if results not yet saved
      else {
        console.debug('Results not saved. Posting...');
        this.resultsId = null;
        this.resultsUpdateToken = null;
        const res = await postResults({ embedName });
        this.resultsId = res?.id ? (res.id as string) : null;
        this.resultsUpdateToken = res?.updateToken
          ? (res.updateToken as string)
          : null;
        response.action = 'save';
        response.response = res;
      }
      this.encodedResults = newEncodedResults;
      return response;
    },
    init() {
      console.debug('Initializing store ...');
      this.answers.forEach((x) => {
        x.answer = UserAnswerEnum.skip;
        x.flag = false;
      });
      this.encodedResults = null;
      this.resultsUpdateToken = null;
      this.resultsId = null;
    },
  },
});

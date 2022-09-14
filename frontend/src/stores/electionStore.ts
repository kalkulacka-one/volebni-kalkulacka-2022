import { fetchCalculator, fetchElectionData } from '@/common/dataFetch';
import { appRoutes } from '@/main';
import type { Calculator } from '@/types/calculator';
import type { Calculators } from '@/types/calculators';
import type { Election } from '@/types/election';
import { defineStore } from 'pinia';

export enum UserAnswerEnum {
  undefined = 0,
  yes = 1,
  no = 2,
  skip = 3,
}

export const convertAnswerToStr = (answer: UserAnswerEnum): string => {
  switch (answer) {
    case UserAnswerEnum.yes:
      return 'yes';
    case UserAnswerEnum.no:
      return 'no';
    case UserAnswerEnum.skip:
      return 'dont_know';
    default:
      return 'dont_know';
  }
};

export const convertStrToAnswer = (answer: string): UserAnswerEnum => {
  switch (answer) {
    case 'yes':
      return UserAnswerEnum.yes;
    case 'no':
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
      answerProgress: -1,
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
      let count = 0;
      state.answers.forEach((element) => {
        if (element.answer !== UserAnswerEnum.undefined) count++;
      });
      return count;
    },
  },
  actions: {
    incrementAnswerProgress() {
      if (this.answerProgress < this.questionCount - 1) this.answerProgress++;
    },
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
      this.init();
      let electionData = undefined;
      try {
        electionData = await fetchElectionData(electionId);
      } catch (error) {
        console.error(error);
      }
      if (electionData?.election === undefined) {
        return {
          name: appRoutes.error.name,
          params: { case: 'api-error-election' },
        };
      }
      console.debug('Election fetch complete!');
      this.districts = electionData.districts;
      this.election = electionData.election;
    },
    async loadCalculator(electionId: string, districtId: string) {
      this.calculator = undefined;
      this.init();
      let calculator = undefined;
      try {
        calculator = await fetchCalculator(electionId, districtId);
      } catch (error) {
        console.error(error);
      }
      if (calculator === undefined) {
        return {
          name: appRoutes.error.name,
          params: { case: 'api-error-district' },
        };
      }
      console.debug('District fetch complete!');
      this.calculator = calculator;
      this.answers = calculator.questions.map((x) => {
        return {
          answer: UserAnswerEnum.undefined,
          flag: false,
          id: x.id as string,
        };
      });
    },
    init() {
      this.answerProgress = -1;
      this.answers = [];
    },
  },
});

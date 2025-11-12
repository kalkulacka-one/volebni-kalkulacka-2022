import {
  deprecatedFetchCalculator,
  deprecatedFetchElectionData,
} from '@/common/dataFetch';
import { encodeResults } from '@/common/resultParser';
import type { DeprecatedCalculator } from '@/types/calculator';
import type { DeprecatedCalculators } from '@/types/calculators';
import type { DeprecatedElection } from '@/types/election';
import { defineStore } from 'pinia';

export enum UserAnswerEnum {
  yes = 1,
  no = 2,
  skip = 3,
}

export const convertAnswerToBool = (
  answer: UserAnswerEnum,
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
  answer: boolean | undefined,
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
      election: undefined as DeprecatedElection | undefined,
      districts: [] as DeprecatedCalculators['calculators'],
      calculator: undefined as DeprecatedCalculator | undefined,
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
        electionData = await deprecatedFetchElectionData(electionId);
      } catch (error) {
        console.error(error);
      }
      if (electionData?.election !== undefined) {
        this.districts = electionData.districts;
        this.election = electionData.election;
        console.debug('Election fetch complete!');
      } else {
        console.warn('Election data are undefined!');
        // TODO Track error
        // new Error('Election data are undefined!');
      }
    },
    async loadCalculator(key: string) {
      this.calculator = undefined;
      this.uniqueQuestionTags.clear();
      let calculator = undefined;
      try {
        calculator = await deprecatedFetchCalculator(key);
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

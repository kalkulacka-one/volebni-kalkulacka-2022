import type { Calculator } from '@/types/calculator';
import type { Calculators } from '@/types/calculators';
import type { Election } from '@/types/election';
import { defineStore } from 'pinia';

export interface UserAnswer {
  id: string;
  answer: 'yes' | 'no' | 'skip' | undefined;
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
        if (element.answer !== undefined) count++;
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
  },
});

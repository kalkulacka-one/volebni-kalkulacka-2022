import { defineStore } from 'pinia';

export interface User {
  authProvider?: string;
  authProviderId?: string;
  createdAt?: string;
  displayName?: string;
  email?: string;
  id?: string;
  updatedAt?: string;
  img_url?: string;
}

export interface Answer {
  id: string;
  calculatorId: string;
  answers: { answer: Boolean; questionId: string };
  matches: { candidateId: string; score: number };
  createdAt: Date;
  updatedAt: Date;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    answers: [] as Answer[],
  }),
  getters: {},
  actions: {
    async fetchUser() {
      const res = await fetch('/api/users/me');
      if (!res.ok) {
        this.user = null;
        return;
      }
      const response = await res.json();
      this.user = response.user ? response.user : null;
    },
    async fetchAnswers() {
      const res = await fetch('/api/answers');
      if (!res.ok) {
        this.answers = [];
        return;
      }
      const response = await res.json();
      this.answers = response ? response : [];
    },
  },
});

import { defineStore } from 'pinia';
export interface Subscriber {
  email?: string;
  id?: string;
}

export const useSubscriberStore = defineStore('subscriber', {
  state: () => ({
    subscriber: undefined as Subscriber | undefined | null,
    vote: undefined as string | undefined | null,
  }),
  actions: {
    async setSubscriber(subscriber: Subscriber) {
      this.subscriber = subscriber;
    },
    async saveVote(candidateId: string) {
      this.vote = candidateId;
    }
  },
});

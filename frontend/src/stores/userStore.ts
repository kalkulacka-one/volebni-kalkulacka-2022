import { defineStore } from 'pinia';

export interface User {
  authProvider?: string;
  authProviderId?: string;
  createdAt?: string;
  displayName?: string;
  email?: string;
  vote?: string;
  id?: string;
  updatedAt?: string;
  img_url?: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined | null,
  }),
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
    setUser(user: User) {
      this.user = {
        ...user,
        vote: this.user?.vote,
      };
    },
    saveVote(candidateId: string) {
      this.user!.vote = candidateId;
    }
  },
});

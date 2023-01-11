import { defineStore } from 'pinia';

export interface User {
  authProvider?: string;
  authProviderId?: string;
  createdAt?: string;
  displayName?: string;
  email?: string;
  id?: string;
  updatedAt?: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
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
  },
});

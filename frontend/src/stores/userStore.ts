import { defineStore } from 'pinia';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  authProvider?: string;
  authProviderId?: string;
  createdAt?: string;
  updatedAt?: string;
  img_url?: string;
}

export type AuthResponse = { user: User; exp: string };

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as AuthResponse | null,
  }),
  getters: {},
  actions: {
    async fetchUser() {
      const res = await fetch('http://localhost:3000/api/users/me');

      const response = await res.json();
      this.user = response.user ? response.user : null;
    },
  },
});

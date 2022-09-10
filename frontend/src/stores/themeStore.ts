import { defineStore } from 'pinia';

export enum ThemeEnum {
  default = 'default',
  seznam = 'seznam',
}

export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      theme: ThemeEnum.default,
    };
  },
  getters: {},
  actions: {
    setTheme(theme: string) {
      switch (theme) {
        case 'seznam':
          this.theme = ThemeEnum.seznam;
          break;
        case 'default':
          this.theme = ThemeEnum.default;
          break;
        default:
          console.warn(`Unknown theme '${theme}'`);
          break;
      }
    },
  },
});

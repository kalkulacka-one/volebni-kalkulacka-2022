import type { InjectionKey, Ref } from 'vue';

interface Switch {
  (themeName: string): string;
}

interface Theme {
  selected: Ref<string>;
  switch: Switch;
}

export const ThemeKey: InjectionKey<Theme> = Symbol('theme');

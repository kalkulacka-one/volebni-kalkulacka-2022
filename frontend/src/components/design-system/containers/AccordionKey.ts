import type { InjectionKey, Ref } from 'vue';

interface Switch {
  (isOpen: boolean): boolean;
}

interface Opened {
  isOpen: Ref<boolean>;
  switch: Switch;
}

export const ToggleKey: InjectionKey<Opened> = Symbol('toggle');

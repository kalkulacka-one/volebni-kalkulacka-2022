/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { createI18n, useI18n } from 'vue-i18n';
import type {
  createI18n as createI18nType,
  useI18n as useI18nType,
} from 'vue-i18n/dist/vue-i18n.d.ts';
import cz from './locales/cz.json';
import sk from './locales/sk.json';

type MessageSchema = typeof cz;

export const i18n = (createI18n as typeof createI18nType)<
  [MessageSchema],
  'cz' | 'sk'
>({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: {
    cz,
    sk,
  },
});

// this is here only to force the right typings
export const useI18nWrapper = useI18n as typeof useI18nType;

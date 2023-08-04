/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { createI18n as create } from 'vue-i18n';
import type { createI18n } from 'vue-i18n/dist/vue-i18n.d.ts';
import cz from './locales/cz.json';
import sk from './locales/sk.json';

type MessageSchema = typeof cz;

export default (create as typeof createI18n)<[MessageSchema], 'cz' | 'sk'>({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: {
    cz,
    sk,
  },
});

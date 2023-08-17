import { createI18n, useI18n } from 'vue-i18n';
import cs from './locales/cs.json';
import sk from './locales/sk.json';

type MessageSchema = typeof cs;

export const i18n = (createI18n)<
  [MessageSchema],
  'cs' | 'sk'
>({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  globalInjection: true,
  messages: {
    cs,
    sk,
  },
});

export const switchLanguage = async (newLocale: string) => {
  i18n.global.locale.value = newLocale;
  document.querySelector('html')?.setAttribute('lang', newLocale);
};

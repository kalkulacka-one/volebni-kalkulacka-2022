import { createI18n, type Locale, type Composer } from 'vue-i18n';
import cs from './locales/cs.json';
import sk from './locales/sk.json';
import sq from './locales/sq.json';

type MessageSchema = typeof cs;

export const i18n = createI18n<[MessageSchema], 'cs' | 'sk' | 'sq'>({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages: {
    cs,
    sk,
    sq,
  },
});

export const switchLanguage = async (newLocale: Locale) => {
  (i18n.global as unknown as Composer).locale.value = newLocale;
  document.querySelector('html')?.setAttribute('lang', newLocale);
};

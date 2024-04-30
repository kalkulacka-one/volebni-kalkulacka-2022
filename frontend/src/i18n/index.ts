import { createI18n, type Locale, type Composer } from 'vue-i18n';
import cs from './locales/cs.json';
import hu from './locales/hu.json';
import sk from './locales/sk.json';

type MessageSchema = typeof cs;

export const i18n = createI18n<[MessageSchema], 'cs' | 'hu' | 'sk'>({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  legacy: false,
  messages: {
    cs,
    hu,
    sk,
  },
});

export const switchLanguage = async (newLocale: Locale) => {
  (i18n.global as unknown as Composer).locale.value = newLocale;
  document.querySelector('html')?.setAttribute('lang', newLocale);
};

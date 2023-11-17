import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import en from './locales/en/translations.json';
import ru from './locales/ru/translations.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
});

export default i18n;

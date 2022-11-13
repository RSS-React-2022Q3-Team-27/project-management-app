import { getValueLocalStorage } from './getValueLocalStorage';

import { AppLanguage } from '../types/LanguageOptions';
import { LocalStorageKeys } from '../types/LocalStorageKeys';

export const getUserLocale = (): AppLanguage => {
  const userLocale = navigator.language.split('-')[0];
  const savedLocale = getValueLocalStorage(LocalStorageKeys.locale);

  if (savedLocale && (savedLocale === AppLanguage.en || savedLocale === AppLanguage.ru)) {
    return savedLocale;
  }

  if (userLocale === AppLanguage.en || userLocale === AppLanguage.ru) {
    return userLocale;
  }

  return AppLanguage.en;
};

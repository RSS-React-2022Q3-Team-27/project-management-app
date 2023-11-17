import { getValueLocalStorage } from './getValueLocalStorage';

import { AppLanguage } from '../types/LanguageOptions';
import { LocalStorageKeys } from '../types/LocalStorageKeys';

export const getUserLocale = (): boolean => {
  const savedLocale = getValueLocalStorage(LocalStorageKeys.locale);

  if (savedLocale && savedLocale === AppLanguage.ru) {
    return true;
  }

  return false;
};

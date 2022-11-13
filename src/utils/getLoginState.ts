import { getTimeBeforeExit } from './getTimeBeforeExit';
import { getValueLocalStorage } from './getValueLocalStorage';

import { LocalStorageKeys } from '../types/LocalStorageKeys';

export const getLoginState = () => {
  const token = getValueLocalStorage(LocalStorageKeys.token);
  const timer = getTimeBeforeExit(token);
  if (timer && timer > 0) {
    return true;
  }

  return false;
};

import jwtDecode from 'jwt-decode';

import { getValueLocalStorage } from './getValueLocalStorage';

import { IToken } from '../hooks/useLogOutAfterTokenExp';
import { LocalStorageKeys } from '../types/LocalStorageKeys';

export const getLoginState = () => {
  const token = getValueLocalStorage(LocalStorageKeys.token);
  const decryptedToken = token && (jwtDecode(token) as IToken);
  const timer = decryptedToken && Math.ceil(+((decryptedToken.exp - Date.now() / 1000) * 1000).toFixed(2));
  if (timer && timer > 0) {
    return true;
  }

  return false;
};

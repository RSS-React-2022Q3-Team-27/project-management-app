import jwtDecode from 'jwt-decode';

import { getValueLocalStorage } from './getValueLocalStorage';

import { LocalStorageKeys } from '../types/LocalStorageKeys';

export interface IToken {
  id: string;
  login: string;
  iat: number;
  exp: number;
}

export const getTimeBeforeExit = () => {
  const token = getValueLocalStorage(LocalStorageKeys.token);
  const decryptedToken = token && (jwtDecode(token) as IToken);

  return decryptedToken ? Math.ceil(Number(((decryptedToken.exp - Date.now() / 1000) * 1000).toFixed(2))) : 0;
};

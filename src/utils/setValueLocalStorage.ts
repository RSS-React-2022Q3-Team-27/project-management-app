import { LocalStorageKeys } from '../types/LocalStorageKeys';

export const setValueLocalStorage = (value: LocalStorageKeys, data: string | number) => {
  localStorage.setItem(value, typeof data === 'string' ? data : JSON.stringify(data));
};

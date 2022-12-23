import { LocalStorageKeys } from '../types/LocalStorageKeys';

export const removeValueLocalStorage = (value: LocalStorageKeys) => localStorage.removeItem(value);

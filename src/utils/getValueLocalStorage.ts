import { LocalStorageKeys } from '../types/LocalStorageKeys';

export const getValueLocalStorage = (value: LocalStorageKeys) => localStorage.getItem(value) || '';

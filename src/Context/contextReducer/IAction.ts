import { ReducerTypes } from './ReducerTypes';

export interface IAction {
  type: ReducerTypes;
  payload: null | (() => void);
}

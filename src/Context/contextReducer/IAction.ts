import { ReducerTypes } from './ReducerTypes';

export interface IAction {
  type: ReducerTypes.onConfirmAction;
  payload: () => void;
}
export interface IActionNull {
  type: ReducerTypes.null;
}

export type Action = IAction | IActionNull;

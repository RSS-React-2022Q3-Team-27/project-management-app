import { Action } from './IAction';
import { initialReducerState } from './initialReducerState';
import { IReducerState } from './IReducerState';
import { ReducerTypes } from './ReducerTypes';

export const contextReducer = (state: IReducerState, action: Action) => {
  switch (action.type) {
    case ReducerTypes.onConfirmAction:
      return {
        onConfirmAction: action.payload,
      };
    case ReducerTypes.null:
      return initialReducerState;
    default:
      return state;
  }
};

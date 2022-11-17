import { IAction } from './IAction';
import { initialReducerState } from './initialReducerState';
import { IReducerState } from './IReducerState';
import { ReducerTypes } from './ReducerTypes';

export const contextReducer = (state: IReducerState, action: IAction) => {
  switch (action.type) {
    case ReducerTypes.cb:
      return {
        cb: action.payload,
      };
    case ReducerTypes.null:
      return initialReducerState;
    default:
      return state;
  }
};

import React, { createContext } from 'react';

import { IAction } from './contextReducer/IAction';
import { IReducerState } from './contextReducer/IReducerState';

type Dispatch<A> = (value: A) => void;
export type Callback = (() => void) | null;

interface IValueProps {
  contextState: IReducerState;
  contextDispatch: Dispatch<IAction>;
}

interface IContextProps {
  children: React.ReactNode;
  value: IValueProps;
}

export const Context = createContext({} as IValueProps);

export const ContextProvider = ({ children, value }: IContextProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);

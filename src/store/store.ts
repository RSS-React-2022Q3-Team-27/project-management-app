import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import boardsSlice from './slices/boards/boardsSlice';
import headerSlice from './slices/header/headerSlice';

import userSlice from './slices/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    header: headerSlice,
    boards: boardsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

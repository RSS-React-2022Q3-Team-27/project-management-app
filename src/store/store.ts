import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import appSlice from './slices/app/appSlice';
import boardSlice from './slices/board/boardSlice';

import boardsSlice from './slices/boards/boardsSlice';
import headerSlice from './slices/header/headerSlice';

import userSlice from './slices/user/userSlice';
import usersSlice from './slices/users/usersSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
    header: headerSlice,
    boards: boardsSlice,
    app: appSlice,
    board: boardSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

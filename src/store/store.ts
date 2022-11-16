import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import appSlice from './slices/app/appSlice';
import { boardApi } from './slices/board/boardApi';
import boardSlice from './slices/board/boardSlice';

import boardsSlice from './slices/boards/boardsSlice';
import headerSlice from './slices/header/headerSlice';
import { authApi } from './slices/user/authApi';

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
    [boardApi.reducerPath]: boardApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (gDM) => gDM().concat([boardApi.middleware, authApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

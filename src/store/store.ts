import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import appSlice from './slices/app/appSlice';
import { boardApi } from './slices/board/boardApi';
import boardSlice from './slices/board/boardSlice';

import boardsSlice from './slices/boards/boardsSlice';
import headerSlice from './slices/header/headerSlice';
import { tasksApi } from './slices/tasks/tasksApi';
import tasksSlice from './slices/tasks/tasksSlice';
import { authApi } from './slices/user/authApi';

import userSlice from './slices/user/userSlice';
import { usersApi } from './slices/users/usersApi';
import usersSlice from './slices/users/usersSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
    header: headerSlice,
    boards: boardsSlice,
    app: appSlice,
    board: boardSlice,
    tasks: tasksSlice,
    [boardApi.reducerPath]: boardApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat([boardApi.middleware, authApi.middleware, usersApi.middleware, tasksApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import appSlice from './slices/app/appSlice';
import { boardApi } from './slices/board/boardApi';
import boardSlice from './slices/board/boardSlice';

import boardsSlice from './slices/boards/boardsSlice';
import headerSlice from './slices/header/headerSlice';
import { tasksApi } from './slices/tasks/tasksApi';
import tasksSlice from './slices/tasks/tasksSlice';

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
    tasks: tasksSlice,
    [boardApi.reducerPath]: boardApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (gDM) => gDM().concat(boardApi.middleware, tasksApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

import { createSlice } from '@reduxjs/toolkit';

export type AppStateType = {
  confirmOpened: boolean;
};

const initialState: AppStateType = {
  confirmOpened: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setConfirmOpened(state, { payload }) {
      state.confirmOpened = payload;
    },
  },
});

export const { setConfirmOpened } = appSlice.actions;
export default appSlice.reducer;

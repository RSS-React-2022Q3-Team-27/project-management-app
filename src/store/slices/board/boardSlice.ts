import { createSlice } from '@reduxjs/toolkit';

type BoardStateType = {
  isModalOpened: boolean;
};

const initialState: BoardStateType = {
  isModalOpened: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    openAddColumnModal(state) {
      state.isModalOpened = true;
    },
    closeAddColumnModal(state) {
      state.isModalOpened = false;
    },
  },
});

export const { openAddColumnModal, closeAddColumnModal } = boardSlice.actions;
export default boardSlice.reducer;

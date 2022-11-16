import { createSlice } from '@reduxjs/toolkit';

type BoardStateType = {
  isModalOpened: boolean;
  columnsLength: number;
};

const initialState: BoardStateType = {
  isModalOpened: false,
  columnsLength: 0,
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
    setColumnsLength(state, { payload }) {
      state.columnsLength = payload;
    },
  },
});

export const { openAddColumnModal, closeAddColumnModal, setColumnsLength } = boardSlice.actions;
export default boardSlice.reducer;

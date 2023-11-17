import { createSlice } from '@reduxjs/toolkit';

type BoardStateType = {
  isModalOpened: boolean;
  columnsLength: number;
  titleEditId: string | null;
};

const initialState: BoardStateType = {
  isModalOpened: false,
  columnsLength: 0,
  titleEditId: null,
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
    setTitleEditId(state, { payload }) {
      state.titleEditId = payload;
    },
  },
});

export const { openAddColumnModal, closeAddColumnModal, setColumnsLength, setTitleEditId } = boardSlice.actions;
export default boardSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { TaskType } from '../tasks/tasksApi';

interface ColumnsData {
  [key: string]: TaskType[];
}

type BoardStateType = {
  isModalOpened: boolean;
  columnsLength: number;
  columnsData: ColumnsData;
};

const initialState: BoardStateType = {
  isModalOpened: false,
  columnsLength: 0,
  columnsData: {},
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
    saveColumnTasks(state, { payload }) {
      state.columnsData[payload.columnId] = payload.data;
    },
    deleteColumnTasks(state, { payload }) {
      delete state.columnsData[payload.columnId];
    },
  },
});

export const { openAddColumnModal, closeAddColumnModal, setColumnsLength, saveColumnTasks, deleteColumnTasks } =
  boardSlice.actions;
export default boardSlice.reducer;

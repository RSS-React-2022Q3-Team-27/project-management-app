import { createSlice } from '@reduxjs/toolkit';

import { CreateTaskType } from './tasksApi';

type TasksStateType = {
  isAddModalOpened: boolean;
  dataForAddTask: Omit<CreateTaskType, 'body'> | null;
  isUpdateModalOpened: boolean;
};

const initialState: TasksStateType = {
  isAddModalOpened: false,
  dataForAddTask: null,
  isUpdateModalOpened: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    openAddTaskModal(state) {
      state.isAddModalOpened = true;
    },
    closeAddTaskModal(state) {
      state.isAddModalOpened = false;
    },
    setDataForAddTask(state, { payload }) {
      state.dataForAddTask = payload;
    },
    openUpdateTaskModal(state) {
      state.isUpdateModalOpened = true;
    },
    closeUpdateTaskModal(state) {
      state.isUpdateModalOpened = false;
    },
  },
});

export const { openAddTaskModal, closeAddTaskModal, setDataForAddTask, openUpdateTaskModal, closeUpdateTaskModal } =
  tasksSlice.actions;
export default tasksSlice.reducer;

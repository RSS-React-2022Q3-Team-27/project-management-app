import { createSlice } from '@reduxjs/toolkit';

import { CreateTaskType } from './tasksApi';

type TasksStateType = {
  isModalOpened: boolean;
  dataForAddTask: Omit<CreateTaskType, 'body'> | null;
};

const initialState: TasksStateType = {
  isModalOpened: false,
  dataForAddTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    openAddTaskModal(state) {
      state.isModalOpened = true;
    },
    closeAddTaskModal(state) {
      state.isModalOpened = false;
    },
    setDataForAddTask(state, { payload }) {
      state.dataForAddTask = payload;
    },
  },
});

export const { openAddTaskModal, closeAddTaskModal, setDataForAddTask } = tasksSlice.actions;
export default tasksSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { CreateTaskType, TaskType } from './tasksApi';

type TasksStateType = {
  isAddModalOpened: boolean;
  dataForAddTask: Omit<CreateTaskType, 'body'> | null;
  isUpdateModalOpened: boolean;
  dataForUpdateTask: TaskType | null;
  searchQuery: string;
  searchQueryResults: TaskType[];
  newTaskOrder: number;
};

const initialState: TasksStateType = {
  isAddModalOpened: false,
  dataForAddTask: null,
  isUpdateModalOpened: false,
  dataForUpdateTask: null,
  searchQuery: '',
  searchQueryResults: [],
  newTaskOrder: 0,
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
    setDataForUpdateTask(state, { payload }) {
      state.dataForUpdateTask = payload;
    },
    setSearchQuery(state, { payload }) {
      state.searchQuery = payload;
    },
    setSearchQueryResults(state, { payload }) {
      state.searchQueryResults = payload;
    },
    setNewTaskOrder(state, { payload }) {
      state.newTaskOrder = payload;
    },
  },
});

export const {
  openAddTaskModal,
  closeAddTaskModal,
  setDataForAddTask,
  openUpdateTaskModal,
  closeUpdateTaskModal,
  setDataForUpdateTask,
  setSearchQuery,
  setSearchQueryResults,
  setNewTaskOrder,
} = tasksSlice.actions;
export default tasksSlice.reducer;

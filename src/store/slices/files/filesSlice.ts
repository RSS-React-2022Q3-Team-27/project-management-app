import { createSlice } from '@reduxjs/toolkit';

type FileStateType = {
  isAddFileModalOpened: boolean;
  fileData: {
    boardId: string;
    taskId: string;
  };
};

const initialState: FileStateType = {
  isAddFileModalOpened: false,
  fileData: {
    boardId: '',
    taskId: '',
  },
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    openAddFileModal(state, { payload }) {
      state.isAddFileModalOpened = true;
      state.fileData = payload;
    },
    closeAddFileModal(state) {
      state.isAddFileModalOpened = false;
    },
  },
});

export const { openAddFileModal, closeAddFileModal } = filesSlice.actions;
export default filesSlice.reducer;

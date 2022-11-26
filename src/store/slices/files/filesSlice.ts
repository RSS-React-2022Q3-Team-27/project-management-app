import { createSlice } from '@reduxjs/toolkit';

import { FileType } from './filesApi';

export type CoversType = {
  [key: string]: {
    path: string;
    coverId: string;
    name: string;
  };
};

type FileStateType = {
  isAddFileModalOpened: boolean;
  fileData: {
    boardId: string;
    taskId: string;
    files: FileType[];
    cover: string | null;
  };
  covers: CoversType;
};

const initialState: FileStateType = {
  isAddFileModalOpened: false,
  fileData: {
    boardId: '',
    taskId: '',
    files: [],
    cover: null,
  },
  covers: {},
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
    setCovers(state, { payload }) {
      state.covers = payload;
    },
  },
});

export const { openAddFileModal, closeAddFileModal, setCovers } = filesSlice.actions;
export default filesSlice.reducer;

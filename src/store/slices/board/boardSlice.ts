import { createSlice } from '@reduxjs/toolkit';

import { createColumn, getBoardById, getColumnsInBoard } from './BoardThunks';

export type ColumnType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type FoundedBoardType = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

type BoardStateType = {
  board: FoundedBoardType;
  columns: ColumnType[];
  title: string;
  isModalOpened: boolean;
};

const initialState: BoardStateType = {
  board: {
    _id: '',
    title: '',
    owner: '',
    users: [],
  },
  columns: [],
  title: '',
  isModalOpened: false,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    clearBoard(state) {
      state.columns = [];
    },
    openAddColumnModal(state) {
      state.isModalOpened = true;
    },
    closeAddColumnModal(state) {
      state.isModalOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardById.pending, () => {
        console.log('getBoardById pending');
      })
      .addCase(getBoardById.fulfilled, (state, { payload }) => {
        console.log('getBoardById fulfilled');
        state.board = payload;
        state.title = JSON.parse(payload.title).title;
        console.log('getBoardById fulfilled');
      })
      .addCase(getBoardById.rejected, () => {
        console.log('getBoardById rejected');
      });

    builder
      .addCase(getColumnsInBoard.pending, () => {
        console.log('getColumnsInBoard pending');
      })
      .addCase(getColumnsInBoard.fulfilled, (state, { payload }) => {
        console.log('getColumnsInBoard fulfilled');
        state.columns = payload;
      })
      .addCase(getColumnsInBoard.rejected, () => {
        console.log('getColumnsInBoard rejected');
      });

    builder
      .addCase(createColumn.pending, () => {
        console.log('createColumn pending');
      })
      .addCase(createColumn.fulfilled, (state, { payload }) => {
        console.log('createColumn fulfilled');
        state.columns.push(payload);
      })
      .addCase(createColumn.rejected, () => {
        console.log('createColumn rejected');
      });
  },
});

export const { clearBoard, openAddColumnModal, closeAddColumnModal } = boardSlice.actions;
export default boardSlice.reducer;

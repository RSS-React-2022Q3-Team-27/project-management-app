import { createSlice } from '@reduxjs/toolkit';

import { getBoardsByUserId, createBoard, deleteBoard } from './boardsThunks';

export type BoardType = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type BoardsStateType = {
  boards: BoardType[];
  isAdded: boolean;
  isDeleted: boolean;
};

const initialState: BoardsStateType = {
  boards: [],
  isAdded: false,
  isDeleted: false,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    clearBoards(state) {
      state.boards = [];
    },
    isAddedFalse(state) {
      state.isAdded = false;
    },
    isDeletedFalse(state) {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsByUserId.pending, () => {
        console.log('getBoardsByUserId pending');
      })
      .addCase(getBoardsByUserId.fulfilled, (state, { payload }) => {
        console.log('getBoardsByUserId fulfilled');
        state.boards = payload;
      })
      .addCase(getBoardsByUserId.rejected, () => {
        console.log('getBoardsByUserId rejected');
      });

    builder
      .addCase(createBoard.pending, () => {
        console.log('createBoard pending');
      })
      .addCase(createBoard.fulfilled, (state, { payload }) => {
        console.log('createBoard fulfilled');
        state.boards.push(payload);
        state.isAdded = true;
      })
      .addCase(createBoard.rejected, () => {
        console.log('createBoard rejected');
      });

    builder
      .addCase(deleteBoard.pending, () => {
        console.log('deleteBoard pending');
      })
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        console.log('deleteBoard fulfilled');
        state.boards = state.boards.filter((board) => board._id !== payload._id);
        state.isDeleted = true;
      })
      .addCase(deleteBoard.rejected, () => {
        console.log('deleteBoard rejected');
      });
  },
});

export const { clearBoards, isAddedFalse, isDeletedFalse } = boardsSlice.actions;
export default boardsSlice.reducer;

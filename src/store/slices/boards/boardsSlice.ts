import { createSlice } from '@reduxjs/toolkit';

import { getBoardsByUserId, createBoard } from './boardsThunks';

export type BoardType = {
  _id: string;
  title: string;
  description: string;
  owner: string;
  users: string[];
};

export type BoardsStateType = {
  boards: BoardType[];
  isAdded: boolean;
};

const initialState: BoardsStateType = {
  boards: [],
  isAdded: false,
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
  },
});

export const { clearBoards, isAddedFalse } = boardsSlice.actions;
export default boardsSlice.reducer;

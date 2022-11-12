import { createSlice } from '@reduxjs/toolkit';

import { getBoardsByUserId } from './boardsThunks';

export type BoardType = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type BoardsStateType = {
  boards: BoardType[];
};

const initialState: BoardsStateType = {
  boards: [],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    clearBoards(state) {
      state.boards = [];
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
  },
});

export const { clearBoards } = boardsSlice.actions;
export default boardsSlice.reducer;

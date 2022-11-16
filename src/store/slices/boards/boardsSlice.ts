import { createSlice } from '@reduxjs/toolkit';

import { getBoardsByUserId, createBoard, deleteBoard, editBoard } from './boardsThunks';

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
  isDeleted: boolean;
  isEdited: boolean;
  isOpenedDialogAddBoard: boolean;
  isOpenedDialogEditBoard: boolean;
  currentBoard: BoardType | null;
};

const initialState: BoardsStateType = {
  boards: [],
  isAdded: false,
  isDeleted: false,
  isEdited: false,
  isOpenedDialogAddBoard: false,
  isOpenedDialogEditBoard: false,
  currentBoard: null,
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
    isEditedFalse(state) {
      state.isEdited = false;
    },
    setIsOpenedDialogAddBoard(state, { payload }) {
      state.isOpenedDialogAddBoard = payload;
    },
    setIsOpenedDialogEditBoard(state, { payload }) {
      state.isOpenedDialogEditBoard = payload;
    },
    setCurrentBoard(state, { payload }) {
      state.currentBoard = payload;
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

    builder
      .addCase(editBoard.pending, () => {
        console.log('editBoard pending');
      })
      .addCase(editBoard.fulfilled, (state, { payload }) => {
        console.log('editBoard fulfilled');
        state.boards = state.boards.map((board) => {
          if (board._id !== payload._id) {
            return board;
          } else {
            return payload;
          }
        });
        state.isEdited = true;
      })
      .addCase(editBoard.rejected, () => {
        console.log('editBoard rejected');
      });
  },
});

export const {
  clearBoards,
  isAddedFalse,
  isDeletedFalse,
  isEditedFalse,
  setIsOpenedDialogAddBoard,
  setIsOpenedDialogEditBoard,
  setCurrentBoard,
} = boardsSlice.actions;
export default boardsSlice.reducer;

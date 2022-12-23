import { createSlice } from '@reduxjs/toolkit';

export type BoardType = {
  _id: string;
  title: string;
  description: string;
  owner: string;
  users: string[];
};

export type BoardsStateType = {
  boards: BoardType[];
  isOpenedDialogAddBoard: boolean;
  isOpenedDialogEditBoard: boolean;
  currentBoard: BoardType | null;
};

const initialState: BoardsStateType = {
  boards: [],
  isOpenedDialogAddBoard: false,
  isOpenedDialogEditBoard: false,
  currentBoard: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setIsOpenedDialogAddBoard(state, { payload }) {
      state.isOpenedDialogAddBoard = payload;
    },
    setIsOpenedDialogEditBoard(state, { payload }) {
      state.isOpenedDialogEditBoard = payload;
    },
    setCurrentBoard(state, { payload }) {
      state.currentBoard = payload;
    },
    setBoards(state, { payload }) {
      state.boards = payload;
    },
  },
});

export const { setIsOpenedDialogAddBoard, setIsOpenedDialogEditBoard, setCurrentBoard, setBoards } =
  boardsSlice.actions;
export default boardsSlice.reducer;

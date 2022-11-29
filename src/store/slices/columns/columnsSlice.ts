import { createSlice } from '@reduxjs/toolkit';

export type ColumnType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type ColumnsStateType = {
  columns: ColumnType[];
};

const initialState: ColumnsStateType = {
  columns: [],
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setAllColumns(state, { payload }) {
      state.columns = payload;
    },
  },
});

export const { setAllColumns } = columnsSlice.actions;
export default columnsSlice.reducer;

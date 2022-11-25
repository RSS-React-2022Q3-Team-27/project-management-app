import { createSlice } from '@reduxjs/toolkit';

type TasksStateType = {
  isModalOpen: boolean;
};

const initialState: TasksStateType = {
  isModalOpen: false,
};

const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
    setModalState(state, { payload }) {
      state.isModalOpen = payload;
    },
  },
});

export const { setModalState } = pointsSlice.actions;
export default pointsSlice.reducer;

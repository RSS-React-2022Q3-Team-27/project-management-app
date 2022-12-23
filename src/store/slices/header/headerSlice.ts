import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  sideDrawer: boolean;
};

const initialState: InitialState = {
  sideDrawer: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    openSideDrawer(state) {
      state.sideDrawer = true;
    },
    closeSideDrawer(state) {
      state.sideDrawer = false;
    },
  },
});

export const { openSideDrawer, closeSideDrawer } = headerSlice.actions;
export default headerSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { HeaderState } from '../../../types/HeaderState';

type InitialState = {
  header: HeaderState;
  sideDrawer: boolean;
};

const initialState: InitialState = {
  header: HeaderState.main,
  sideDrawer: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderNotLogged(state) {
      state.header = HeaderState.notLogged;
    },
    setHeaderMain(state) {
      state.header = HeaderState.main;
    },
    setHeaderLoggedWelcome(state) {
      state.header = HeaderState.loggedWelcome;
    },
    openSideDrawer(state) {
      state.sideDrawer = true;
    },
    closeSideDrawer(state) {
      state.sideDrawer = false;
    },
  },
});

export const { setHeaderNotLogged, setHeaderMain, setHeaderLoggedWelcome, openSideDrawer, closeSideDrawer } =
  headerSlice.actions;
export default headerSlice.reducer;

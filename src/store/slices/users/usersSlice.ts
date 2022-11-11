import { createSlice } from '@reduxjs/toolkit';

import { getUsers } from './usersThunks';

export interface IUserInfo {
  _id: string;
  name: string;
  login: string;
}

export interface IInitialState {
  users: IUserInfo[];
}

const initialState: IInitialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, () => {
        console.log('getUsers pending');
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addCase(getUsers.rejected, () => {
        console.log('getUsers rejected');
      });
  },
});

// export const {  } = usersSlice.actions;
export default usersSlice.reducer;

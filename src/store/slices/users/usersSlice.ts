import { createSlice } from '@reduxjs/toolkit';

import { getUsers } from './usersThunks';

import { errorPlug } from '../user/userSlice';

export interface IUserInfo {
  _id: string;
  name: string;
  login: string;
}

export interface IInitialState {
  users: IUserInfo[];
  getUsersErrorCode: number;
}

const initialState: IInitialState = {
  users: [],
  getUsersErrorCode: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.getUsersErrorCode = 0;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        console.log('getUsers rejected');
        if (payload) {
          state.getUsersErrorCode = payload.statusCode ? payload.statusCode : errorPlug;
        }
      });
  },
});

// export const {  } = usersSlice.actions;
export default usersSlice.reducer;

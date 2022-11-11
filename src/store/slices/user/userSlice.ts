import { createSlice } from '@reduxjs/toolkit';

import { authUser, registerUser } from './userThunks';

import { LocalStorageKeys } from '../../../types/LocalStorageKeys';
import { getValueLocalStorage } from '../../../utils/getValueLocalStorage';
import { removeValueLocalStorage } from '../../../utils/removeValueLocalStorage';
import { setValueLocalStorage } from '../../../utils/setValueLocalStorage';

export interface IUserInfo {
  _id: string;
  name: string;
  login: string;
}

export interface IInitialState {
  id: string;
  userName: string;
  login: string;
  token: string;
  isUserLogIn: boolean;
  logInErrorCode: number;
}

const initialState: IInitialState = {
  id: getValueLocalStorage(LocalStorageKeys.userId),
  userName: '',
  login: '',
  token: getValueLocalStorage(LocalStorageKeys.token),
  logInErrorCode: 0,
  isUserLogIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogOut(state) {
      removeValueLocalStorage(LocalStorageKeys.token);
      removeValueLocalStorage(LocalStorageKeys.userId);
      state.id = '';
      state.userName = '';
      state.login = '';
      state.token = '';
      state.isUserLogIn = false;
    },
    setId(state, { payload }) {
      state.id = payload;
    },
    setLogin(state, { payload }) {
      state.login = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, () => {
        console.log('registerUser pending');
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        setValueLocalStorage(LocalStorageKeys.userId, payload._id);
        state.id = payload._id;
        state.login = payload.login;
        state.userName = payload.name;
      })
      .addCase(registerUser.rejected, () => {
        console.log('registerUser rejected');
      });

    builder
      .addCase(authUser.pending, (state) => {
        console.log('authUser pending');
        state.logInErrorCode = 0;
      })
      .addCase(authUser.fulfilled, (state, { payload }) => {
        setValueLocalStorage(LocalStorageKeys.token, payload.token);
        state.token = payload.token;
        state.isUserLogIn = true;
      })
      .addCase(authUser.rejected, (state, { payload }) => {
        console.log('authUser rejected');
        state.isUserLogIn = false;
        if (payload) {
          state.logInErrorCode = payload.statusCode;
        }
      });
  },
});

export const { setId, setLogin } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { authUser, registerUser, updateUser } from './userThunks';

import { LocalStorageKeys } from '../../../types/LocalStorageKeys';
import { getLoginState } from '../../../utils/getLoginState';
import { getValueLocalStorage } from '../../../utils/getValueLocalStorage';
import { removeValueLocalStorage } from '../../../utils/removeValueLocalStorage';
import { setValueLocalStorage } from '../../../utils/setValueLocalStorage';

export const errorPlug = 9999;
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
  registrationErrorCode: number;
  updateError: number;
}

const initialState: IInitialState = {
  id: getValueLocalStorage(LocalStorageKeys.userId),
  userName: '',
  login: '',
  token: getValueLocalStorage(LocalStorageKeys.token),
  logInErrorCode: 0,
  isUserLogIn: getLoginState(),
  registrationErrorCode: 0,
  updateError: 0,
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

    setUserInfo(state, { payload }) {
      console.log(payload);

      setValueLocalStorage(LocalStorageKeys.userId, payload._id);
      state.login = payload.login;
      state.id = payload._id;
      state.userName = payload.name;
    },

    setToken(state, { payload }) {
      setValueLocalStorage(LocalStorageKeys.token, payload.token);
      state.token = payload.token;
    },

    setIsUserLogIn(state, { payload }) {
      state.isUserLogIn = payload;
    },

    setId(state, { payload }) {
      setValueLocalStorage(LocalStorageKeys.userId, payload);
      state.id = payload;
    },

    setLogin(state, { payload }) {
      state.login = payload;
    },

    setLogInErrorCode(state) {
      state.logInErrorCode = 0;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.registrationErrorCode = 0;
      })

      .addCase(registerUser.fulfilled, (state, { payload }) => {
        setValueLocalStorage(LocalStorageKeys.userId, payload._id);
        state.id = payload._id;
        state.login = payload.login;
        state.userName = payload.name;
      })

      .addCase(registerUser.rejected, (state, { payload }) => {
        console.log('authUser rejected');
        state.isUserLogIn = false;
        if (payload) {
          state.registrationErrorCode = payload.statusCode ? payload.statusCode : errorPlug;
        }
      });

    builder
      .addCase(authUser.pending, (state) => {
        console.log('authUser pending');
        state.logInErrorCode = 0;
      })

      .addCase(authUser.fulfilled, (state, { payload }) => {
        setValueLocalStorage(LocalStorageKeys.token, payload.token);
        state.token = payload.token;
        state.logInErrorCode = 200;
      })

      .addCase(authUser.rejected, (state, { payload }) => {
        if (payload) {
          state.logInErrorCode = payload.statusCode ? payload.statusCode : errorPlug;
        }
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.updateError = 0;
      })

      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.login = payload.login;
        state.userName = payload.name;
        state.id = payload._id;
        setValueLocalStorage(LocalStorageKeys.userId, payload._id);
      })

      .addCase(updateUser.rejected, (state, { payload }) => {
        if (payload) {
          state.updateError = payload.statusCode ? payload.statusCode : errorPlug;
        }
      });
  },
});

export const { setId, setLogin, userLogOut, setIsUserLogIn, setUserInfo, setToken, setLogInErrorCode } =
  userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { LocalStorageKeys } from '../../../types/LocalStorageKeys';
import { getLoginState } from '../../../utils/getLoginState';
import { getValueLocalStorage } from '../../../utils/getValueLocalStorage';
import { removeValueLocalStorage } from '../../../utils/removeValueLocalStorage';
import { setValueLocalStorage } from '../../../utils/setValueLocalStorage';
import { FileType } from '../files/filesApi';

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
  avatar: string;
  isAvatarModal: boolean;
  avatarInfo: FileType | null;
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
  avatar: '',
  isAvatarModal: false,
  avatarInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAvatar(state, { payload }) {
      state.avatar = payload;
    },
    setAvatarInfo(state, { payload }) {
      console.log('avatar info', payload);

      if (payload) {
        state.avatarInfo = payload;
        state.avatar = `${URL}${payload.path}`;
      }
    },
    toggleAvatarModal(state, { payload }) {
      state.isAvatarModal = payload;
    },
    userLogOut(state) {
      removeValueLocalStorage(LocalStorageKeys.token);
      removeValueLocalStorage(LocalStorageKeys.userId);
      state.id = '';
      state.userName = '';
      state.login = '';
      state.token = '';
      state.isUserLogIn = false;
      state.avatar = '';
      state.avatarInfo = null;
    },

    setUserInfo(state, { payload }) {
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
});

export const {
  setId,
  setLogin,
  userLogOut,
  setIsUserLogIn,
  setUserInfo,
  setToken,
  setLogInErrorCode,
  setAvatar,
  toggleAvatarModal,
  setAvatarInfo,
} = userSlice.actions;
export default userSlice.reducer;

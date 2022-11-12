import { createSlice } from '@reduxjs/toolkit';

import { authUser, getUsers, registerUser } from './userThunks';

import { Language } from '../../../types/LanguageOptions';
import { LocalStorageKeys } from '../../../types/LocalStorageKeys';
import { getValueLocalStorage } from '../../../utils/getValueLocalStorage';
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
  users: IUserInfo[];
  locale: string;
}

const getUserLocale = () => {
  const userLocale = navigator.language.split('-')[0];
  const savedLocale = getValueLocalStorage(LocalStorageKeys.locale);

  console.log(userLocale);

  if (savedLocale) {
    return savedLocale;
  }

  if (userLocale === Language.en || userLocale === Language.ru) {
    return userLocale;
  }

  return Language.en;
};

const initialState: IInitialState = {
  id: getValueLocalStorage(LocalStorageKeys.userId),
  userName: '',
  login: '',
  token: getValueLocalStorage(LocalStorageKeys.token),
  users: [],
  isUserLogIn: false,
  locale: getUserLocale(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId(state, { payload }) {
      state.id = payload;
    },
    setLogin(state, { payload }) {
      state.login = payload;
    },
    setLocale(state, { payload }) {
      state.locale = payload;
      setValueLocalStorage(LocalStorageKeys.locale, payload);
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
      .addCase(authUser.pending, () => {
        console.log('authUser pending');
      })
      .addCase(authUser.fulfilled, (state, { payload }) => {
        setValueLocalStorage(LocalStorageKeys.token, payload.token);
        state.token = payload.token;
        state.isUserLogIn = true;
      })
      .addCase(authUser.rejected, (state) => {
        console.log('authUser rejected');
        state.isUserLogIn = false;
      });

    builder
      .addCase(getUsers.pending, () => {
        console.log('getUsers pending');
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.isUserLogIn = true;
        state.users = payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.isUserLogIn = false;
        console.log('getUsers rejected');
      });
  },
});

export const { setId, setLogin, setLocale } = userSlice.actions;
export default userSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toast } from 'react-toastify';

import { IUserInfo } from './usersSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import i18n from '../../../translation/i18n';

import { RootState } from '../../store';
import { FileType } from '../files/filesApi';
import { setAvatar, setAvatarId, setIsUserLogIn, setUserInfo, userLogOut } from '../user/userSlice';

export interface IError {
  statusCode: number;
  message: string;
}

export const getUserDataByLogin = (users: IUserInfo[], login: string) => users.find((user) => user.login === login);

export const getUserDataById = (users: IUserInfo[], id: string) => users.find((user) => user._id === id);

export const getUsers = createAsyncThunk<IUserInfo[], undefined, { rejectValue: IError }>(
  'users/getUsers',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const state: RootState = <RootState>getState();
    const { token, login, id, isUserLogIn } = state.user;

    try {
      const { data } = await axios.get(`${URL}${API_PATH.users}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!isUserLogIn) {
        dispatch(setIsUserLogIn(true));
      }
      const userInfo = id ? getUserDataById(data, id) : getUserDataByLogin(data, login);
      dispatch(setUserInfo(userInfo));
      if (userInfo) {
        dispatch(getFilesByUserId(userInfo.login));
      }
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(i18n.t('serverError'));

        dispatch(userLogOut());
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

export const getFilesByUserId = createAsyncThunk<FileType[], string, { rejectValue: IError }>(
  'users/getFilesByUserId',
  async (login, { rejectWithValue, getState, dispatch }) => {
    const state: RootState = <RootState>getState();
    const { token } = state.user;
    try {
      const { data } = <{ data: FileType[] }>await axios.get(`${URL}${API_PATH.file}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        params: {
          userId: login,
          taskId: login,
        },
      });

      if (data && data[0]) {
        dispatch(setAvatarId(data[0]._id));
        dispatch(setAvatar(`${URL}${data[0].path}`));
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(i18n.t('serverError'));
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

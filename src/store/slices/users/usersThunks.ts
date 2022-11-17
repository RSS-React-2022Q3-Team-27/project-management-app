import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toast } from 'react-toastify';

import { IUserInfo } from './usersSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import i18n from '../../../translation/i18n';

import { RootState } from '../../store';
import { setIsUserLogIn, setUserInfo, userLogOut } from '../user/userSlice';

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

      dispatch(setUserInfo(id ? getUserDataById(data, id) : getUserDataByLogin(data, login)));
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

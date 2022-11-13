import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toast } from 'react-toastify';

import { setToken } from './userSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import i18n from '../../../translation/i18n';

import { getUsers } from '../users/usersThunks';

export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}

export interface ICreateUserResponse {
  name: string;
  login: string;
  _id: string;
}

export interface ITokenData {
  token: string;
}

export const registerUser = createAsyncThunk<ICreateUserResponse, ICreateUser, { rejectValue: IError }>(
  'user/registerUser',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}${API_PATH.signUp}`, { ...values });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.statusCode || 9999;
        if (errorCode === 409) {
          toast.error(i18n.t('loginAlreadyExist'));
        } else {
          toast.error(i18n.t('serverError'));
        }
        return rejectWithValue(error.response?.data);
      }
      toast.error(i18n.t('serverError'));

      throw error;
    }
  }
);

export interface IError {
  statusCode: number;
  message: string;
}

export const authUser = createAsyncThunk<ITokenData, Omit<ICreateUser, 'name'>, { rejectValue: IError }>(
  'user/authUser',
  async (values, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(`${URL}${API_PATH.signIn}`, { ...values });
      dispatch(setToken(data.token));
      dispatch(getUsers());
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.statusCode || 9999;
        if (errorCode === 401) {
          toast.error(i18n.t('wrongLoginOrPassword'));
        } else {
          toast.error(i18n.t('serverError'));
        }
        return rejectWithValue(error.response?.data);
      }
      toast.error(i18n.t('serverError'));

      throw error;
    }
  }
);

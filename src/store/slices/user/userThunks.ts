import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toast } from 'react-toastify';

import { setToken } from './userSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import { translationObject } from '../../../translation/translationObject';
import { RootState } from '../../store';

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
  async (values, { rejectWithValue, getState }) => {
    const state: RootState = <RootState>getState();
    const { locale } = state.user;
    try {
      const { data } = await axios.post(`${URL}${API_PATH.signUp}`, { ...values });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.statusCode || 9999;
        if (errorCode === 409) {
          toast.error(translationObject[locale].loginAlreadyExist);
        } else {
          toast.error(translationObject[locale].serverError);
        }
        return rejectWithValue(error.response?.data);
      }
      toast.error(translationObject[locale].serverError);

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
  async (values, { rejectWithValue, dispatch, getState }) => {
    const state: RootState = <RootState>getState();
    const { locale } = state.user;

    try {
      const { data } = await axios.post(`${URL}${API_PATH.signIn}`, { ...values });
      dispatch(setToken(data.token));
      dispatch(getUsers());
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data.statusCode || 9999;
        if (errorCode === 401) {
          toast.error(translationObject[locale].wrongLoginOrPassword);
        } else {
          toast.error(translationObject[locale].serverError);
        }
        return rejectWithValue(error.response?.data);
      }
      toast.error(translationObject[locale].serverError);

      throw error;
    }
  }
);

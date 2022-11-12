import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';

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
      const response = await axios.post(`${URL}${API_PATH.signUp}`, { ...values });
      return response.data as ICreateUserResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
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
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${URL}${API_PATH.signIn}`, { ...values });
      return token.data as ITokenData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      throw error;
    }
  }
);

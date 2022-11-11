import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUserInfo } from './usersSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import { RootState } from '../../store';

export interface IError {
  statusCode: number;
  message: string;
}

export const getUsers = createAsyncThunk<IUserInfo[], undefined>(
  'users/getUsers',
  async (_, { rejectWithValue, getState }) => {
    const state: RootState = <RootState>getState();
    const token = state.user.token;
    try {
      const res = await axios.get(`${URL}${API_PATH.users}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as IError);
      }
      throw error;
    }
  }
);

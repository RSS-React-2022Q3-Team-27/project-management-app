import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BoardType } from './boardsSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import { RootState } from '../../store';

export const getBoardsByUserId = createAsyncThunk<BoardType[], unknown, { rejectValue: string }>(
  'boards/getBoardsByUserId',
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState() as RootState;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.get(`${URL}${API_PATH.boardsSet}/${user.id}`, config);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as string);
      }
      throw error;
    }
  }
);

export const createBoard = createAsyncThunk<BoardType, Omit<BoardType, '_id' | 'owner'>, { rejectValue: string }>(
  'boards/createBoard',
  async (data, { getState, rejectWithValue }) => {
    const { user } = getState() as RootState;

    const body = {
      ...data,
      owner: user.id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(`${URL}${API_PATH.boards}`, body, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as string);
      }
      throw error;
    }
  }
);

export const deleteBoard = createAsyncThunk<BoardType, string, { rejectValue: string }>(
  'boards/deleteBoard',
  async (id, { getState, rejectWithValue }) => {
    const { user } = getState() as RootState;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.delete(`${URL}${API_PATH.boards}/${id}`, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as string);
      }
      throw error;
    }
  }
);

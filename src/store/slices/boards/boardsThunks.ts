import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BoardType } from './boardsSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import { RootState } from '../../store';

export const getBoardsByUserId = createAsyncThunk<BoardType[], string, { rejectValue: string }>(
  'boards/getBoardsByUserId',
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState() as RootState;
    const data = { userId: user.id };

    try {
      const response = await axios.get(`${URL}${API_PATH.boards}`, {
        data,
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as string);
      }
      throw error;
    }
  }
);

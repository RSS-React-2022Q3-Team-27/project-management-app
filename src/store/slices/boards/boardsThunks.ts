import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BoardsType } from './boardsSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';

export const getBoardsByUserId = createAsyncThunk<BoardsType, string, { rejectValue: string }>(
  'boards/getBoardsByUserId',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}${API_PATH.boards}`, {
        params: { userId: id },
      });
      console.log(response);

      return response.data as BoardsType;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as string);
      }
      throw error;
    }
  }
);

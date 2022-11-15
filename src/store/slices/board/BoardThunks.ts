import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { toast } from 'react-toastify';

import { ColumnType, FoundedBoardType } from './boardSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import i18n from '../../../translation/i18n';
import { RootState } from '../../store';

export const getBoardById = createAsyncThunk<FoundedBoardType, string, { rejectValue: string }>(
  'board/getBoardById',
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
      const response = await axios.get(`${URL}${API_PATH.boards}/${id}`, config);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export const getColumnsInBoard = createAsyncThunk<ColumnType[], string, { rejectValue: string }>(
  'board/getColumnsInBoard',
  async (id, { getState, rejectWithValue, dispatch }) => {
    const { user } = getState() as RootState;
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.get(`${URL}${API_PATH.boards}/${id}/${API_PATH.columns}`, config);

      dispatch(getBoardById(id));
      console.log(response);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

export type CreateColumnType = {
  title: string;
  id: string;
};

export const createColumn = createAsyncThunk<ColumnType, CreateColumnType, { rejectValue: string }>(
  'board/createColumn',
  async (data, { getState, rejectWithValue }) => {
    const { user } = getState() as RootState;
    const body = {
      title: data.title,
      order: 0,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post(`${URL}${API_PATH.boards}/${data.id}/${API_PATH.columns}`, body, config);

      toast.success(i18n.t('newColumnIsAdded'));

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);

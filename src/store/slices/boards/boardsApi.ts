import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BoardType } from './boardsSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import { RootState } from '../../store';

export type CreateBoardType = Omit<BoardType, '_id'>;
export type EditBoardType = { boardId: string; body: Omit<BoardType, '_id'> };

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['Boards'],

  endpoints: (build) => ({
    getBoardsByUserId: build.query<BoardType[], string>({
      query: (userId) => `${API_PATH.boardsSet}/${userId}`,
      providesTags: ['Boards'],
    }),

    createBoard: build.mutation<BoardType, CreateBoardType>({
      query: (body) => ({
        url: `${API_PATH.boards}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards'],
    }),

    deleteBoard: build.mutation<BoardType, string>({
      query: (boardId) => ({
        url: `${API_PATH.boards}/${boardId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),

    editBoard: build.mutation<BoardType, EditBoardType>({
      query: (data) => ({
        url: `${API_PATH.boards}/${data.boardId}`,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
});

export const { useGetBoardsByUserIdQuery, useCreateBoardMutation, useDeleteBoardMutation, useEditBoardMutation } =
  boardsApi;

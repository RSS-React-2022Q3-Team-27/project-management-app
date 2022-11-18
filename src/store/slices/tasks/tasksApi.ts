import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';

import { RootState } from '../../store';

export type TaskType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

export type TaskBodyType = Omit<TaskType, 'boardId' | 'columnId' | '_id'>;

export type CreateTaskType = {
  body: TaskBodyType;
  boardId: string;
  columnId: string;
};

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
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

  tagTypes: ['Tasks'],

  endpoints: (build) => ({
    getTasksByColumnId: build.query<TaskType[], { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => `${API_PATH.boards}/${boardId}/${API_PATH.columns}/${columnId}/tasks`,
      providesTags: ['Tasks'],
    }),

    createTask: build.mutation<TaskType, CreateTaskType>({
      query: (data) => ({
        url: `${API_PATH.boards}/${data.boardId}/${API_PATH.columns}/${data.columnId}/tasks`,
        method: 'POST',
        body: data.body,
      }),
      invalidatesTags: ['Tasks'],
    }),

    getTasksByUserId: build.query<TaskType[], string>({
      query: (userId) => ({
        url: API_PATH.tasksSet,
        params: {
          userId,
        },
      }),
      providesTags: ['Tasks'],
    }),
  }),
});

export const { useGetTasksByColumnIdQuery, useCreateTaskMutation, useGetTasksByUserIdQuery } = tasksApi;

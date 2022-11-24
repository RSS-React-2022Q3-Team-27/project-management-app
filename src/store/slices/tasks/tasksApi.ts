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

export type CreateTaskBodyType = Omit<TaskType, 'boardId' | 'columnId' | '_id'>;
export type UpdateTaskBodyType = Omit<TaskType, 'boardId' | '_id'>;

export type CreateTaskType = {
  body: CreateTaskBodyType;
  boardId: string;
  columnId: string;
};

export type UpdateTaskType = {
  body: UpdateTaskBodyType;
  boardId: string;
  columnId: string;
  taskId: string;
};

export type DeletedTaskType = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export type UpdateSetOfTaskType = {
  _id: string;
  order: number;
  columnId: string;
}[];

interface IQuerySearchParams {
  search: string;
  userId: string;
}

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

    updateTask: build.mutation<TaskType, UpdateTaskType>({
      query: (data) => ({
        url: `${API_PATH.boards}/${data.boardId}/${API_PATH.columns}/${data.columnId}/tasks/${data.taskId}`,
        method: 'PUT',
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

    getTasksByQuery: build.query<TaskType[], IQuerySearchParams>({
      query: ({ search, userId }) => ({
        url: API_PATH.tasksSet,
        params: {
          userId,
          search,
        },
      }),
      providesTags: ['Tasks'],
    }),

    getTasksByBoardId: build.query<TaskType[], string>({
      query: (boardId) => `${API_PATH.tasksSet}/${boardId}`,
      providesTags: ['Tasks'],
    }),

    deleteTask: build.mutation<TaskType, DeletedTaskType>({
      query: (data) => ({
        url: `${API_PATH.boards}/${data.boardId}/${API_PATH.columns}/${data.columnId}/tasks/${data.taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateSetOfTasks: build.mutation<TaskType[], UpdateSetOfTaskType>({
      query: (data) => ({
        url: `${API_PATH.tasksSet}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetTasksByColumnIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetTasksByUserIdQuery,
  useGetTasksByQueryQuery,
  useGetTasksByBoardIdQuery,
  useDeleteTaskMutation,
  useUpdateSetOfTasksMutation,
} = tasksApi;

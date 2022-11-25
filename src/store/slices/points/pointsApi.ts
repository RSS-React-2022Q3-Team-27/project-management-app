import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import { RootState } from '../../store';

export interface IPointsRequestBody {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
}

export interface IPointsResponse {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
  _id: string;
}

export const pointsApi = createApi({
  reducerPath: 'pointsApi',
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
  tagTypes: ['Points'],
  endpoints: (build) => ({
    getPoints: build.query<IPointsResponse[], string>({
      query: (userId) => ({
        url: API_PATH.points,
        params: {
          userId,
        },
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Points' as const, _id })), { type: 'Points', id: 'LIST' }]
          : [{ type: 'Points', id: 'LIST' }],
    }),

    setPoint: build.mutation<IPointsResponse, IPointsRequestBody>({
      query: (body) => ({
        url: API_PATH.points,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Points'],
    }),

    updatePoint: build.mutation<IPointsResponse, { id: string; body: Omit<IPointsRequestBody, 'taskId' | 'boardId'> }>({
      query: ({ id, body }) => ({
        url: `${API_PATH.points}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Points'],
    }),

    deletePoint: build.mutation<IPointsResponse, string>({
      query: (id) => ({
        url: `${API_PATH.points}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Points'],
    }),
  }),
});

export const { useGetPointsQuery, useSetPointMutation, useUpdatePointMutation, useDeletePointMutation } = pointsApi;

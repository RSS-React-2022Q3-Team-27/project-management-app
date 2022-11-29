import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ColumnType } from './columnsSlice';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import { RootState } from '../../store';

export const columnsApi = createApi({
  reducerPath: 'columnsApi',
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

  tagTypes: ['Columns'],

  endpoints: (build) => ({
    getColumnsByUserId: build.query<ColumnType[], string>({
      query: (userId) => ({
        url: API_PATH.columnsSet,
        params: {
          userId,
        },
      }),
      providesTags: ['Columns'],
    }),
  }),
});

export const { useGetColumnsByUserIdQuery } = columnsApi;

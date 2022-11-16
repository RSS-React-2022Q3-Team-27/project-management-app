import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';

import { RootState } from '../../store';
import { IUserInfo } from '../users/usersSlice';

export type ColumnType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type CreateColumnType = {
  body: {
    title: string;
    order: number;
  };
  id: string;
};

export type FoundedBoardType = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

type UpdateColumnType = {
  boardId: string;
  columnId: string;
  body: {
    title: string;
    order: number;
  };
};

export type DeleteColumnType = {
  boardId: string;
  columnId: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
    // prepareHeaders: (headers, { getState }) => {
    //   const { user } = <RootState>getState();
    //   const { token } = user;
    //   headers.set('authorization', `Bearer ${token}`);
    //   return headers;
    // },
  }),
  tagTypes: ['Authentification'],
  endpoints: (build) => ({
    getUsers: build.query<IUserInfo[], undefined>({
      query: () => `${API_PATH.signUp}`,
    //   providesTags: (result) =>
    //     result
    //       ? [...result.map(({ _id }) => ({ type: 'Authentification' as const, _id })), { type: 'Authentification', _id: 'LIST' }]
    //       : [{ type: 'Authentification', id: 'LIST' }],
    // }),
    // deleteUser: build.mutation<IUserInfo, string>({
    //   query: (id) => ({ url: `${API_PATH.users}/${id}`, method: 'DELETE' }),
    //   invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    // }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = userApi;
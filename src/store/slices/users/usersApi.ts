import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';

import { RootState } from '../../store';
import { IUserInfo } from '../users/usersSlice';

interface IUpdateUserBody {
  id: string;
  body: ICreateUser;
}

export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}

export interface ITokenData {
  token: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
    prepareHeaders: (headers, { getState }) => {
      const { user } = <RootState>getState();
      const { token } = user;
      headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<IUserInfo[], undefined>({
      query: () => `${API_PATH.users}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Users' as const, _id })), { type: 'Users', _id: 'LIST' }]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    deleteUser: build.mutation<IUserInfo, string>({
      query: (id) => ({ url: `${API_PATH.users}/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: build.mutation<IUserInfo, IUpdateUserBody>({
      query: ({ body, id }) => ({ url: `${API_PATH.users}/${id}`, method: 'PUT', body }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApi;

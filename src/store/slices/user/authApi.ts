import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';
import { ICreateUser } from '../users/usersApi';

import { IUserInfo } from '../users/usersSlice';

export interface ITokenData {
  token: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${URL}`,
  }),
  tagTypes: ['Authentification'],
  endpoints: (build) => ({
    createUser: build.mutation<IUserInfo, ICreateUser>({
      query: (body) => ({
        url: API_PATH.signUp,
        method: 'POST',
        body,
      }),
    }),
    logInUser: build.mutation<ITokenData, Omit<ICreateUser, 'name'>>({
      query: (body) => ({
        url: API_PATH.signIn,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLogInUserMutation } = authApi;

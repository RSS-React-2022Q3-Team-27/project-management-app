import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_PATH } from '../../../constants/API_PATH';
import { URL } from '../../../constants/URL';

import { RootState } from '../../store';

export type FileType = {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
};

export const filesApi = createApi({
  reducerPath: 'filesApi',
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

  tagTypes: ['Files'],

  endpoints: (build) => ({
    getFilesByBoardId: build.query<FileType[], string>({
      query: (boardId) => `${API_PATH.file}/${boardId}`,
      providesTags: ['Files'],
    }),

    uploadFile: build.mutation<FileType, FormData>({
      query: (formData) => ({
        url: `${API_PATH.file}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Files'],
    }),

    deleteFile: build.mutation<FileType, string>({
      query: (fileId) => ({
        url: `${API_PATH.file}/${fileId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Files'],
    }),
  }),
});

export const { useGetFilesByBoardIdQuery, useUploadFileMutation, useDeleteFileMutation } = filesApi;

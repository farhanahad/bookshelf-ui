/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bookshelf-backend11.vercel.app/api/v1',
    prepareHeaders: (headers, { getState, endpoint }) => {
      const user = (getState() as RootState).user;

      if (user && endpoint !== 'refresh') {
        headers.set('authorization', `${user?.user?.token}`);
      }
      return headers;
    },
    credentials: 'include', // This allows server to set cookies
  }),
  tagTypes: ['books', 'wishlist', 'reading'],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    logIn: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: 'POST',
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: `/auth/refresh-token`,
        method: 'POST',
      }),
    }),
    addNewBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    getAllBooks: builder.query({
      query: (params) => {
        let url = '/books';

        if (params.searchTerm) {
          url += `?q=${params.searchTerm}`;
        }

        if (params.genre) {
          url += url.includes('?')
            ? `&genre=${params.genre}`
            : `?genre=${params.genre}`;
        }

        if (params.publicationDate) {
          url += url.includes('?')
            ? `&publicationDate=${params.publicationDate}`
            : `?publicationDate=${params.publicationDate}`;
        }

        return url;
      },
      providesTags: ['books'],
    }),

    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['books', 'wishlist'],
    }),
    updateSingleBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export default api;

export const {
  useSignUpMutation,
  useLogInMutation,
  useLogOutMutation,
  useRefreshTokenMutation,
  useAddNewBookMutation,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useUpdateSingleBookMutation,
  useDeleteBookMutation,
} = api;

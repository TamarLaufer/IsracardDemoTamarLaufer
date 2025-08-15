import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Book = {
  id: string;
  title: string;
  releaseDate: string;
  cover: string;
  description?: string;
  pages?: number;
};

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://potterapi-fedeperin.vercel.app',
  }),
  endpoints: builder => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/en/books',
      keepUnusedDataFor: 24 * 60 * 60,
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;

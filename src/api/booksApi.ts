import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../types/navigation';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://potterapi-fedeperin.vercel.app',
  }),
  endpoints: builder => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/en/books',
      transformResponse: (raw: any[]) =>
        raw.map(book => ({
          ...book,
          number: Number(book.number),
        })),
      keepUnusedDataFor: 24 * 60 * 60,
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;

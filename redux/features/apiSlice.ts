import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { revalidatePath } from 'next/cache';

interface TodoProps {
  slice(pageVisited: number, arg1: number): unknown;
  length: number;
  todos: Todo[];
}

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getTodos: builder.query<TodoProps, [] | void>({
      query: () => '/todos',
    }),
    /*
    Implement pagination, limit data todo untuk menampilkan 10 itemper halaman- api di fetch menggunakan query _start dan _limit (contoh:
    https://jsonplaceholder.typicode.com/todos?_start=0&_limit=10)
    */
    paginationTodos: builder.query({
      query: (page = 10) => `todos?_start=0&_limit=${page}`,
    }),
    addNewTodo: builder.mutation({
      query: (payload) => ({
        url: 'todos',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

// const { data } = apiSlice.useGetTodosQuery();
export const {
  useGetTodosQuery,
  usePaginationTodosQuery,
  useAddNewTodoMutation,
} = apiSlice;

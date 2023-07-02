import React from 'react';
import Head from 'next/head';
import {
  useGetTodosQuery,
  usePaginationTodosQuery,
} from '../redux/features/apiSlice';
import ButtonAddNewTodo from '../components/ButtonAddNewTodo';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';

export default function ListTodoSSR(todos: Todo | any) {
  const [page, setPage] = React.useState(0);
  const { data: posts, isLoading } = usePaginationTodosQuery(page);
  const { data: allDataTodo, isLoading: isLoadingAllDataTodo } =
    useGetTodosQuery();

  if (isLoadingAllDataTodo) return <h1>Loading...</h1>;

  let getTodoPropsRtk = todos;
  getTodoPropsRtk = allDataTodo;

  const pageSize = 10;
  const pageVisited = page * pageSize;

  const displayTodo_1 = getTodoPropsRtk
    .slice(pageVisited, pageVisited + pageSize)
    .map((todo) => {
      return (
        <div className='border p-3 rounded-md' key={todo.id}>
          <div className='flex flex-col items-center justify-center '>
            <span> {todo.title}</span>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(getTodoPropsRtk.length / pageSize);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <>
      <Head>
        <title>Todo Next Web App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='overflow-y-hidden h-screen'>
        <div className='flex justify-between'>
          <h1 className='sm:px-10 px-3 pt-5 text-[24px] underline cursor-pointer'>
            <Link href='/'>Todos ISR and Revalidate</Link>
          </h1>
          <h1 className='sm:px-10 px-3 pt-5 text-[24px] cursor-pointer'>
            <Link href='/todo-list-SSR'>Todos SSR </Link>
          </h1>
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-3 sm:px-10 p-3'>
          {displayTodo_1}
        </div>
        <div className='flex content-center mt-5'>
          <div className='mx-auto w-auto'>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={'pagination-btn'}
              previousLinkClassName={'pagination-btn-prev'}
              nextLinkClassName={'pagination-btn-next'}
              disabledClassName={'pagination-disabled'}
              activeClassName={'pagination-active'}
            />
          </div>
        </div>
        <ButtonAddNewTodo />
      </main>
    </>
  );
}

/**
 * 
 * Render halaman todo menggunakan strategy SSR (https://nextjs.org/docs/basic-
  features/data-fetching/get-server-side-props)
 */
export async function getServerSideProps() {
  let todos = [];

  return {
    props: {
      todos,
    },
  };
}

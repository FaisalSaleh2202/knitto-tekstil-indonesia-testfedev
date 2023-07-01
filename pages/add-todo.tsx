'use client';
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useAddNewTodoMutation } from '../redux/features/apiSlice';

export default function AddTodo(postTodo) {
  const router = useRouter();
  const [addNewTodo, { isLoading }] = useAddNewTodoMutation();
  const [postForm, setPostForm] = React.useState('Submit');

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, body, completed } = e.target.elements;
    let formData = {
      title: title.value,
      body: body.value,
      completed: completed.value,
    };
    let getPostTodoPropsRtk = postTodo;
    getPostTodoPropsRtk = formData;
    if (formData.title == '') {
      alert('note must be filled');
    } else {
      addNewTodo(getPostTodoPropsRtk)
        .unwrap()
        .then((error) => {
          console.log(error);
        });
    }
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add New Todo</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <button
        className='sm:mx-20 mx-5 mt-5'
        type='button'
        onClick={() => router.push('/')}
      >
        Back to home
      </button>
      <div className='flex flex-col content-center relative items-center sm:my-20 my-5'>
        <form onSubmit={onSubmit} className='mx-auto'>
          <div className='mb-4'>
            <label
              className='block text-white text-xl font-bold mb-2'
              htmlFor='title'
            >
              Add Notes
            </label>
            <input
              className='shadow appearance-none border sm:w-[750px] w-[350px] py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent rounded-md'
              id='title'
              type='text'
              placeholder='title'
            />
          </div>
          <div className='mb-4'>
            <textarea
              className='shadow appearance-none border sm:w-[750px] w-[350px] h-72  py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent rounded-md'
              id='body'
              placeholder='note'
            />
          </div>
          <div className='mb-4 flex-co'>
            <label htmlFor='completed'>Choose is complet ?</label>
            <select
              id='completed'
              name='completed'
              className='text-black rounded-md mx-2 bg-white'
            >
              <option value='false'>Choose</option>
              <option value='true'>Yes</option>
              <option value='false'>No</option>
            </select>
          </div>
          <div className='sm:mt-10 mt-5 text-center bg-transparent py-1 border rounded-md'>
            <button className=' text-white ' type='submit'>
              {postForm}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let postTodo = {};

  return {
    props: {
      postTodo,
    },
  };
}

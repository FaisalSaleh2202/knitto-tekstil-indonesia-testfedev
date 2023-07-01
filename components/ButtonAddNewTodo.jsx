'use client';
import Link from 'next/link';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const ButtonAddNewTodo = () => {
  return (
    <div className='absolute bottom-0 right-0 mb-20 sm:mr-20 mr-10'>
      <Link href='/add-todo'>
        <button className='h-14 w-14 bg-white text-black rounded-full'>
          <AiOutlinePlusCircle
            style={{ margin: 'auto', fontSize: '32px' }}
          />
        </button>
      </Link>
    </div>
  );
};

export default ButtonAddNewTodo;

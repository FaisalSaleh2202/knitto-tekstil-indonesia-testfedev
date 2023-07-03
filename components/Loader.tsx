import { BounceLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className='flex justify-center items-center mt-[50vh]'>
      <BounceLoader color='#ffffff' />
    </div>
  );
}

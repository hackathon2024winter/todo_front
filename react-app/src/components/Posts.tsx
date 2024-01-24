import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Posts: FC = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3">Posts</h2>
      <Outlet />
    </>
  );
}

export default Posts;
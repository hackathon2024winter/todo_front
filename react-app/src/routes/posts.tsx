import { Outlet } from 'react-router-dom';


function Posts() {

  return (
    <>
      <h2 className="text-2xl font-semibold mt-3 mb-3 ">
        Posts
      </h2>
      <Outlet />
    </>
  );
}

export default Posts;
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root: FC = () => {
  return (
    <>
      <ul className='list-disc pl-5 ml-4'>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/">Home</Link>
        </li>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/overlay">Drag Overlay</Link>
        </li>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/home1">Home1</Link>
        </li>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/posts">Posts</Link>
        </li>
      </ul>
      <Outlet />
    </>
  )
}

export default Root
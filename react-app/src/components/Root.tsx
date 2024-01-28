import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root: FC = () => {
  return (
    <>
      <ul className='list-disc pl-5 ml-4'>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/">Original Story</Link>
        </li>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/storysimple">Story Simple</Link>
        </li>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/basicsetup">BasicSetUp</Link>
        </li>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/zennver">Zenn Ver</Link>
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
import { Link, Outlet } from 'react-router-dom';

const Root = () => {
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
            to="/about">About</Link>
        </li>
        <li>
          <Link
            className="text-blue-600 visited:text-purple-600"
            to="/contact">Contact</Link>
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
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";

const Root: FC = () => {
  return (
    <>
      <MenuBar />
      <ul className="list-disc pl-5 ml-4">
        <li>
          <Link className="text-blue-600 visited:text-purple-600" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 visited:text-purple-600" to="/signup">
            Signup
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 visited:text-purple-600" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="text-blue-600 visited:text-purple-600" to="/board">
            Board
          </Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default Root;

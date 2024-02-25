import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Board from "./components/Board";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="board" element={<Board />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

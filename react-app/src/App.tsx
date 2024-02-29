import {

  RouterProvider,
  
  Route,
  
  createBrowserRouter,
  
  createRoutesFromElements,
  
  } from "react-router-dom";
  
  import ErrorPage from "./components/ErrorPage";
  
  import Signup from "./components/Signup";
  
  import Login from "./components/Login";
  
  import Board from "./components/Board";
  
  const router = createBrowserRouter(
  
  createRoutesFromElements(
  
  <>
  
  <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
  
  <Route path="signup" element={<Signup />} />
  
  <Route path="login" element={<Login />} />
  
  <Route path="board" element={<Board />} />
  
  </>
  
  )
  
  );
  
  function App() {
  
  return <RouterProvider router={router} />;
  
  }
  
  export default App;
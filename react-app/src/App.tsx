import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Root from './components/Root'
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Overlay from './components/Overlay'
import Home1 from './components/Home1'
import Posts from './components/Posts'
import Post from './components/Post'
import PostIndex from './components/PostIndex';
import { loadPosts } from './utilities/load_posts'
import { loadPost } from './utilities/load_post'
import Login from './components/Login'
import Board from './components/Board'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/overlay" element={<Overlay />} />
      <Route path="/home1" element={<Home1 />} />
      <Route path="/posts" element={<Posts />} errorElement={<ErrorPage />}>
        <Route index element={<PostIndex />} loader={loadPosts} />
        <Route path=":postId" element={<Post />} loader={loadPost} errorElement={<ErrorPage />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path='board' element={<Board />} />
    </Route >
  )
);

function App() {
  return <RouterProvider router={router} />
}
export default App
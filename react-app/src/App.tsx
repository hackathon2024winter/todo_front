import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Root from './routes/Root'
import ErrorPage from './routes/ErrorPage';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Posts from './routes/Posts'
import Post from './routes/Post'
import PostIndex from './routes/PostIndex';
import { PostsLoader } from './utilities/PostsLoader'
import { PostLoader } from './utilities/PostLoader'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/posts" element={<Posts />} errorElement={<ErrorPage />}>
        <Route index element={<PostIndex />} loader={PostsLoader} />
        <Route path=":postId" element={<Post />} loader={PostLoader} errorElement={<ErrorPage />} />
      </Route>
    </Route >
  )
);

function App() {
  return <RouterProvider router={router} />
}
export default App
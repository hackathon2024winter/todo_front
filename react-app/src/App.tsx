import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Root from './components/Root'
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Posts from './components/Posts'
import Post from './components/Post'
import PostIndex from './components/PostIndex';
import { loadPosts } from './utilities/load_posts'
import { loadPost } from './utilities/load_post'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/posts" element={<Posts />} errorElement={<ErrorPage />}>
        <Route index element={<PostIndex />} loader={loadPosts} />
        <Route path=":postId" element={<Post />} loader={loadPost} errorElement={<ErrorPage />} />
      </Route>
    </Route >
  )
);

function App() {
  return <RouterProvider router={router} />
}
export default App
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Root from './routes/root'
import ErrorPage from './routes/error-page';
import Home from './routes/home';
import About from './routes/about';
import Contact from './routes/contact';
import Posts from './routes/posts'
import Post from './routes/post'
import PostIndex from './routes/postindex';
import { PostsLoader as posts_loader } from './utilities/postsloader'
import { PostLoader as post_loader } from './utilities/postloader'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/posts" element={<Posts />} errorElement={<ErrorPage />}>
        <Route index element={<PostIndex />} loader={posts_loader} />
        <Route path=":postId" element={<Post />} loader={post_loader} errorElement={<ErrorPage />} />
      </Route>
    </Route >
  )
);

function App() {
  return <RouterProvider router={router} />
}
export default App
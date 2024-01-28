import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Root from './components/Root'
import ErrorPage from './components/ErrorPage';
import Original from './components/Original';
import StorySimple from './components/StorySimple';
import BasicSetUp from './components/BasicSetUp';
import ZennVer from './components/ZennVer';
import Posts from './components/Posts'
import Post from './components/Post'
import PostIndex from './components/PostIndex';
import { loadPosts } from './utilities/load_posts'
import { loadPost } from './utilities/load_post'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Original />} />
      <Route path="/storysimple" element={<StorySimple />} />
      <Route path="/basicsetup" element={<BasicSetUp />} />
      <Route path="/zennver" element={<ZennVer />} />
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
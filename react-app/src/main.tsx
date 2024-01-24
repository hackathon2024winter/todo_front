import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from 'react-router-dom';
import Root from './routes/root';
import Home from './routes/home';
import About from './routes/about';
import Contact from './routes/contact';
import ErrorPage from './routes/error-page';
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
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import './App.css'
import { Routes, Route, Link, NavLink, useResolvedPath, useMatch, Outlet } from 'react-router-dom'
import Home from './routes/home';
import About from './routes/about';
import Contact from './routes/contact';
import Posts from './routes/posts';
import Post from './routes/post'
import PostIndex from './routes/postindex';
import NoMatch from './routes/nomatch';

function App() {
  return (
    <div className="App">
      <h1 className='text-3xl font-bold mb-4'>Hello React Router v6</h1>
      <ul className="list-disc pl-5 ml-4">
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? { color: 'blue' } : undefined)}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <CustomLink to="/about" >About</CustomLink>
        </li>
        <li>
          {/* <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="/contact"
          >
            Contact
          </NavLink> */}

          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/contact?api_key=eimaieU9"
            state={{ detail: 'test' }}
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="/posts">
            Posts
          </NavLink>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route element={<Layout2 />}>
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/posts" element={<Posts />}>
            <Route index element={<PostIndex />} />
            <Route path=":postId" element={<Post />} />
          </Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;

type CustomLinkProps = {
  children: string;
  to: string;
};

function CustomLink(props: CustomLinkProps) {
  const resolved = useResolvedPath(props.to);
  const match = useMatch({
    path: resolved.pathname,
    end: true,
  });
  return (
    <div>
      <Link style={{ color: match ? 'blue' : '' }} to={props.to}>
        {props.children}
      </Link>
    </div>
  )
}

const Layout = () => {
  return (
    <div className="flex justify-center">
      <Outlet />
    </div>
  )
}

const Layout2 = () => {
  return (
    <div className="flex justify-end">
      <Outlet />
    </div>
  )
}
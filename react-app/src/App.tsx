import './App.css'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './routes/home';
import About from './routes/about';
import Contact from './routes/contact';
import NoMatch from './routes/nomatch';

function App() {
  return (
    <div className="App">
      <h1 className='text-3xl font-bold mb-4'>Hello React Router v6</h1>
      <ul className="list-disc pl-5">
        <li>
          {/* <Link to="/" className="text-blue-600 visited:text-purple-600">Home</Link> */}
          {/* <NavLink
            style={({ isActive }) => {
              console.log(isActive);
              return isActive ? { fontWeight: 'bold' } : {};
            }}
            to="/">
            Home
          </NavLink> */}

          <NavLink
            style={({ isActive }) => (isActive ? { color: 'blue' } : undefined)}
            to="/"
          >
            Home
          </NavLink>

        </li>
        <li>
          {/* <Link to="/about" className="text-blue-600 visited:text-purple-600">About</Link> */}
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li>
          <Link to="/contact" className="text-blue-600 visited:text-purple-600">Contact</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
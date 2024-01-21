// import './App.css'

import { Routes, Route } from 'react-router-dom'
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
          <a href="/" className="text-blue-600 visited:text-purple-600">Home</a>
        </li>
        <li>
          <a href="/about" className="text-blue-600 visited:text-purple-600">About</a>
        </li>
        <li>
          <a href="/contact" className="text-blue-600 visited:text-purple-600">Contact</a>
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
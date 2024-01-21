// import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from "./Pages/Home"
import Courses from "./Pages/Courses"
import Live from "./Pages/Live"
import Contact from "./Pages/Contact"

function App() {
  return (
    <div className="container">
      <nav>
        <ul>
          <Link to="/" className="list">
            Home
          </Link>
          <Link to="/course" className="list">
            Courses
          </Link>
          <Link to="/live" className="list">
            Live course
          </Link>
          <Link to="/contact" className="list">
            Contact
          </Link>
        </ul>
      </nav>

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/live" element={<Live />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
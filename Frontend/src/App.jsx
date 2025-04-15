import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Carousel from './components/Carousel/carousel'
import LoginPage from './components/Login/Login'
import Navbar from './components/Navbar/navbar';
import Home from './components/Pages/home'
import LandingPage from './components/Pages/LandingPage' 
import Ai from './Ai'
import Loader from './components/Pages/Loader'
import Loader2 from './components/Pages/Loader2'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center "> {/* ✅ Enforces full screen */}
      <Router>
        <Routes>
          <Route path="/navbar" element={<Navbar/>} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/loader2" element={<Loader2 />} />
          <Route path="/Ai" element={<Ai />} />
          <Route path="/home" element={<Home />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/carousel" element={<Carousel />} />
        </Routes>
      </Router>
    </div>

  )
}

export default App

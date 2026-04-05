import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import { Routes, Route } from 'react-router-dom'
import About from './Components/About'
import Footer from './Components/Footer'

function App() {
  return (
    <>
      <div className=" leading-normal">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer/>
      </div>
    </>
  )
}

export default App
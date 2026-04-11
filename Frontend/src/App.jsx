import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Toaster from "react-hot-toast"

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import About from './Components/About'
import Footer from './Components/Footer'
import Dashboard from './Components/Dashboard'
import NewEntry from './Components/NewEntry'

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
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/new-entry" element={<NewEntry/>}/>
        </Routes>
        <Footer />
      </div>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            width: "100%",
            fontSize: '20px',
            fontWeight: "700",
            borderRadius: "12px",
            color: "#145da0",
            border: "solid 2px #145da0",
            backgroundColor: "white"
          },
          iconTheme: {
            primary: '#145da0',
            secondary: 'white',
          },
        }}
      />
    </>
  )
}

export default App
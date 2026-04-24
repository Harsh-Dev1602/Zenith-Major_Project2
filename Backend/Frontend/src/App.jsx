import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import{ Toaster } from "react-hot-toast"

import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import About from './Components/About'
import Footer from './Components/Footer'
import Dashboard from './Components/Dashboard'
import NewEntry from './Components/NewEntry'
import AdminDashboard from './Admin/AdminDashboard'
import { useAuth } from './Context/AuthProvider';

function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div className=" leading-normal">
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? < Navigate to="/dashboard"/> : <Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={authUser ? < Navigate to="/dashboard"/> : <Login />} />
          <Route path="/signup" element={authUser ? < Navigate to="/dashboard"/> : <Signup />} />
          <Route path="/dashboard" element={  authUser ?(authUser?.user?.role === "@dmin" ? <Navigate to="/admin/dashboard"/>  : <Dashboard/> ) : <Navigate to="/login"/> }/>
          <Route path="/new-entry" element={ authUser ? <NewEntry/> : <Navigate to="/"/>}/>
          <Route path="/admin/dashboard" element={authUser?.user?.role === "@dmin" ? <AdminDashboard/>  : <Navigate to="/login"/>}/>
        </Routes>
        <div className={`${authUser ? " hidden" : " "}`}>
        <Footer />
        </div>
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
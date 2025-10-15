import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Citizen from './pages/Citizen'
import Observer from './pages/Observer'
import Footer from './components/Footer'



const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="admin" element={<Admin />} />
        <Route path="citizen" element={<Citizen />} />
        <Route path="observer" element={<Observer />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App

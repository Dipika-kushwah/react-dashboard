import React from 'react'
import { Routes, Router, Route } from "react-router"
import Login from '../Book/login/login'
import RegistrationForm from '../Book/signup/registration'
import Dashboard from '../Dashboard/dashboard'
import AddBook from "../Book/AddBook"
import EditBook from "../EditBook"
import ForgotPassword from '../Forgot/ForgotPassword'
import ThemeToggle from '../Theme/ThemeToggle'
const UserRoutes = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="p-4 flex justify-end">
        <ThemeToggle /> 
      </header>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/' element={<RegistrationForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  )
}

export default UserRoutes

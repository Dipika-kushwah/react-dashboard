import React from 'react'
import { Routes ,Router,Route} from "react-router"
import Login from '../Book/login/login'
import RegistrationForm from '../Book/signup/registration'
import Dashboard from '../Dashboard/dashboard'
import AddBook from "../Book/AddBook"
import EditBook from "../EditBook"
const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<RegistrationForm/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  )
}

export default UserRoutes

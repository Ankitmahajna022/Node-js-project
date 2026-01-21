import React from 'react'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import VerifyOtp from "./pages/VerifyOtp"
import Dashboard from './pages/Dashboard'
import { Routes, Route } from "react-router-dom"
import PrivateRoute from './routes/PrivateRoute'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/verifyotp' element={<VerifyOtp/>}/>
        <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      </Routes>
    </div>
  )
}

export default App

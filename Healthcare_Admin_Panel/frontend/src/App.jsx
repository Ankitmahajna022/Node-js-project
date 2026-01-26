import React from 'react'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import VerifyOtp from "./pages/VerifyOtp"
import Dashboard from './pages/Dashboard'
import VerifyOtpForgetPassword from './pages/VerifyOtpForgetPassword'
import ForgetPassword from './pages/ForgetPassword'
import { Routes, Route } from "react-router-dom"
import PrivateRoute from './routes/PrivateRoute'
import ResetPassword from './pages/ResetPassword'


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Signin/>}  />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/verifyotp' element={<VerifyOtp/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>} />
        <Route path='/verifyotpforgetpassword'element={<VerifyOtpForgetPassword/>}/>
        <Route
        path='/dashboard'
        element={
          <PrivateRoute>
            <Dashboard />

          </PrivateRoute>
        }
      />
      <Route path='/resetpassword'
      element={
        <PrivateRoute>
          <ResetPassword/>
        </PrivateRoute>
      }
      />
      </Routes>
    </div>
  )
}

export default App

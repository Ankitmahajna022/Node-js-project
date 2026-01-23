import React, { useState } from 'react'
import { api } from '../services/authApi'
import { useLocation, useNavigate } from 'react-router-dom'
import './VerifyOtp.css'

export default function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state) {
    navigate("/signin")
    return null
  }

  const handleVerify = async (e) => {
    e.preventDefault()

    try {
      const res =await api.post("/auth/verify-otp", {
        email: state.email,
        otp,
      })


      
      if(res.data.status){
        alert(res.data.message)
       navigate("/dashboard")
      }
      else{
        alert(res.data.message)
      }
     
      
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP")
    }
  }

  return (
    <div className="container-fluid otp-bg">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-5 col-lg-4">
          <div className="card otp-card shadow">
            <div className="card-body text-center">
              <h3 className="otp-title mb-2">Verify OTP</h3>
              <p className="otp-text">
                OTP sent to <br />
                <strong>{state.email}</strong>
              </p>

              <form onSubmit={handleVerify}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control text-center otp-input"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-health w-100">
                  Verify OTP
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import { useState } from 'react'
import { api } from '../services/authApi'
import { useLocation, useNavigate } from 'react-router-dom'

export default function VerifyOtp() {
  const [otp, setOtp] = useState("")
  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state) {
    navigate("/signin");
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await api.post("auth/verify-otp",
        {
          email: state.email,
          otp,
        }
      );

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div>
      <form className="otp-card" onSubmit={handleVerify}>
        <h2>Verify OTP</h2>
        <p>OTP sent to <b>{state.email}</b></p>

        <input
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <button type="submit">Verify</button>
      </form>
    </div>
  )
}

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/authApi'
import './Signin.css'

export default function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handlSignin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("All fields are required")
      return
    }

    try {
      const res= await api.post("/auth/signin", { email, password })

      if(res.data.status){
        alert(res.data.message)
        navigate("/verifyotp",{state:{email}})
      }
      else{
        alert(res.data.message)
      }
      
    } catch (error) {
      alert(error.response?.data?.message || "Signin failed")
    }
  }

  return (
    <div className="container-fluid signin-bg">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-5 col-lg-4">
          <div className="card signin-card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4 signin-title">Healthcare Sign In</h3>

              <form onSubmit={handlSignin}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    maxLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-health w-100">
                  Sign In
                </button>

                <div className="text-center mt-3">
                  <Link to="/signup" className="link-health">Create Account</Link>
                  <br />
                  <Link to="/forgetpassword" className="link-health">Forgot Password?</Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

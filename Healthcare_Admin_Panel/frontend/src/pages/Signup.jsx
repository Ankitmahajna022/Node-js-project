import React, { useState } from 'react'
import { api } from "../services/authApi"
import { useNavigate, Link } from "react-router-dom"
import './Signup.css'

function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handlSignup = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      alert("All fields are required")
      return
    }

    try {
      const res= await api.post("/auth/signup", { email, password })

      if(res.data.status){
      alert(res.data.message)
      navigate("/signin")
      }
      else{
      alert(res.data.message)
      }

    } catch (error) {
      alert(error.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className="container-fluid signup-bg">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-5 col-lg-4">
          <div className="card signup-card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4 signup-title">
                Healthcare Sign Up
              </h3>

              <form onSubmit={handlSignup}>
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
                  Sign Up
                </button>

                <div className="text-center mt-3">
                  <Link to="/signin" className="link-health">
                    Already have an account? Sign In
                  </Link>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

import { useState } from "react"
import { api } from "../services/authApi"
import { useNavigate, Link } from "react-router-dom"
import "./ForgetPassword.css"

function ForgetPassword() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleForgetPassword = async (e) => {
    e.preventDefault()

    if (!email) {
      alert("Email is required")
      return
    }

    try {
      await api.post("/auth/forget-password", { email })

      alert("OTP sent to your email")
      navigate("/verifyotpforgetpassword", { state: { email } })
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="container-fluid forget-bg">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className="card forget-card shadow">
            <div className="card-body text-center">
              <h3 className="forget-title mb-2">Forgot Password</h3>
              <p className="forget-text">
                Enter your registered email to receive OTP
              </p>

              <form onSubmit={handleForgetPassword}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-health w-100">
                  Send OTP
                </button>
              </form>

              <div className="mt-3">
                <Link to="/signin" className="link-health">
                  Back to Sign In
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword

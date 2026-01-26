import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/authApi"
import "./ResetPassword.css"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const navigate = useNavigate()

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (!email || !oldPassword || !newPassword) {
      alert("All fields are required")
      return
    }

    try {
      const res = await api.post("/auth/change-password", {
        email,
        oldPassword,
        newPassword,
      })

      if (res.data?.status) {
        alert(res.data.message)
        navigate("/dashboard")
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="container-fluid reset-bg">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className="card reset-card shadow">
            <div className="card-body text-center">
              <h3 className="reset-title mb-3">Change Password</h3>

              <form onSubmit={handleChangePassword}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New Password"
                    value={newPassword}
                    minLength={8}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-health w-100">
                  Update Password
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from "react"
import { api } from "../services/authApi"
import { useNavigate } from "react-router-dom"

function ForgetPassword() {
  const [email, setEmail] = useState("")
  const navigate=useNavigate()


  const handleForgetPassword = async (e) => {
    e.preventDefault()

    try {
      await api.post("/auth/forget-password", { email});

      alert("Check you email will are send otp ....!")
      navigate("/verifyotpforgetpassword", { state: { email } })


    } catch (error) {
      alert(error.response?.data?.message);
    }
  }

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={handleForgetPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send OTP</button>
      </form>
    </div>
  
  )
}

export default ForgetPassword
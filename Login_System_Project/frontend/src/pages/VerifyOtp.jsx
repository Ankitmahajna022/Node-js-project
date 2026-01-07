import { useState } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"

export default function VerifyOtp() {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const { state } = useLocation()

    const handlVerify = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/api/auth/verify-otp", {
                email: state.email,
                otp
            }, {
    withCredentials: true 
  })
            navigate("/dashboard");
        } catch (error) {
            alert(err.response?.data?.message || "Invalid OTP");
        }

    }

    return (
        <div>
            <form onSubmit={handlVerify}>
                <h2>Verify OTP</h2>
                <input placeholder="Enter OTP" onChange={e => setOtp(e.target.value)} />
                <button>Verify</button>
            </form>
        </div>
    )
}

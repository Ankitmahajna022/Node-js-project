import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export default function Signin() {
    const [email, setEmail ] = useState("")
    const [password, setPassword ]= useState("")
    const navigate = useNavigate()

    const handleSignin =async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:5000/api/auth/signin", { email, password })
            navigate("/verify-otp", { state: { email } });
        } catch (error) {
            alert(err.response?.data?.message || "Error");
        }
    }
    return (
        <div>
            <form onSubmit={handleSignin}>
                <h2>Signup</h2>
                <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button>Signin</button>
            </form>
        </div>
    )
}

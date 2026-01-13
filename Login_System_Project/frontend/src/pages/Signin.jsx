import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/auth/signin",
                { email, password },
                { withCredentials: true }
            );

            navigate("/verify-otp", { state: { email } });
        } catch (error) {
            alert(error.response?.data?.message || "Signin failed");
        }
    };

    return (
        <div className="signin-page">
            <form className="signin-card" onSubmit={handleSignin}>
                <h2>Sign In</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Signin</button>
            </form>
        </div>
    );
}

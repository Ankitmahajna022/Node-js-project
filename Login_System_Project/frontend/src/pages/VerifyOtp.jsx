import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const { state } = useLocation();

    if (!state?.email) {
        navigate("/login");
        return null;
    }

    const handleVerify = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/auth/verify-otp",
                {
                    email: state.email,
                    otp,
                },
                {
                    withCredentials: true,
                }
            );

            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Invalid OTP");
        }
    };

    return (
        <div>
            <form onSubmit={handleVerify}>
                <h2>Verify OTP</h2>

                <input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                />

                <button type="submit">Verify</button>
            </form>
        </div>
    );
}

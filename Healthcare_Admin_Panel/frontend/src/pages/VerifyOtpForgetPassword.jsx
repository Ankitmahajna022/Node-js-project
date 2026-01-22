import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/authApi";

export default function VerifyOtpForgetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  // Redirect if user comes directly
  useEffect(() => {
    if (!state?.email) {
      navigate("/forgetpassword");
    }
  }, [state, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify-otp-forget-password", {
        email: state.email,
        otp,
        newPassword,
      });

      alert("Password reset successful");
      navigate("/signin");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div>
      <form className="otp-card" onSubmit={handleVerify}>
        <h2>Verify OTP</h2>
        <p>
          OTP sent to <b>{state?.email}</b>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          required
        />

        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={8}
          required
        />

        <button type="submit">Verify</button>
      </form>
    </div>
  );
}

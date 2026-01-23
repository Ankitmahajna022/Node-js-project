import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/authApi";
import "./VerifyOtpForgetPassword.css";

export default function VerifyOtpForgetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();


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

      if (res.data.status) {
        alert(res.data.message)
        navigate("/signin");
      }
      else {
        alert(res.data.message)
      }

    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="container-fluid otp-bg">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-4">
          <div className="card otp-card shadow">
            <div className="card-body text-center">
              <h3 className="otp-title mb-2">Reset Password</h3>
              <p className="otp-text">
                OTP sent to <br />
                <strong>{state?.email}</strong>
              </p>

              <form onSubmit={handleVerify}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control text-center otp-input"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={newPassword}
                    minLength={8}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-health w-100">
                  Verify & Reset Password
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

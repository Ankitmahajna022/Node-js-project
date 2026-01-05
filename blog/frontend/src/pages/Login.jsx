import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import"./Login.css"

export default function Login() {
  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/login", { email, password });
      await checkAuth();
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={submit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import "./Register.css"

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async e => {
    e.preventDefault();
    await api.post("/api/auth/register", { name, email, password });
    navigate("/login");
  };

  return (
    <form className="register-form" onSubmit={submit}>
  <h2>Register</h2>

  <input
    placeholder="Name"
    onChange={e => setName(e.target.value)}
    required
  />

  <input
    placeholder="Email"
    type="email"
    onChange={e => setEmail(e.target.value)}
    required
  />

  <input
    placeholder="Password"
    type="password"
    onChange={e => setPassword(e.target.value)}
    required
  />

  <button type="submit">Register</button>
</form>

  );
}

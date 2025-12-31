import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <nav className="nav">
      <Link to="/">Blogs</Link>
      <Link to="/create">Create</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

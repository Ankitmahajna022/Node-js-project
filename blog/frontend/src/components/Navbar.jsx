import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";
import "./Navbar.css"

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const logoutUser = async () => {
    await api.get("/api/auth/logout");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/create">Create Blog</Link>
          <span>Hello, {user.name}</span>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

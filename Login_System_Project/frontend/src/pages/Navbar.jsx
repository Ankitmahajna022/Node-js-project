import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <h2 className="logo">AuthApp</h2>

            <div className="nav-links">
                <Link to="/signin">Signin</Link>
                <Link to="/signup" className="signup-btn">Signup</Link>
            </div>
        </nav>
    );
}

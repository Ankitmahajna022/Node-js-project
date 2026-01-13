import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
    const logout = async () => {
        await axios.post(
            "http://localhost:5000/api/auth/logout",
            {},
            { withCredentials: true }
        );
        window.location.href = "/signin";
    };

    return (
        <div className="dashboard">
            <div className="card">
                <h1>Welcome 🎉</h1>
                <p>You are successfully logged in</p>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}

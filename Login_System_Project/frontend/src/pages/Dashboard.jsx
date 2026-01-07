import axios from "axios"

export default function Dashboard() {
    const logout = async () => {
        await axios.post("http://localhost:5000/api/auth/logout")
        window.location.href = "/signin"
    }
    return (
        <div>
            <h1>Welcome 🎉</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Dashboard.css"

function Dashboard() {
  const navigate = useNavigate()

  const [user] = useState({
    email: "user@example.com",
    role: "Patient",
  })

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <h2 className="logo">HealthCare</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Profile</li>
          <li>Appointments</li>
          <li onClick={() => navigate("/resetpassword")}>Reset Password</li>
          <li className="logout">Logout</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h3>Dashboard</h3>
          <span className="user-email">{user.email}</span>
        </header>

        <section className="dashboard-cards">
          <div className="card">
            <h4>User Role</h4>
            <p>{user.role}</p>
          </div>

          <div className="card">
            <h4>Appointments</h4>
            <p>0 Upcoming</p>
          </div>

          <div className="card">
            <h4>Status</h4>
            <p>Active</p>
          </div>
        </section>

        <section className="welcome-box">
          <h4>Welcome to Healthcare Dashboard 🏥</h4>
          <p>Password & profile settings available from sidebar</p>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
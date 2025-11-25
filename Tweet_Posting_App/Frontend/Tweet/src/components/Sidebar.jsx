import React from 'react';
import "./Sidebar.css"

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Logo</div>

      <nav className="nav">
        <a className="nav-item active">Home</a>
        <a className="nav-item">Explore</a>
        <a className="nav-item">Notifications</a>
        <a className="nav-item">Messages</a>
        <a className="nav-item">Bookmarks</a>
        <a className="nav-item">Lists</a>
        <a className="nav-item">Profile</a>
        <a className="nav-item">More</a>
      </nav>

      <button className="tweet-btn">Tweet</button>
    </aside>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  <button className="dark-btn" onClick={() => {
  document.body.classList.toggle("dark");
}}>
  🌙
</button>


  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate("/dashboard")}>
        Warehouse
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-item">Add Stock</Link>
        <Link to="/items">Manage Items</Link>
        <Link to="/stock">Stock Availability</Link>
        <Link to="/suggestions">Suggestions</Link>
      </div>

      <div className="nav-auth">
        {user ? (
          <>
            <span className="user-name">👤 {user}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Temporary login
    localStorage.setItem("user", email);
    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-sub">Login to continue</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <p className="auth-footer">
          New user? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

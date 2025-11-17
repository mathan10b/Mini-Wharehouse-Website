import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields required");
      return;
    }

    alert("Account created!");
    navigate("/login");
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-sub">Join Warehouse Pro</p>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit" className="auth-btn">Signup</button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

import API_URL from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShieldAlt, FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import "../styles/policelogin.css";

function PoliceLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      if (res.data.role !== "police") {
        setError("Access denied. Use the Student portal.");
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/admin");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="pl-container">
      <div className="pl-overlay" />

      {/* Decorative blue glow orbs */}
      <div className="pl-orb pl-orb-1" />
      <div className="pl-orb pl-orb-2" />

      <button className="pl-back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft /> Back
      </button>

      <div className="pl-card">
        {/* Badge */}
        <div className="pl-badge">
          <div className="pl-badge-dot" />
          Authorized Personnel Only
        </div>

        {/* Icon */}
        <div className="pl-icon-wrap">
          <FaShieldAlt className="pl-icon" />
        </div>

        <h2 className="pl-title">Police Portal</h2>
        <p className="pl-sub">Campus Safety Connect</p>

        {error && <div className="pl-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="pl-field">
            <FaUser className="pl-field-icon" />
            <input
              className="pl-input"
              type="text"
              placeholder="Officer username"
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="pl-field">
            <FaLock className="pl-field-icon" />
            <input
              className="pl-input"
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="pl-btn">Sign In</button>
        </form>

        <p className="pl-note">
          Police accounts are issued by the administration only.
        </p>
      </div>
    </div>
  );
}

export default PoliceLogin;
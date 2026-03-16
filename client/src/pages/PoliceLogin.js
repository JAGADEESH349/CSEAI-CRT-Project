import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShieldAlt, FaUser, FaLock, FaArrowLeft, FaKey } from "react-icons/fa";
import "../styles/policelogin.css";

function PoliceLogin() {
  const navigate = useNavigate();
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError]           = useState("");
  const [attempts, setAttempts]     = useState(0);
  const [locked, setLocked]         = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (locked) {
      setError("Too many failed attempts. Please wait 5 minutes.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
        accessCode
      });

      if (res.data.role !== "police") {
        setError("Access denied. Use the Student portal.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/admin");

    } catch (err) {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setLocked(true);
        setError("Too many failed attempts. Account locked for 5 minutes.");
        setTimeout(() => {
          setLocked(false);
          setAttempts(0);
        }, 5 * 60 * 1000);
      } else {
        const msg = err.response?.data?.message || "Invalid credentials";
        setError(`${msg} — ${3 - newAttempts} attempt${3 - newAttempts === 1 ? "" : "s"} remaining`);
      }
    }
  };

  return (
    <div className="pl-container">
      <div className="pl-overlay" />

      <div className="pl-orb pl-orb-1" />
      <div className="pl-orb pl-orb-2" />

      <button className="pl-back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft /> Back
      </button>

      <div className="pl-card">
        <div className="pl-badge">
          <div className="pl-badge-dot" />
          Authorized Personnel Only
        </div>

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

          <div className="pl-field">
            <FaKey className="pl-field-icon" />
            <input
              className="pl-input"
              type="password"
              placeholder="Department Access Code"
              value={accessCode}
              required
              onChange={e => setAccessCode(e.target.value)}
            />
          </div>

          <p className="pl-access-hint">🔐 Access code is issued by administration only</p>

          <button type="submit" className="pl-btn" disabled={locked}>
            {locked ? "Account Locked 🔒" : "Sign In"}
          </button>
        </form>

        <p className="pl-note">
          Police accounts are issued by the administration only.
        </p>
      </div>
    </div>
  );
}

export default PoliceLogin;
import API_URL from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShieldAlt, FaUser, FaLock, FaUserPlus, FaArrowLeft, FaIdCard } from "react-icons/fa";
import "../styles/studentlogin.css";

function StudentLogin() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  const [loginUser, setLoginUser]   = useState("");
  const [loginPass, setLoginPass]   = useState("");
  const [loginError, setLoginError] = useState("");

  const [regUser, setRegUser]   = useState("");
  const [regRoll, setRegRoll]   = useState("");
  const [regPass, setRegPass]   = useState("");
  const [regError, setRegError] = useState("");
  const [regMsg, setRegMsg]     = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await axios.post(`${API_URL}/login`, { username: loginUser, password: loginPass });
      if (res.data.role !== "student") {
        setLoginError("Access denied. Use the Police portal.");
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/student");
    } catch {
      setLoginError("Invalid username or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError(""); setRegMsg("");
    if (!regUser || !regRoll || !regPass) { setRegError("Please fill all fields"); return; }
    try {
      await axios.post(`${API_URL}/register`, { username: regUser, rollNo: regRoll, password: regPass });
      setRegMsg("Account created! Please login.");
      setRegUser(""); setRegRoll(""); setRegPass("");
      setTimeout(() => { setFlipped(false); setRegMsg(""); }, 1800);
    } catch (err) {
      setRegError(err.response?.data?.message || "Registration failed");
    }
  };

  const flipToRegister = () => { setLoginError(""); setFlipped(true); };
  const flipToLogin    = () => { setRegError(""); setRegMsg(""); setFlipped(false); };

  return (
    <div className="sl-container">
      <div className="sl-overlay" />

      {/* ✅ FIX 1: Back button goes to landing — always visible, never hidden */}
      <button className="sl-back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft /> Back
      </button>

      {/* ✅ FIX 2: On mobile use show/hide instead of 3D flip to prevent cut-off */}
      <div className="sl-wrapper">

        {/* LOGIN PANEL */}
        <div className={`sl-panel ${flipped ? "sl-panel--hidden" : ""}`}>
          <div className="sl-icon-wrap">
            <FaShieldAlt className="sl-icon sl-icon--green" />
          </div>
          <h2 className="sl-title">Student Portal</h2>
          <p className="sl-sub">Campus Safety Connect</p>

          {loginError && <div className="sl-error">{loginError}</div>}

          <form onSubmit={handleLogin}>
            <div className="sl-field">
              <FaUser className="sl-field-icon" />
              <input className="sl-input" type="text" placeholder="Username"
                value={loginUser} required onChange={e => setLoginUser(e.target.value)} />
            </div>
            <div className="sl-field">
              <FaLock className="sl-field-icon" />
              <input className="sl-input" type="password" placeholder="Password"
                value={loginPass} required onChange={e => setLoginPass(e.target.value)} />
            </div>
            <button type="submit" className="sl-btn sl-btn--green">Sign In</button>
          </form>

          <p className="sl-toggle">
            New here?{" "}
            <span className="sl-toggle-link" onClick={flipToRegister}>Create an account</span>
          </p>
        </div>

        {/* REGISTER PANEL */}
        <div className={`sl-panel ${!flipped ? "sl-panel--hidden" : ""}`}>
          <div className="sl-icon-wrap">
            <FaUserPlus className="sl-icon sl-icon--green" />
          </div>
          <h2 className="sl-title">Create Account</h2>
          <p className="sl-sub">Student registration</p>

          {regError && <div className="sl-error">{regError}</div>}
          {regMsg   && <div className="sl-success">{regMsg}</div>}

          <form onSubmit={handleRegister}>
            <div className="sl-field">
              <FaUser className="sl-field-icon" />
              <input className="sl-input" type="text" placeholder="Choose a username"
                value={regUser} required onChange={e => setRegUser(e.target.value)} />
            </div>
            <div className="sl-field">
              <FaIdCard className="sl-field-icon" />
              <input className="sl-input" type="text" placeholder="Roll Number (e.g. 22A91A6101)"
                value={regRoll} required onChange={e => setRegRoll(e.target.value)} />
            </div>
            <div className="sl-field">
              <FaLock className="sl-field-icon" />
              <input className="sl-input" type="password" placeholder="Choose a password (min 6 chars)"
                value={regPass} required onChange={e => setRegPass(e.target.value)} />
            </div>
            <button type="submit" className="sl-btn sl-btn--green">Register</button>
          </form>

          {/* ✅ FIX 3: Proper back button INSIDE register panel — always visible */}
          <button className="sl-back-to-login-btn" onClick={flipToLogin}>
            <FaArrowLeft /> Back to Login
          </button>

          <p className="sl-toggle">
            Already have an account?{" "}
            <span className="sl-toggle-link" onClick={flipToLogin}>Login here</span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default StudentLogin;
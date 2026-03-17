import API_URL from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShieldAlt, FaUser, FaLock, FaUserPlus, FaArrowLeft, FaIdCard } from "react-icons/fa";
import "../styles/studentlogin.css";

function StudentLogin() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);

  // Login state — ✅ FIX 3: students login with Roll Number now
  const [loginRoll, setLoginRoll]   = useState("");
  const [loginPass, setLoginPass]   = useState("");
  const [loginError, setLoginError] = useState("");

  // Register state
  const [regUser, setRegUser]   = useState("");
  const [regRoll, setRegRoll]   = useState("");
  const [regPass, setRegPass]   = useState("");
  const [regError, setRegError] = useState("");
  const [regMsg, setRegMsg]     = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      // Send rollNo as "username" — server will find by rollNo OR username
      const res = await axios.post(`${API_URL}/login`, { username: loginRoll, password: loginPass });
      if (res.data.role !== "student") {
        setLoginError("Access denied. Use the Police portal.");
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/student");
    } catch {
      setLoginError("Invalid Roll Number or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError(""); setRegMsg("");
    if (!regUser || !regRoll || !regPass) { setRegError("Please fill all fields"); return; }
    try {
      await axios.post(`${API_URL}/register`, { username: regUser, rollNo: regRoll, password: regPass });
      setRegMsg("Account created! Please login with your Roll Number.");
      setRegUser(""); setRegRoll(""); setRegPass("");
      setTimeout(() => { setFlipped(false); setRegMsg(""); }, 2000);
    } catch (err) {
      setRegError(err.response?.data?.message || "Registration failed");
    }
  };

  const flipToRegister = () => { setLoginError(""); setFlipped(true); };
  const flipToLogin    = () => { setRegError(""); setRegMsg(""); setFlipped(false); };

  return (
    <div className="sl-container">
      <div className="sl-overlay" />

      <button className="sl-back-btn" onClick={() => navigate("/")}>
        <FaArrowLeft /> Back
      </button>

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
            {/* ✅ FIX 3: Login with Roll Number */}
            <div className="sl-field">
              <FaIdCard className="sl-field-icon" />
              <input className="sl-input" type="text" placeholder="Roll Number (e.g. 22A91A6101)"
                value={loginRoll} required onChange={e => setLoginRoll(e.target.value)} />
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
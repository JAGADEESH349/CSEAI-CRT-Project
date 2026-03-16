import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShieldAlt, FaUser, FaLock, FaUserPlus, FaUserShield } from "react-icons/fa";
import "../styles/loginpage.css";

function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      if (response.data.role === "police") navigate("/admin");
      else navigate("/student");
    } catch(error) {
      setError("Invalid username or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");
    if (!username || !password) { setError("Please fill all fields"); return; }
    try {
      await axios.post("http://localhost:5000/register", { username, password, role });
      setMessage("Registration successful! Please login.");
      setIsRegister(false);
      setUsername(""); setPassword(""); setRole("student");
    } catch(err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError(""); setMessage("");
    setUsername(""); setPassword(""); setRole("student");
  };

  return (
    <div className="login-container">

      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="clay-card">

        {/* Icon */}
        <div className="clay-icon-wrap">
          {isRegister
            ? <FaUserPlus className="clay-icon" />
            : <FaShieldAlt className="clay-icon" />
          }
        </div>

        {/* Title */}
        <h2 className="clay-title">
          {isRegister ? "Create Account" : "Welcome to Campus Safety Connect"}
        </h2>

        {/* Subtitle */}
        <h3 className="clay-subtitle">
          {isRegister
            ? "Register to access the student portal"
            : "Please login here"
          }
        </h3>

        {error   && <div className="clay-error">{error}</div>}
        {message && <div className="clay-success">{message}</div>}

        <form onSubmit={isRegister ? handleRegister : handleLogin}>

          {/* Username */}
          <div className="clay-input-wrap">
            <FaUser className="clay-input-icon" />
            <input
              type="text"
              placeholder="Enter your username"
              className="clay-input"
              value={username}
              required
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="clay-input-wrap">
            <FaLock className="clay-input-icon" />
            <input
              type="password"
              placeholder="Enter your password"
              className="clay-input"
              value={password}
              required
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {/* Role select — register only */}
          {isRegister && (
            <div className="clay-input-wrap">
              <FaUserShield className="clay-input-icon" />
              <select
                className="clay-input"
                value={role}
                onChange={e => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="police">Police</option>
              </select>
            </div>
          )}

          <button type="submit" className="clay-btn">
            {isRegister ? "Register" : "Sign In"}
          </button>

        </form>

        <p className="clay-toggle">
          {isRegister ? "Already have an account?" : "New user?"}
          <span className="clay-toggle-link" onClick={toggleMode}>
            {isRegister ? " Login here" : " Register here"}
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;
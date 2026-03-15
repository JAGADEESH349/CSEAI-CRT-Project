
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShieldAlt, FaUserPlus, FaStar } from "react-icons/fa";
import "../styles/loginpage.css";

function Login() {

  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("student");

  const [error,setError] = useState("");
  const [message,setMessage] = useState("");


  /* =========================
     LOGIN
  ========================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/login",
        {
          username,
          password
        }
      );

      localStorage.setItem("token", response.data.token);

      if(response.data.role === "police"){
  navigate("/admin");
} else {
  navigate("/student");
}

    } 
    catch(error) {

      setError("Invalid username or password");

    }

  };


  /* =========================
     REGISTER
  ========================= */

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setMessage("");

    if(!username || !password){
      setError("Please fill all fields");
      return;
    }

    try{

      await axios.post(
        "http://localhost:5000/register",
        {
          username,
          password,
          role
        }
      );

      setMessage("Registration successful. Please login.");

      setIsRegister(false);
      setUsername("");
      setPassword("");
      setRole("student");

    }
    catch(err){

      setError(err.response?.data?.message || "Registration failed");

    }

  };


  const toggleMode = () => {

    setIsRegister(!isRegister);
    setError("");
    setMessage("");
    setUsername("");
    setPassword("");
    setRole("student");

  };


  return (

    <div className="login-container">

      <div className="login-card">

        <div className="login-header">

          {!isRegister && (
            <div style={{textAlign:"center"}}>
              <div style={{display:"flex",justifyContent:"center",gap:"5px",marginBottom:"6px"}}>
                <FaStar size={14} color="#facc15"/>
                <FaStar size={14} color="#facc15"/>
                <FaStar size={14} color="#facc15"/>
              </div>

              <FaShieldAlt size={48} color="#1e3a8a"/>
            </div>
          )}

          {isRegister && (
            <FaUserPlus size={48} color="#1e3a8a"/>
          )}

          <h3 className="portal-title">
            {isRegister ? "Create Account" : "Student-Police Portal"}
          </h3>

        </div>


        {error && (
          <p style={{color:"red",textAlign:"center"}}>
            {error}
          </p>
        )}

        {message && (
          <p style={{color:"green",textAlign:"center"}}>
            {message}
          </p>
        )}


        {/* LOGIN FORM */}

        {!isRegister && (

          <form onSubmit={handleLogin}>

            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              required
              onChange={(e)=>setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button className="login-btn">
              Login
            </button>

          </form>

        )}


        {/* REGISTER FORM */}

        {isRegister && (

          <form onSubmit={handleRegister}>

            <input
              type="text"
              placeholder="Username"
              className="login-input"
              value={username}
              required
              onChange={(e)=>setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              required
              onChange={(e)=>setPassword(e.target.value)}
            />

            <select
              className="login-input"
              value={role}
              onChange={(e)=>setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="police">Police</option>
            </select>

            <button className="login-btn">
              Register
            </button>

          </form>

        )}


        {/* TOGGLE BUTTON */}

        <p style={{textAlign:"center",marginTop:"10px"}}>

          {isRegister ? "Already have an account?" : "New user?"}

          <span
            style={{color:"#1e3a8a",cursor:"pointer",marginLeft:"5px"}}
            onClick={toggleMode}
          >

            {isRegister ? "Login here" : "Register here"}

          </span>

        </p>

      </div>

    </div>

  );

}

export default Login;


import API_URL from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaClipboardList, FaSearch, FaCheckCircle,
  FaClock, FaShieldAlt
} from "react-icons/fa";
import "../styles/studentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }
    axios.get(`${API_URL}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComplaints(res.data))
    .catch(err => console.log(err));
  }, [navigate]);

  const pending = complaints.filter(c => c.status === "Pending");
  const solved = complaints.filter(c => c.status === "Solved");

  return (
    <div className="student-page">

      {/* Hero */}
      <div className="student-hero">
        <div className="student-hero-overlay">
          <FaShieldAlt className="student-hero-icon" />
          <h1 className="student-hero-title">Welcome to Campus Safety Connect</h1>
          <p className="student-hero-subtitle">
            Your voice matters. Report safety concerns and track resolutions in real-time.
          </p>
        </div>
      </div>

      <div className="student-body">

        {/* Stats */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="s-stat-card s-total">
              <div className="s-stat-left">
                <FaClipboardList className="s-stat-icon" />
                <span className="s-stat-label">Total Complaints</span>
              </div>
              <span className="s-stat-number">{complaints.length}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="s-stat-card s-pending">
              <div className="s-stat-left">
                <FaClock className="s-stat-icon" />
                <span className="s-stat-label">Pending</span>
              </div>
              <span className="s-stat-number">{pending.length}</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="s-stat-card s-solved">
              <div className="s-stat-left">
                <FaCheckCircle className="s-stat-icon" />
                <span className="s-stat-label">Solved</span>
              </div>
              <span className="s-stat-number">{solved.length}</span>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="s-section-title">Quick Actions</div>
        <div className="student-grid">
          <div className="student-card" onClick={() => navigate("/submit")}>
            <div className="student-card-icon-wrap green">
              <FaClipboardList className="student-card-icon" />
            </div>
            <h3>Submit Complaint</h3>
            <p>Report any safety issue or concern directly to campus police.</p>
            <button className="s-card-btn green-btn">Report Now →</button>
          </div>

          <div className="student-card" onClick={() => navigate("/my-complaints")}>
            <div className="student-card-icon-wrap blue">
              <FaSearch className="student-card-icon" />
            </div>
            <h3>My Complaints</h3>
            <p>Track the status of complaints you have submitted.</p>
            <button className="s-card-btn blue-btn">View All →</button>
          </div>

          <div className="student-card" onClick={() => navigate("/my-complaints?status=pending")}>
            <div className="student-card-icon-wrap orange">
              <FaClock className="student-card-icon" />
            </div>
            <h3>Pending Complaints</h3>
            <p>View complaints that are currently being reviewed.</p>
            <button className="s-card-btn orange-btn">View Pending →</button>
          </div>

          <div className="student-card" onClick={() => navigate("/my-complaints?status=solved")}>
            <div className="student-card-icon-wrap teal">
              <FaCheckCircle className="student-card-icon" />
            </div>
            <h3>Solved Complaints</h3>
            <p>View complaints that have been resolved by campus police.</p>
            <button className="s-card-btn teal-btn">View Solved →</button>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="s-section-title" style={{ marginTop: "36px" }}>🛡️ Campus Safety Tips</div>
        <div className="safety-tips">
          <div className="tip-card">
            <span className="tip-icon">🚨</span>
            <p>Report suspicious activity immediately to campus police.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🔒</span>
            <p>Keep your belongings secure and never leave them unattended.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📱</span>
            <p>Save campus emergency numbers on your phone.</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">👥</span>
            <p>Walk in groups during late hours on campus.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
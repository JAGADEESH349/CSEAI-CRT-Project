// ✅ FIXED: Uses correct CSS class names from studentDashboard.css

import API_URL from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaShieldAlt, FaClipboardList, FaPlus, FaClock, FaCheckCircle
} from "react-icons/fa";
import "../styles/studentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }
    axios.get(`${API_URL}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => { setComplaints(res.data); setLoading(false); })
    .catch(() => setLoading(false));
  }, [navigate]);

  const total   = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const solved  = complaints.filter(c => c.status === "Solved").length;

  const recent = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="student-page">

      {/* Hero Banner */}
      <div className="student-hero">
        <div className="student-hero-overlay">
          <FaShieldAlt className="student-hero-icon" />
          <h1 className="student-hero-title">Campus Safety Connect</h1>
          <p className="student-hero-subtitle">
            Report incidents, track your complaints, and stay safe on campus.
          </p>
        </div>
      </div>

      <div className="student-body">

        {/* Stats Row */}
        <div className="row g-3 mb-4">
          <div className="col-4">
            <div className="s-stat-card s-total">
              <div className="s-stat-left">
                <FaClipboardList className="s-stat-icon" />
                <span className="s-stat-label">Total</span>
              </div>
              <span className="s-stat-number">{loading ? "…" : total}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="s-stat-card s-pending">
              <div className="s-stat-left">
                <FaClock className="s-stat-icon" />
                <span className="s-stat-label">Pending</span>
              </div>
              <span className="s-stat-number">{loading ? "…" : pending}</span>
            </div>
          </div>
          <div className="col-4">
            <div className="s-stat-card s-solved">
              <div className="s-stat-left">
                <FaCheckCircle className="s-stat-icon" />
                <span className="s-stat-label">Solved</span>
              </div>
              <span className="s-stat-number">{loading ? "…" : solved}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="s-section-title">Quick Actions</h2>
        <div className="student-grid mb-4">
          <div className="student-card" onClick={() => navigate("/submit")}>
            <div className="student-card-icon-wrap green">
              <FaPlus className="student-card-icon" />
            </div>
            <h3>Submit Complaint</h3>
            <p>Report a new safety incident on campus</p>
            <button className="s-card-btn green-btn">Report Now →</button>
          </div>

          <div className="student-card" onClick={() => navigate("/my-complaints")}>
            <div className="student-card-icon-wrap blue">
              <FaClipboardList className="student-card-icon" />
            </div>
            <h3>My Complaints</h3>
            <p>View and manage all your complaints</p>
            <button className="s-card-btn blue-btn">View All →</button>
          </div>

          <div className="student-card" onClick={() => navigate("/my-complaints?status=pending")}>
            <div className="student-card-icon-wrap orange">
              <FaClock className="student-card-icon" />
            </div>
            <h3>Pending</h3>
            <p>{loading ? "…" : `${pending} complaint${pending !== 1 ? "s" : ""} awaiting resolution`}</p>
            <button className="s-card-btn orange-btn">View Pending →</button>
          </div>

          <div className="student-card" onClick={() => navigate("/my-complaints?status=solved")}>
            <div className="student-card-icon-wrap teal">
              <FaCheckCircle className="student-card-icon" />
            </div>
            <h3>Solved</h3>
            <p>{loading ? "…" : `${solved} complaint${solved !== 1 ? "s" : ""} resolved`}</p>
            <button className="s-card-btn teal-btn">View Solved →</button>
          </div>
        </div>

        {/* Recent Complaints */}
        <h2 className="s-section-title">Recent Complaints</h2>
        {loading && <p style={{ color: "#6b7280", textAlign: "center", padding: "20px" }}>Loading…</p>}
        {!loading && recent.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 20px", background: "white", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
            <p style={{ color: "#6b7280", marginBottom: "16px" }}>No complaints yet.</p>
            <button
              onClick={() => navigate("/submit")}
              style={{ background: "linear-gradient(135deg,#059669,#34d399)", color: "white", border: "none", borderRadius: "10px", padding: "10px 22px", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
            >
              Submit your first complaint
            </button>
          </div>
        )}
        <div className="student-grid mb-4">
          {recent.map(c => (
            <div key={c._id} className="student-card" style={{ cursor: "default" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ background: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>
                  {c.category}
                </span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: c.status === "Solved" ? "#059669" : "#d97706" }}>
                  {c.status === "Solved" ? "✅ Solved" : "⏳ Pending"}
                </span>
              </div>
              <p style={{ fontSize: "13px", color: "#374151", margin: "0 0 8px", lineHeight: 1.5 }}>
                {c.description?.length > 80 ? c.description.slice(0, 80) + "…" : c.description || "No description"}
              </p>
              <span style={{ fontSize: "11px", color: "#9ca3af" }}>
                🕐 {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          ))}
        </div>
        {!loading && complaints.length > 3 && (
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <button
              onClick={() => navigate("/my-complaints")}
              style={{ background: "transparent", border: "2px solid #10b981", color: "#065f46", borderRadius: "10px", padding: "10px 24px", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
            >
              View all {total} complaints →
            </button>
          </div>
        )}

        {/* Safety Tips */}
        <h2 className="s-section-title">Safety Tips</h2>
        <div className="safety-tips mb-4">
          {[
            { emoji: "🚨", text: "Report suspicious activity immediately to campus police." },
            { emoji: "🔒", text: "Keep your belongings secure and never leave them unattended." },
            { emoji: "💻", text: "Never share your account credentials or OTPs with anyone." },
            { emoji: "👥", text: "Walk in groups during late hours on campus." },
          ].map((tip, i) => (
            <div key={i} className="tip-card">
              <span className="tip-icon">{tip.emoji}</span>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
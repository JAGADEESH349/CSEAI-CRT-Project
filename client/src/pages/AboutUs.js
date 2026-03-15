import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added for security redirect
import axios from "axios";
import { FaEnvelope, FaShieldAlt, FaCode, FaPaintBrush, FaServer, FaDatabase, FaBug, FaUser, FaUserTie } from "react-icons/fa";
import "../styles/about.css";

const iconMap = {
  FaBug: <FaBug />,
  FaServer: <FaServer />,
  FaPaintBrush: <FaPaintBrush />,
  FaCode: <FaCode />,
  FaDatabase: <FaDatabase />,
  FaShieldAlt: <FaShieldAlt />,
  FaUser: <FaUser />,
  FaUserTie: <FaUserTie />
};

function AboutUs() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get the role from localStorage
    const role = localStorage.getItem("role");
    
    // 2. CHECK FOR "police" (Matches your Login.js logic)
    if (role !== "police") {
      alert("Access Denied: Police Portal only.");
      navigate("/"); 
      return;
    }

    // 3. FETCH DATA
    axios.get("http://localhost:5000/team")
    .then(res => {
      setTeam(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("API Error:", err);
      setLoading(false);
    });
  }, [navigate]);

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-overlay">
          <FaShieldAlt className="about-hero-icon" />
          <h1 className="about-hero-title">Police Portal: Team Overview</h1>
          <p className="about-hero-subtitle">
            Student-Police Complaint Management System — Administration & Development Team
          </p>
        </div>
      </div>

      <div className="about-body">
        <div className="about-college-card">
          <div className="college-info">
            <h3>🎓 Annamacharya Institute of Technologies and Sciences</h3>
            <p>Department of Computer Science & Engineering (AI)</p>
            <p>Official Police Dashboard Content — 2025-2026</p>
          </div>
        </div>

        <div className="about-section-title">👥 Development & Management Team</div>
        
        {loading ? (
          <p style={{ color: "#94A3B8", textAlign: "center" }}>Loading secure team data...</p>
        ) : team.length === 0 ? (
          <p style={{ color: "#ef4444", textAlign: "center" }}>No team members found in database.</p>
        ) : (
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card" key={member._id || i}>
                <div className="team-card-top" style={{ background: member.color || "#1D4ED8" }}>
                  <div className="team-avatar">
                    {iconMap[member.icon] || <FaUserTie />}
                  </div>
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                </div>
                <div className="team-card-body">
                  <p className="team-desc">{member.desc}</p>
                  <div className="team-meta">
                    <span className="team-roll">ID: {member.roll}</span>
                    <a href={`mailto:${member.email}`} className="team-email">
                      <FaEnvelope /> Contact
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="about-footer">
          <p>© 2026 Admin Panel — AITS CSE AI Campus Security Division</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
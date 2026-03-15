import { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelope, FaShieldAlt, FaCode, FaPaintBrush, FaServer, FaDatabase, FaBug } from "react-icons/fa";
import "../styles/about.css";

const iconMap = {
  FaBug: <FaBug />,
  FaServer: <FaServer />,
  FaPaintBrush: <FaPaintBrush />,
  FaCode: <FaCode />,
  FaDatabase: <FaDatabase />
};

function AboutUs() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/team")
    .then(res => setTeam(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="about-page">

      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-overlay">
          <FaShieldAlt className="about-hero-icon" />
          <h1 className="about-hero-title">Student-Police Complaint Management System</h1>
          <p className="about-hero-subtitle">
            A full-stack web application bridging the gap between students and campus police —
            enabling seamless complaint submission, real-time tracking, and efficient resolution
            to ensure a safer campus environment.
          </p>
          <div className="about-badges">
            <span className="about-badge">React.js</span>
            <span className="about-badge">Node.js</span>
            <span className="about-badge">Express.js</span>
            <span className="about-badge">MongoDB</span>
            <span className="about-badge">JWT Auth</span>
          </div>
        </div>
      </div>

      <div className="about-body">

        {/* College Info */}
        <div className="about-college-card">
          <div className="college-info">
            <h3>🎓 Annamacharya Institute of Technologies and Sciences</h3>
            <p>Department of Computer Science & Engineering (AI)</p>
            <p>Academic Project — 2025-2026</p>
          </div>
        </div>

        {/* Project Overview */}
        <div className="about-section-title">📌 Project Overview</div>
        <div className="about-overview">
          <div className="overview-card">
            <span className="overview-icon">🎯</span>
            <h5>Objective</h5>
            <p>Enable students to report safety concerns and track complaint status in real-time through a dedicated portal.</p>
          </div>
          <div className="overview-card">
            <span className="overview-icon">👮</span>
            <h5>Police Portal</h5>
            <p>Provides campus police with a dashboard to view, manage, and resolve student complaints efficiently.</p>
          </div>
          <div className="overview-card">
            <span className="overview-icon">🔐</span>
            <h5>Security</h5>
            <p>Role-based authentication using JWT ensures secure access for both students and police personnel.</p>
          </div>
          <div className="overview-card">
            <span className="overview-icon">📊</span>
            <h5>Analytics</h5>
            <p>Real-time statistics and visual charts help police track complaint trends and measure resolution rates.</p>
          </div>
        </div>

        {/* Team */}
        <div className="about-section-title">👥 Meet the Team</div>
        {team.length === 0 ? (
          <p style={{ color: "#94A3B8", textAlign: "center" }}>Loading team...</p>
        ) : (
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card" key={member._id} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="team-card-top" style={{ background: member.color }}>
                  <div className="team-avatar">
                    {iconMap[member.icon]}
                  </div>
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                </div>
                <div className="team-card-body">
                  <p className="team-desc">{member.desc}</p>
                  <div className="team-meta">
                    <span className="team-roll">🎓 {member.roll}</span>
                    <a href={`mailto:${member.email}`} className="team-email">
                      <FaEnvelope /> {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="about-footer">
          <FaShieldAlt style={{ color: "#3B82F6", fontSize: "24px" }} />
          <p>© 2026 Student-Police Complaint Management System — AITS CSE AI</p>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;


import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaShieldAlt } from "react-icons/fa";
import "../styles/landing.css";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="landing-overlay" />

      <div className="landing-content">
        <div className="landing-badge">Campus Safety Connect</div>
        <h1 className="landing-title">Who are you?</h1>
        <p className="landing-sub">Select your portal to continue</p>

        <div className="landing-cards">
          <div className="portal-card student-card" onClick={() => navigate("/login/student")}>
            <div className="portal-icon-wrap student-icon-wrap">
              <FaUserGraduate className="portal-icon" />
            </div>
            <span className="portal-label">Student</span>
            <span className="portal-desc">Report incidents &amp; track complaints</span>
            <div className="portal-arrow">→</div>
          </div>

          <div className="portal-divider">or</div>

          <div className="portal-card police-card" onClick={() => navigate("/login/police")}>
            <div className="portal-icon-wrap police-icon-wrap">
              <FaShieldAlt className="portal-icon" />
            </div>
            <span className="portal-label">Police</span>
            <span className="portal-desc">Manage &amp; resolve complaints</span>
            <div className="portal-arrow">→</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
import { FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function StudentNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Dashboard", path: "/student" },
    { label: "Submit Complaint", path: "/submit" },
    { label: "My Complaints", path: "/my-complaints" },
    { label: "Pending", path: "/my-complaints?status=pending" },
    { label: "Solved", path: "/my-complaints?status=solved" },
    { label: "About Us", path: "/about" },
  ];

  const isActive = (path) => {
    if (path.includes("?")) {
      return location.pathname + location.search === path;
    }
    return location.pathname === path;
  };

  return (
    <div style={{ background: "#1e3a8a", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>

      {/* Top bar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        height: "64px",
        padding: "0 24px"
      }}>

        {/* Left - empty for balance */}
        <div />

        {/* Center - Logo + Title */}
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          <FaShieldAlt size={26} style={{ color: "#fbbf24" }} />
          <span style={{ fontWeight: "700", fontSize: "18px", letterSpacing: "0.5px" }}>
            Campus Safety Connect
          </span>
        </div>

        {/* Right - Logout */}
        <div className="d-flex justify-content-end">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
              navigate("/");
            }}
            style={{
              background: "#fbbf24",
              color: "#1e3a8a",
              border: "none",
              borderRadius: "6px",
              padding: "6px 16px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

      </div>

      {/* Nav links - centered */}
      <div style={{
        background: "#1e40af",
        display: "flex",
        justifyContent: "center",
        gap: "4px",
        padding: "6px 24px"
      }}>
        {navLinks.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            style={{
              background: isActive(link.path) ? "#fbbf24" : "transparent",
              color: isActive(link.path) ? "#1e3a8a" : "white",
              border: "none",
              borderRadius: "6px",
              padding: "6px 18px",
              cursor: "pointer",
              fontWeight: isActive(link.path) ? "700" : "400",
              fontSize: "14px",
              transition: "all 0.2s"
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

    </div>
  );
}

export default StudentNavbar;
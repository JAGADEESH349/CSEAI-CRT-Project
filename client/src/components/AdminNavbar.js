import React from "react";
import { FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Dashboard", path: "/admin" },
    { label: "All Complaints", path: "/admin/complaints" },
    { label: "Pending", path: "/admin/complaints?status=pending" },
    { label: "Solved", path: "/admin/complaints?status=solved" },
    { label: "Stats", path: "/admin/stats" },
  ];

  const isActive = (path) => {
    if (path.includes("?")) {
      return location.pathname + location.search === path;
    }
    return location.pathname === path;
  };

  return (
    <div style={{ 
      background: "#3B82F6", 
      color: "white", 
      boxShadow: "0 4px 12px rgba(59,130,246,0.3)",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      {/* Top bar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        height: "64px",
        padding: "0 24px",
        borderBottom: "1px solid rgba(255,255,255,0.15)"
      }}>
        <div />
        <div className="d-flex align-items-center" style={{ gap: "10px" }}>
          <FaShieldAlt size={26} style={{ color: "#FCD34D" }} />
          <span style={{ fontWeight: "700", fontSize: "18px", letterSpacing: "0.5px", color: "white" }}>
            Campus Police Portal
          </span>
        </div>

        <div className="d-flex justify-content-end align-items-center" style={{ gap: "10px" }}>
          
            <button
            onClick={() => navigate("/admin/about")} // Change this from "/about"
            style={{
                background: "transparent",
                color: "white",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "6px",
                padding: "6px 16px",
                fontWeight: "500",
                cursor: "pointer",
                fontSize: "14px",
                transition: "all 0.2s"
            }}
            >
            About Us
            </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            style={{
              background: "#F59E0B",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "6px 16px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px"
            }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Nav links */}
      <div style={{
        background: "#1D4ED8",
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
              background: isActive(link.path) ? "#F59E0B" : "transparent",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "6px 18px",
              cursor: "pointer",
              fontWeight: isActive(link.path) ? "700" : "400",
              fontSize: "14px"
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminNavbar;
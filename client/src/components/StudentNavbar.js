import { useState, useEffect } from "react";
import { FaShieldAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function StudentNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { label: "Dashboard",        path: "/student" },
    { label: "Submit Complaint", path: "/submit" },
    { label: "My Complaints",    path: "/my-complaints" },
    { label: "Pending",          path: "/my-complaints?status=pending" },
    { label: "Solved",           path: "/my-complaints?status=solved" },
    { label: "About Us",         path: "/about" },
  ];

  const isActive = (path) => {
    if (path.includes("?")) return location.pathname + location.search === path;
    return location.pathname === path;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <>
      <div style={{
        background: "#065f46",
        color: "white",
        boxShadow: "0 4px 12px rgba(6,95,70,0.3)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        fontFamily: "'Poppins', sans-serif",
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "60px",
          padding: "0 16px",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaShieldAlt size={22} style={{ color: "#6ee7b7", flexShrink: 0 }} />
            <span style={{ fontWeight: "700", fontSize: isMobile ? "15px" : "18px", letterSpacing: "0.3px" }}>
              Campus Safety
            </span>
          </div>

          {/* Desktop actions */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => navigate("/about")}
                style={{
                  background: "transparent", color: "white",
                  border: "1px solid rgba(255,255,255,0.4)", borderRadius: "6px",
                  padding: "6px 14px", fontWeight: "500", cursor: "pointer",
                  fontSize: "13px", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >About Us</button>
              <button
                onClick={logout}
                style={{
                  background: "#6ee7b7", color: "#065f46", border: "none",
                  borderRadius: "6px", padding: "6px 14px", fontWeight: "700",
                  cursor: "pointer", display: "flex", alignItems: "center",
                  gap: "6px", fontSize: "13px", fontFamily: "'Poppins', sans-serif",
                }}
              ><FaSignOutAlt /> Logout</button>
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: "transparent", border: "none", color: "white",
                fontSize: "20px", cursor: "pointer", padding: "4px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{
            background: "#047857",
            display: "flex",
            justifyContent: "center",
            gap: "4px",
            padding: "6px 24px",
            flexWrap: "wrap",
          }}>
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  background: isActive(link.path) ? "#6ee7b7" : "transparent",
                  color: isActive(link.path) ? "#065f46" : "rgba(255,255,255,0.85)",
                  border: "none", borderRadius: "6px", padding: "6px 14px",
                  cursor: "pointer", fontWeight: isActive(link.path) ? "700" : "400",
                  fontSize: "13px", transition: "all 0.2s",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >{link.label}</button>
            ))}
          </div>
        )}

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <div style={{
            background: "#047857",
            padding: "8px 12px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            animation: "slideDown 0.2s ease",
          }}>
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  background: isActive(link.path) ? "#6ee7b7" : "rgba(255,255,255,0.08)",
                  color: isActive(link.path) ? "#065f46" : "white",
                  border: "none", borderRadius: "8px", padding: "11px 16px",
                  cursor: "pointer", fontWeight: isActive(link.path) ? "700" : "500",
                  fontSize: "14px", textAlign: "left",
                  fontFamily: "'Poppins', sans-serif", transition: "all 0.15s",
                }}
              >{link.label}</button>
            ))}

            <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", margin: "8px 0" }} />

            <button
              onClick={logout}
              style={{
                background: "#6ee7b7", color: "#065f46", border: "none",
                borderRadius: "8px", padding: "11px 16px", fontWeight: "700",
                cursor: "pointer", fontSize: "14px", textAlign: "left",
                fontFamily: "'Poppins', sans-serif",
                display: "flex", alignItems: "center", gap: "8px",
              }}
            ><FaSignOutAlt /> Logout</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

export default StudentNavbar;
import { useState, useEffect } from "react";
import { FaShieldAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { label: "Dashboard",      path: "/admin" },
    { label: "All Complaints", path: "/admin/complaints" },
    { label: "Pending",        path: "/admin/complaints?status=pending" },
    { label: "Solved",         path: "/admin/complaints?status=solved" },
    { label: "Stats",          path: "/admin/stats" },
  ];

  const isActive = (path) => {
    if (path.includes("?")) return location.pathname + location.search === path;
    return location.pathname === path;
  };

  const logout = () => { localStorage.clear(); navigate("/"); };

  const btnBase = { border: "none", cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" };

  return (
    <>
      <div style={{ background:"#3B82F6", color:"white", boxShadow:"0 4px 12px rgba(59,130,246,0.3)", position:"sticky", top:0, zIndex:1000, fontFamily:"'Poppins', sans-serif" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", height:"60px", padding:"0 16px", borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <FaShieldAlt size={22} style={{ color:"#FCD34D", flexShrink:0 }} />
            <span style={{ fontWeight:"700", fontSize: isMobile ? "14px" : "17px" }}>
              {isMobile ? "Police Portal" : "Campus Police Portal"}
            </span>
          </div>
          {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <button onClick={() => navigate("/admin/about")} style={{ ...btnBase, background:"transparent", color:"white", border:"1px solid rgba(255,255,255,0.4)", borderRadius:"6px", padding:"6px 14px", fontWeight:"500", fontSize:"13px" }}>About Us</button>
              <button onClick={logout} style={{ ...btnBase, background:"#F59E0B", color:"white", borderRadius:"6px", padding:"6px 14px", fontWeight:"700", fontSize:"13px", display:"flex", alignItems:"center", gap:"6px" }}><FaSignOutAlt /> Logout</button>
            </div>
          )}
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} style={{ ...btnBase, background:"transparent", color:"white", fontSize:"20px", padding:"4px", display:"flex", alignItems:"center" }}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>
        {!isMobile && (
          <div style={{ background:"#1D4ED8", display:"flex", justifyContent:"center", gap:"4px", padding:"6px 24px", flexWrap:"wrap" }}>
            {navLinks.map(link => (
              <button key={link.path} onClick={() => navigate(link.path)} style={{ ...btnBase, background: isActive(link.path) ? "#F59E0B" : "transparent", color:"white", borderRadius:"6px", padding:"6px 14px", fontWeight: isActive(link.path) ? "700" : "400", fontSize:"13px" }}>{link.label}</button>
            ))}
          </div>
        )}
        {isMobile && menuOpen && (
          <div style={{ background:"#1D4ED8", padding:"8px 12px 12px", display:"flex", flexDirection:"column", gap:"4px", borderTop:"1px solid rgba(255,255,255,0.1)" }}>
            {navLinks.map(link => (
              <button key={link.path} onClick={() => navigate(link.path)} style={{ ...btnBase, background: isActive(link.path) ? "#F59E0B" : "rgba(255,255,255,0.08)", color:"white", borderRadius:"8px", padding:"11px 16px", fontWeight: isActive(link.path) ? "700" : "500", fontSize:"14px", textAlign:"left" }}>{link.label}</button>
            ))}
            <div style={{ height:"1px", background:"rgba(255,255,255,0.15)", margin:"6px 0" }} />
            <button onClick={() => navigate("/admin/about")} style={{ ...btnBase, background:"rgba(255,255,255,0.08)", color:"white", borderRadius:"8px", padding:"11px 16px", fontWeight:"500", fontSize:"14px", textAlign:"left" }}>About Us</button>
            <button onClick={logout} style={{ ...btnBase, background:"#F59E0B", color:"white", borderRadius:"8px", padding:"11px 16px", fontWeight:"700", fontSize:"14px", textAlign:"left", display:"flex", alignItems:"center", gap:"8px" }}><FaSignOutAlt /> Logout</button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </>
  );
}

export default AdminNavbar;
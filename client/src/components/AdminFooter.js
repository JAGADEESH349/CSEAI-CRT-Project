import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeart, FaChartBar, FaClipboardList, FaCheckCircle, FaLock } from "react-icons/fa";

function AdminFooter() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const toggle = (key) => setOpenSection(o => o === key ? null : key);

  const accent = "#3b82f6";
  const accentLight = "#93c5fd";

  const labelStyle = {
    fontSize: "11px", fontWeight: "700", color: accentLight,
    letterSpacing: "1px", textTransform: "uppercase",
  };

  const sectionBodyStyle = (key) => ({
    display: isMobile ? (openSection === key ? "block" : "none") : "block",
    padding: isMobile ? "0 16px 16px" : "0",
  });

  const linkStyle = {
    fontSize: "13px", color: "rgba(255,255,255,0.65)", cursor: "pointer",
    display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", transition: "color 0.2s",
  };

  const navLinks = [
    { label:"Dashboard",      path:"/admin",                           icon:<FaUserShield /> },
    { label:"All Complaints", path:"/admin/complaints",                icon:<FaClipboardList /> },
    { label:"Pending",        path:"/admin/complaints?status=pending", icon:<FaClipboardList /> },
    { label:"Solved",         path:"/admin/complaints?status=solved",  icon:<FaCheckCircle /> },
    { label:"Statistics",     path:"/admin/stats",                     icon:<FaChartBar /> },
    { label:"About Portal",   path:"/admin/about",                     icon:<FaUserShield /> },
  ];

  const contacts = [
    { icon:<FaPhoneAlt />,     label:"Hotline", value:"Emergency: 100" },
    { icon:<FaEnvelope />,     label:"Email",   value:"police@aits.edu.in" },
    { icon:<FaMapMarkerAlt />, label:"Station", value:"Rajampet Police Station" },
    { icon:<FaLock />,         label:"Secure",  value:"portal.aits.police.in" },
  ];

  const portalInfo = [
    { icon:"🔐", title:"Restricted Access", desc:"Authorized personnel only" },
    { icon:"📋", title:"Evidence Handling", desc:"All files securely stored" },
    { icon:"🛡️", title:"Data Protection",   desc:"Student data is encrypted" },
    { icon:"📊", title:"Audit Logs",         desc:"All actions are recorded" },
  ];

  return (
    <footer style={{
      background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 45%, #1d4ed8 100%)",
      color: "white",
      fontFamily: "'Poppins', sans-serif",
      marginTop: "auto",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Blobs */}
      <div style={{ position:"absolute", top:"-70px", right:"-70px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(59,130,246,0.08)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-50px", left:"-50px", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(99,102,241,0.07)", pointerEvents:"none" }} />

      {/* Accent line */}
      <div style={{ height:"4px", background:"linear-gradient(90deg, #1d4ed8, #3b82f6, #93c5fd, #3b82f6, #1d4ed8)" }} />

      {/* ── Desktop layout ── */}
      {!isMobile && (
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"48px 40px 28px", display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.4fr", gap:"40px" }}>

          {/* Brand */}
          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <FaUserShield style={{ fontSize:"24px", color:accentLight }} />
              <span style={{ fontWeight:"800", fontSize:"17px" }}>Campus Police Portal</span>
            </div>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.6)", lineHeight:"1.8", margin:0, maxWidth:"240px" }}>
              Official law enforcement interface for managing student complaints and maintaining campus safety.
            </p>
            <div style={{ background:"rgba(255,255,255,0.06)", border:`1px solid rgba(147,197,253,0.2)`, borderRadius:"12px", padding:"12px 16px", display:"flex", alignItems:"center", gap:"12px" }}>
              <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:"linear-gradient(135deg, #1d4ed8, #3b82f6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", flexShrink:0 }}>⚖️</div>
              <div>
                <div style={{ fontSize:"12px", fontWeight:"700", color:"white" }}>Rajampet Police Department</div>
                <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)", marginTop:"2px" }}>Serving & Protecting Since 2024</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:"14px", flexWrap:"wrap" }}>
              {[
                { dot:"#22c55e", label:"Portal Online" },
                { dot:"#f59e0b", label:"DB Connected" },
                { dot:"#3b82f6", label:"Secure HTTPS" },
              ].map(s => (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                  <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:s.dot, boxShadow:`0 0 6px ${s.dot}` }} />
                  <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.55)", fontWeight:"500" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ ...labelStyle, marginBottom:"16px" }}>Navigation</div>
            {navLinks.map(l => (
              <div key={l.path}
                style={linkStyle}
                onClick={() => navigate(l.path)}
                onMouseEnter={e => { e.currentTarget.style.color = accentLight; e.currentTarget.style.paddingLeft = "6px"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.paddingLeft = "0"; }}
              >
                <span style={{ color:accent, fontSize:"9px" }}>▶</span> {l.label}
              </div>
            ))}
          </div>

          {/* Portal Info */}
          <div>
            <div style={{ ...labelStyle, marginBottom:"16px" }}>Portal Info</div>
            {portalInfo.map(item => (
              <div key={item.title} style={{ display:"flex", alignItems:"flex-start", gap:"10px", marginBottom:"14px" }}>
                <span style={{ fontSize:"15px", flexShrink:0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize:"12px", fontWeight:"600", color:"rgba(255,255,255,0.85)" }}>{item.title}</div>
                  <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.45)", marginTop:"1px" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ ...labelStyle, marginBottom:"16px" }}>Police Contact</div>
            {contacts.map(item => (
              <div key={item.label} style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
                <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"rgba(59,130,246,0.15)", border:`1px solid rgba(147,197,253,0.2)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", color:accentLight, flexShrink:0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize:"10px", fontWeight:"700", color:accentLight, textTransform:"uppercase", letterSpacing:"0.6px" }}>{item.label}</div>
                  <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.8)", fontWeight:"500", marginTop:"2px" }}>{item.value}</div>
                </div>
              </div>
            ))}
            <div style={{ background:"rgba(59,130,246,0.1)", border:`1px solid rgba(147,197,253,0.2)`, borderRadius:"10px", padding:"14px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
              {[
                { label:"Categories", value:"10+" },
                { label:"Access",     value:"24/7" },
                { label:"Encrypted",  value:"100%" },
                { label:"Response",   value:"Fast" },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:"16px", fontWeight:"800", color:accentLight }}>{stat.value}</div>
                  <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.45)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile layout ── */}
      {isMobile && (
        <div>
          {/* Brand always visible */}
          <div style={{ padding:"20px 16px 14px", display:"flex", flexDirection:"column", gap:"10px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <FaUserShield style={{ fontSize:"20px", color:accentLight }} />
              <span style={{ fontWeight:"800", fontSize:"15px" }}>Campus Police Portal</span>
            </div>
            <div style={{ background:"rgba(255,255,255,0.06)", border:`1px solid rgba(147,197,253,0.2)`, borderRadius:"10px", padding:"10px 14px", display:"flex", alignItems:"center", gap:"10px" }}>
              <span style={{ fontSize:"16px" }}>⚖️</span>
              <div>
                <div style={{ fontSize:"12px", fontWeight:"700", color:"white" }}>Rajampet Police Department</div>
                <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>Serving & Protecting Since 2024</div>
              </div>
            </div>
            {/* Status dots */}
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
              {[{ dot:"#22c55e", label:"Portal Online" }, { dot:"#3b82f6", label:"Secure HTTPS" }].map(s => (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:s.dot, boxShadow:`0 0 5px ${s.dot}` }} />
                  <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.55)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height:"1px", background:"rgba(255,255,255,0.1)", margin:"0 16px" }} />

          {/* Accordion: Navigation */}
          <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", cursor:"pointer" }} onClick={() => toggle("nav")}>
              <span style={labelStyle}>Navigation</span>
              <span style={{ color:accentLight, fontSize:"12px", display:"inline-block", transform: openSection === "nav" ? "rotate(180deg)" : "none", transition:"transform 0.2s" }}>▼</span>
            </div>
            <div style={sectionBodyStyle("nav")}>
              {navLinks.map(l => (
                <div key={l.path} style={{ ...linkStyle, padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }} onClick={() => navigate(l.path)}>
                  <span style={{ color:accent, fontSize:"9px" }}>▶</span> {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Accordion: Contact */}
          <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 16px", cursor:"pointer" }} onClick={() => toggle("contact")}>
              <span style={labelStyle}>Police Contact</span>
              <span style={{ color:accentLight, fontSize:"12px", display:"inline-block", transform: openSection === "contact" ? "rotate(180deg)" : "none", transition:"transform 0.2s" }}>▼</span>
            </div>
            <div style={sectionBodyStyle("contact")}>
              {contacts.map(item => (
                <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ width:"30px", height:"30px", borderRadius:"8px", background:"rgba(59,130,246,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", color:accentLight, flexShrink:0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize:"10px", fontWeight:"700", color:accentLight, textTransform:"uppercase" }}>{item.label}</div>
                    <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.8)", fontWeight:"500" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding: isMobile ? "14px 16px" : "16px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"10px", borderTop:"1px solid rgba(147,197,253,0.15)" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
          <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", display:"flex", alignItems:"center", gap:"5px", flexWrap:"wrap" }}>
            © 2026 Rajampet Police Department · Made with <FaHeart style={{ color:"#f87171", fontSize:"10px" }} /> for public safety
          </div>
          {!isMobile && (
            <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.25)" }}>
              Unauthorized access is strictly prohibited and punishable under IT Act 2000.
            </div>
          )}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.06)", padding:"3px 8px", borderRadius:"5px", border:"1px solid rgba(255,255,255,0.08)" }}>
            v1.0.0
          </span>
          <button onClick={scrollToTop} style={{ width:"30px", height:"30px", borderRadius:"8px", background:"rgba(59,130,246,0.15)", border:`1px solid rgba(147,197,253,0.2)`, color:accentLight, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(59,130,246,0.15)"}
          >↑</button>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;
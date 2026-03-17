import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeart, FaArrowUp } from "react-icons/fa";

function StudentFooter() {
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

  const accent = "#10b981";
  const accentLight = "#6ee7b7";

  const sectionStyle = (key) => ({
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    padding: "0",
  });

  const sectionHeaderStyle = (key) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 16px",
    cursor: isMobile ? "pointer" : "default",
    userSelect: "none",
  });

  const sectionBodyStyle = (key) => ({
    display: isMobile ? (openSection === key ? "block" : "none") : "block",
    padding: isMobile ? "0 16px 16px" : "0",
    overflow: "hidden",
  });

  const labelStyle = {
    fontSize: "11px",
    fontWeight: "700",
    color: accentLight,
    letterSpacing: "1px",
    textTransform: "uppercase",
  };

  const linkStyle = {
    fontSize: "13px",
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 0",
    transition: "color 0.2s",
  };

  return (
    <footer style={{
      background: "linear-gradient(160deg, #022c22 0%, #064e3b 40%, #065f46 100%)",
      color: "white",
      fontFamily: "'Poppins', sans-serif",
      marginTop: "auto",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(16,185,129,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(110,231,183,0.06)", pointerEvents:"none" }} />

      {/* Top accent */}
      <div style={{ height:"4px", background:`linear-gradient(90deg, #065f46, ${accent}, ${accentLight}, ${accent}, #065f46)` }} />

      {/* ── Desktop layout ── */}
      {!isMobile && (
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"48px 40px 28px", display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.4fr", gap:"40px" }}>

          {/* Brand */}
          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
              <FaShieldAlt style={{ fontSize:"24px", color:accentLight }} />
              <span style={{ fontWeight:"800", fontSize:"17px" }}>Campus Safety Connect</span>
            </div>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.65)", lineHeight:"1.8", margin:0, maxWidth:"240px" }}>
              A secure, student-first platform to report safety concerns and get timely resolutions.
            </p>
            <div style={{ background:"rgba(255,255,255,0.07)", border:`1px solid rgba(110,231,183,0.2)`, borderRadius:"12px", padding:"12px 16px" }}>
              <span style={{ fontSize:"11px", fontWeight:"700", color:accentLight, letterSpacing:"0.8px", textTransform:"uppercase", display:"block", marginBottom:"4px" }}>Institution</span>
              <span style={{ fontSize:"13px", fontWeight:"600", color:"white", display:"block" }}>AITS — CSE AI Department</span>
              <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)", display:"block" }}>Rajampet, Andhra Pradesh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ ...labelStyle, marginBottom:"16px" }}>Quick Links</div>
            {[
              { label:"Dashboard",        path:"/student" },
              { label:"Submit Complaint", path:"/submit" },
              { label:"My Complaints",    path:"/my-complaints" },
              { label:"Pending",          path:"/my-complaints?status=pending" },
              { label:"Solved",           path:"/my-complaints?status=solved" },
              { label:"About Us",         path:"/about" },
            ].map(l => (
              <div key={l.path}
                style={linkStyle}
                onClick={() => navigate(l.path)}
                onMouseEnter={e => e.currentTarget.style.color = accentLight}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
              >
                <span style={{ color:accent, fontSize:"9px" }}>▶</span> {l.label}
              </div>
            ))}
          </div>

          {/* Categories */}
          <div>
            <div style={{ ...labelStyle, marginBottom:"16px" }}>Categories</div>
            {["Ragging / Bullying","Theft","Cyber Crime","Physical Assault","Stalking","Sexual Harassment","Fraud / Cheating"].map(cat => (
              <div key={cat} style={{ fontSize:"12px", color:"rgba(255,255,255,0.6)", display:"flex", alignItems:"center", gap:"6px", padding:"4px 0" }}>
                <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:accent, flexShrink:0, display:"inline-block" }} />
                {cat}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ ...labelStyle, marginBottom:"16px" }}>Contact & Help</div>
            {[
              { icon:<FaPhoneAlt />,     label:"Emergency", value:"Campus Police: 100" },
              { icon:<FaEnvelope />,     label:"Email",     value:"safety@aits.edu.in" },
              { icon:<FaMapMarkerAlt />, label:"Location",  value:"Admin Block, Ground Floor" },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", alignItems:"flex-start", gap:"12px", marginBottom:"14px" }}>
                <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"rgba(16,185,129,0.15)", border:`1px solid rgba(110,231,183,0.2)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", color:accentLight, flexShrink:0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize:"10px", fontWeight:"700", color:accentLight, textTransform:"uppercase", letterSpacing:"0.6px" }}>{item.label}</div>
                  <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.8)", fontWeight:"500", marginTop:"2px" }}>{item.value}</div>
                </div>
              </div>
            ))}
            <div
              style={{ marginTop:"8px", background:"rgba(16,185,129,0.12)", border:`1px solid rgba(110,231,183,0.25)`, borderRadius:"10px", padding:"12px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px", transition:"all 0.2s" }}
              onClick={() => navigate("/submit")}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.22)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.12)"}
            >
              <span style={{ fontSize:"18px" }}>🚨</span>
              <div>
                <div style={{ fontSize:"12px", fontWeight:"700", color:accentLight }}>Need to Report Now?</div>
                <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.6)" }}>Click to submit a complaint</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile layout ── */}
      {isMobile && (
        <div>
          {/* Brand — always visible on mobile */}
          <div style={{ padding:"20px 16px 16px", display:"flex", flexDirection:"column", gap:"12px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <FaShieldAlt style={{ fontSize:"20px", color:accentLight }} />
              <span style={{ fontWeight:"800", fontSize:"15px" }}>Campus Safety Connect</span>
            </div>
            <div style={{ background:"rgba(255,255,255,0.07)", border:`1px solid rgba(110,231,183,0.2)`, borderRadius:"10px", padding:"10px 14px" }}>
              <span style={{ fontSize:"11px", fontWeight:"600", color:accentLight, display:"block" }}>AITS — CSE AI Department</span>
              <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)" }}>Rajampet, Andhra Pradesh</span>
            </div>

            {/* Emergency CTA — always visible */}
            <div
              style={{ background:"rgba(16,185,129,0.15)", border:`1px solid rgba(110,231,183,0.3)`, borderRadius:"10px", padding:"12px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:"10px" }}
              onClick={() => navigate("/submit")}
            >
              <span style={{ fontSize:"20px" }}>🚨</span>
              <div>
                <div style={{ fontSize:"12px", fontWeight:"700", color:accentLight }}>Report Now</div>
                <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.6)" }}>Submit a complaint</div>
              </div>
            </div>
          </div>

          <div style={{ height:"1px", background:"rgba(255,255,255,0.1)", margin:"0 16px" }} />

          {/* Accordion: Quick Links */}
          <div style={sectionStyle("links")}>
            <div style={sectionHeaderStyle("links")} onClick={() => toggle("links")}>
              <span style={labelStyle}>Quick Links</span>
              <span style={{ color:accentLight, fontSize:"12px", transition:"transform 0.2s", display:"inline-block", transform: openSection === "links" ? "rotate(180deg)" : "none" }}>▼</span>
            </div>
            <div style={sectionBodyStyle("links")}>
              {[
                { label:"Dashboard", path:"/student" },
                { label:"Submit Complaint", path:"/submit" },
                { label:"My Complaints", path:"/my-complaints" },
                { label:"About Us", path:"/about" },
              ].map(l => (
                <div key={l.path} style={{ ...linkStyle, padding:"9px 0" }} onClick={() => navigate(l.path)}>
                  <span style={{ color:accent, fontSize:"9px" }}>▶</span> {l.label}
                </div>
              ))}
            </div>
          </div>

          {/* Accordion: Contact */}
          <div style={sectionStyle("contact")}>
            <div style={sectionHeaderStyle("contact")} onClick={() => toggle("contact")}>
              <span style={labelStyle}>Contact & Help</span>
              <span style={{ color:accentLight, fontSize:"12px", transition:"transform 0.2s", display:"inline-block", transform: openSection === "contact" ? "rotate(180deg)" : "none" }}>▼</span>
            </div>
            <div style={sectionBodyStyle("contact")}>
              {[
                { icon:<FaPhoneAlt />,     label:"Emergency", value:"Campus Police: 100" },
                { icon:<FaEnvelope />,     label:"Email",     value:"safety@aits.edu.in" },
                { icon:<FaMapMarkerAlt />, label:"Location",  value:"Admin Block, Ground Floor" },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"8px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ width:"30px", height:"30px", borderRadius:"8px", background:"rgba(16,185,129,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", color:accentLight, flexShrink:0 }}>
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
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding: isMobile ? "14px 16px" : "16px 40px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"10px", borderTop:"1px solid rgba(110,231,183,0.15)" }}>
        <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", display:"flex", alignItems:"center", gap:"5px", flexWrap:"wrap" }}>
          © 2026 Campus Safety Connect · Made with <FaHeart style={{ color:"#f87171", fontSize:"10px" }} /> for student safety
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
            <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:accent, boxShadow:`0 0 6px ${accent}` }} />
            <span style={{ fontSize:"10px", color:accentLight, fontWeight:"600" }}>All Systems Operational</span>
          </div>
          <button onClick={scrollToTop} style={{ width:"30px", height:"30px", borderRadius:"8px", background:"rgba(16,185,129,0.15)", border:`1px solid rgba(110,231,183,0.2)`, color:accentLight, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.15)"}
          ><FaArrowUp /></button>
        </div>
      </div>
    </footer>
  );
}

export default StudentFooter;
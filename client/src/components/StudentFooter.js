import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeart, FaArrowUp } from "react-icons/fa";

function StudentFooter() {
  const navigate = useNavigate();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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

      {/* Top accent line */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #065f46, #10b981, #6ee7b7, #10b981, #065f46)" }} />

      {/* Main footer content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 40px 32px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: "48px" }}>

        {/* ── Brand column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaShieldAlt style={{ fontSize: "26px", color: "#6ee7b7" }} />
            <span style={{ fontWeight: "800", fontSize: "18px", letterSpacing: "0.3px" }}>Campus Safety Connect</span>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: "1.8", margin: 0, maxWidth: "260px" }}>
            A secure, student-first platform to report safety concerns and get timely resolutions from campus police.
          </p>
          {/* College badge */}
          <div style={{
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(110,231,183,0.2)",
            borderRadius: "12px",
            padding: "12px 16px",
            display: "flex", flexDirection: "column", gap: "4px",
          }}>
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#6ee7b7", letterSpacing: "0.8px", textTransform: "uppercase" }}>Institution</span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "white" }}>AITS — CSE AI Department</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Rajampet, Andhra Pradesh</span>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#6ee7b7", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
            Quick Links
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Dashboard",        path: "/student" },
              { label: "Submit Complaint", path: "/submit" },
              { label: "My Complaints",    path: "/my-complaints" },
              { label: "Pending",          path: "/my-complaints?status=pending" },
              { label: "Solved",           path: "/my-complaints?status=solved" },
              { label: "About Us",         path: "/about" },
            ].map(link => (
              <span key={link.path}
                onClick={() => navigate(link.path)}
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "6px" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#6ee7b7"; e.currentTarget.style.paddingLeft = "6px"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.paddingLeft = "0"; }}
              >
                <span style={{ color: "#10b981", fontSize: "10px" }}>▶</span> {link.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Categories ── */}
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#6ee7b7", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
            Report Categories
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {["Ragging / Bullying","Theft","Cyber Crime","Physical Assault","Stalking","Sexual Harassment","Drug Activities","Fraud / Cheating"].map(cat => (
              <span key={cat} style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10b981", flexShrink: 0, display: "inline-block" }} />
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* ── Contact ── */}
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#6ee7b7", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
            Contact & Help
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: <FaPhoneAlt />,     label: "Emergency",  value: "Campus Police: 100" },
              { icon: <FaEnvelope />,     label: "Email",      value: "safety@aits.edu.in" },
              { icon: <FaMapMarkerAlt />, label: "Location",   value: "Admin Block, Ground Floor" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: "rgba(16,185,129,0.15)", border: "1px solid rgba(110,231,183,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", color: "#6ee7b7", flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#6ee7b7", textTransform: "uppercase", letterSpacing: "0.6px" }}>{item.label}</div>
                  <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.8)", fontWeight: "500", marginTop: "2px" }}>{item.value}</div>
                </div>
              </div>
            ))}

            {/* Emergency CTA */}
            <div style={{
              marginTop: "8px",
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(110,231,183,0.25)",
              borderRadius: "10px",
              padding: "12px 14px",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "10px",
            }}
              onClick={() => navigate("/submit")}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.22)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.12)"}
            >
              <span style={{ fontSize: "18px" }}>🚨</span>
              <div>
                <div style={{ fontSize: "12px", fontWeight: "700", color: "#6ee7b7" }}>Need to Report Now?</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>Click to submit a complaint</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(110,231,183,0.3), transparent)" }} />
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: "6px" }}>
          © 2026 Campus Safety Connect — AITS CSE AI · Made with <FaHeart style={{ color: "#f87171", fontSize: "11px" }} /> for student safety
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>v1.0.0</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }} />
            <span style={{ fontSize: "11px", color: "#6ee7b7", fontWeight: "600" }}>All Systems Operational</span>
          </div>
          {/* Scroll to top */}
          <button onClick={scrollToTop} style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "rgba(16,185,129,0.15)", border: "1px solid rgba(110,231,183,0.2)",
            color: "#6ee7b7", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", fontSize: "13px",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(16,185,129,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(16,185,129,0.15)"}
          >
            <FaArrowUp />
          </button>
        </div>
      </div>

    </footer>
  );
}

export default StudentFooter;
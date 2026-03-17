import { useNavigate } from "react-router-dom";
import { FaUserShield, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeart, FaChartBar, FaClipboardList, FaCheckCircle, FaLock } from "react-icons/fa";

function AdminFooter() {
  const navigate = useNavigate();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{
      background: "linear-gradient(160deg, #0f172a 0%, #1e3a5f 45%, #1d4ed8 100%)",
      color: "white",
      fontFamily: "'Poppins', sans-serif",
      marginTop: "auto",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Decorative blobs */}
      <div style={{ position:"absolute", top:"-70px", right:"-70px", width:"240px", height:"240px", borderRadius:"50%", background:"rgba(59,130,246,0.08)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-50px", left:"-50px", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(99,102,241,0.07)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"400px", height:"400px", borderRadius:"50%", background:"rgba(59,130,246,0.03)", pointerEvents:"none" }} />

      {/* Top accent line */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #1d4ed8, #3b82f6, #93c5fd, #3b82f6, #1d4ed8)" }} />

      {/* Main footer content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 40px 32px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: "48px" }}>

        {/* ── Brand column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaUserShield style={{ fontSize: "26px", color: "#93c5fd" }} />
            <span style={{ fontWeight: "800", fontSize: "18px", letterSpacing: "0.3px" }}>Campus Police Portal</span>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.8", margin: 0, maxWidth: "260px" }}>
            Official law enforcement interface for managing student complaints, tracking incidents and maintaining campus safety records.
          </p>

          {/* Emblem badge */}
          <div style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(147,197,253,0.2)",
            borderRadius: "12px",
            padding: "12px 16px",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px",
              background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0,
            }}>
              ⚖️
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "white" }}>Rajampet Police Department</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>Serving & Protecting Since 2024</div>
            </div>
          </div>

          {/* Status indicators */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            {[
              { dot: "#22c55e", label: "Portal Online" },
              { dot: "#f59e0b", label: "DB Connected" },
              { dot: "#3b82f6", label: "Secure HTTPS" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: s.dot, boxShadow: `0 0 6px ${s.dot}` }} />
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", fontWeight: "500" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Navigation ── */}
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#93c5fd", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
            Navigation
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Dashboard",       path: "/admin",                          icon: <FaUserShield /> },
              { label: "All Complaints",  path: "/admin/complaints",               icon: <FaClipboardList /> },
              { label: "Pending",         path: "/admin/complaints?status=pending",icon: <FaClipboardList /> },
              { label: "Solved",          path: "/admin/complaints?status=solved", icon: <FaCheckCircle /> },
              { label: "Statistics",      path: "/admin/stats",                    icon: <FaChartBar /> },
              { label: "About Portal",    path: "/admin/about",                    icon: <FaUserShield /> },
            ].map(link => (
              <span key={link.path}
                onClick={() => navigate(link.path)}
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "8px" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#93c5fd"; e.currentTarget.style.paddingLeft = "6px"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.paddingLeft = "0"; }}
              >
                <span style={{ color: "#3b82f6", fontSize: "10px" }}>▶</span> {link.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Legal / Info ── */}
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#93c5fd", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
            Portal Info
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "🔐", title: "Restricted Access",    desc: "Authorized personnel only" },
              { icon: "📋", title: "Evidence Handling",    desc: "All files securely stored" },
              { icon: "🛡️", title: "Data Protection",      desc: "Student data is encrypted" },
              { icon: "📊", title: "Audit Logs",           desc: "All actions are recorded" },
              { icon: "⚡", title: "Real-time Updates",    desc: "Instant status changes" },
            ].map(item => (
              <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ fontSize: "15px", flexShrink: 0, marginTop: "1px" }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "rgba(255,255,255,0.85)" }}>{item.title}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", marginTop: "1px" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact ── */}
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#93c5fd", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "20px" }}>
            Police Contact
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: <FaPhoneAlt />,     label: "Hotline",   value: "Emergency: 100" },
              { icon: <FaEnvelope />,     label: "Email",     value: "police@aits.edu.in" },
              { icon: <FaMapMarkerAlt />, label: "Station",   value: "Rajampet Police Station" },
              { icon: <FaLock />,         label: "Secure",    value: "portal.aits.police.in" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  background: "rgba(59,130,246,0.15)", border: "1px solid rgba(147,197,253,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", color: "#93c5fd", flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "700", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.6px" }}>{item.label}</div>
                  <div style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.8)", fontWeight: "500", marginTop: "2px" }}>{item.value}</div>
                </div>
              </div>
            ))}

            {/* Stats summary */}
            <div style={{
              marginTop: "4px",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(147,197,253,0.2)",
              borderRadius: "10px",
              padding: "14px",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px",
            }}>
              {[
                { label: "Categories", value: "10+" },
                { label: "Access",     value: "24/7" },
                { label: "Encrypted",  value: "100%" },
                { label: "Response",   value: "Fast" },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: "#93c5fd" }}>{stat.value}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(147,197,253,0.3), transparent)" }} />
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "6px" }}>
            © 2026 Rajampet Police Department · Campus Safety Portal · Made with <FaHeart style={{ color: "#f87171", fontSize: "11px" }} /> for public safety
          </div>
          <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
            Unauthorized access is strictly prohibited and punishable under IT Act 2000.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.06)", padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.08)" }}>
            v1.0.0 · Police Build
          </span>
          <button onClick={scrollToTop} style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "rgba(59,130,246,0.15)", border: "1px solid rgba(147,197,253,0.2)",
            color: "#93c5fd", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", fontSize: "13px",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(59,130,246,0.15)"}
          >
            ↑
          </button>
        </div>
      </div>

    </footer>
  );
}

export default AdminFooter;
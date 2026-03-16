import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt, FaClipboardList, FaSearch, FaCheckCircle,
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserGraduate,
  FaLock, FaRocket, FaHeart, FaStar
} from "react-icons/fa";

/* ─── Inline styles scoped to this page ─── */
const S = {
  page: {
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    background: "#f0fdf4",
    overflowX: "hidden",
  },

  /* ── HERO ── */
  hero: {
    width: "100%",
    minHeight: "360px",
    backgroundImage: "url('/police-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  },
  heroOverlay: {
    width: "100%",
    minHeight: "360px",
    background: "linear-gradient(135deg, rgba(6,95,70,0.93), rgba(4,120,87,0.88))",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 40px",
    textAlign: "center",
    gap: "16px",
  },
  heroTitle: {
    fontSize: "clamp(24px, 5vw, 38px)",
    fontWeight: "800",
    color: "white",
    margin: 0,
    letterSpacing: "0.5px",
    textShadow: "0 2px 12px rgba(0,0,0,0.2)",
  },
  heroSub: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.9)",
    maxWidth: "650px",
    lineHeight: "1.8",
    margin: 0,
  },

  body: {
    padding: "50px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#065f46",
    marginBottom: "24px",
    borderLeft: "4px solid #10b981",
    paddingLeft: "14px",
  },
};

/* ─── Reusable animated wrapper ─── */
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Stat counter card ─── */
function StatCard({ icon, value, label, gradient, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: gradient,
          borderRadius: "16px",
          padding: "28px 24px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          textAlign: "center",
          boxShadow: hovered
            ? "0 20px 48px rgba(6,95,70,0.35)"
            : "0 6px 20px rgba(0,0,0,0.12)",
          transform: hovered ? "translateY(-8px) scale(1.03)" : "translateY(0) scale(1)",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          cursor: "default",
        }}
      >
        <div style={{ fontSize: "32px", opacity: 0.9 }}>{icon}</div>
        <div style={{ fontSize: "36px", fontWeight: "800", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: "13px", fontWeight: "600", opacity: 0.9 }}>{label}</div>
      </div>
    </FadeIn>
  );
}

/* ─── How it Works Step ─── */
function StepCard({ step, icon, title, desc, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "28px 22px",
          textAlign: "center",
          boxShadow: hovered
            ? "0 16px 40px rgba(16,185,129,0.2)"
            : "0 4px 16px rgba(0,0,0,0.07)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          borderTop: `4px solid ${hovered ? "#065f46" : "#10b981"}`,
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {/* Step number watermark */}
        <div style={{
          position: "absolute",
          top: "10px",
          right: "16px",
          fontSize: "52px",
          fontWeight: "800",
          color: "#f0fdf4",
          lineHeight: 1,
          userSelect: "none",
        }}>
          {step}
        </div>
        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: hovered
            ? "linear-gradient(135deg,#065f46,#10b981)"
            : "linear-gradient(135deg,#10b981,#34d399)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          fontSize: "24px",
          color: "white",
          transition: "background 0.3s",
          boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
        }}>
          {icon}
        </div>
        <h4 style={{ fontWeight: "700", color: "#1f2937", marginBottom: "8px", fontSize: "15px" }}>{title}</h4>
        <p style={{ color: "#6b7280", fontSize: "13px", margin: 0, lineHeight: 1.6 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, title, desc, color, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "28px 24px",
          boxShadow: hovered
            ? `0 16px 40px ${color}33`
            : "0 4px 16px rgba(0,0,0,0.07)",
          transform: hovered ? "translateY(-8px)" : "translateY(0)",
          transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
          borderLeft: `5px solid ${color}`,
          cursor: "default",
        }}
      >
        <div style={{
          fontSize: "28px",
          marginBottom: "14px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "52px",
          height: "52px",
          borderRadius: "12px",
          background: `${color}18`,
          color: color,
          transition: "background 0.3s",
        }}>
          {icon}
        </div>
        <h4 style={{ fontWeight: "700", color: "#1f2937", marginBottom: "8px", fontSize: "15px" }}>{title}</h4>
        <p style={{ color: "#6b7280", fontSize: "13px", margin: 0, lineHeight: 1.6 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

/* ─── Contact Card ─── */
function ContactCard({ icon, label, value, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "white",
          borderRadius: "14px",
          padding: "24px 22px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          boxShadow: hovered
            ? "0 12px 32px rgba(16,185,129,0.18)"
            : "0 4px 14px rgba(0,0,0,0.07)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.3s ease",
          cursor: "default",
          border: hovered ? "1.5px solid #10b981" : "1.5px solid transparent",
        }}
      >
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: hovered
            ? "linear-gradient(135deg,#065f46,#10b981)"
            : "linear-gradient(135deg,#10b981,#34d399)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          color: "white",
          flexShrink: 0,
          transition: "background 0.3s",
          boxShadow: "0 4px 12px rgba(16,185,129,0.25)",
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: "11px", fontWeight: "700", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.8px" }}>{label}</div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#1f2937", marginTop: "2px" }}>{value}</div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Safety Tip ─── */
function TipCard({ emoji, text, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          alignItems: "flex-start",
          gap: "14px",
          boxShadow: hovered
            ? "0 8px 24px rgba(16,185,129,0.15)"
            : "0 2px 10px rgba(0,0,0,0.06)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.3s ease",
          borderLeft: "4px solid #10b981",
          cursor: "default",
        }}
      >
        <span style={{ fontSize: "22px", flexShrink: 0 }}>{emoji}</span>
        <p style={{ fontSize: "13px", color: "#374151", margin: 0, lineHeight: 1.6 }}>{text}</p>
      </div>
    </FadeIn>
  );
}

/* ════════════════════════════════
   MAIN COMPONENT
════════════════════════════════ */
function StudentAboutUs() {
  const navigate = useNavigate();
  const [btnHovered, setBtnHovered] = useState(false);
  const [heroIconPulse] = useState(true);

  return (
    <div style={S.page}>

      {/* ── HERO ── */}
      <div style={S.hero}>
        <div style={S.heroOverlay}>
          <FaShieldAlt style={{
            fontSize: "58px",
            color: "#6ee7b7",
            filter: "drop-shadow(0 0 14px rgba(110,231,183,0.7))",
            animation: heroIconPulse ? "pulse 2.5s ease-in-out infinite" : "none",
          }} />
          <h1 style={S.heroTitle}>About Campus Safety Connect</h1>
          <p style={S.heroSub}>
            A secure, student-first platform to report safety concerns and get timely
            resolutions from campus police — built for AITS by AITS.
          </p>
          {/* Badges */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center", marginTop: "8px" }}>
            {["🔒 Confidential", "⚡ Real-time Tracking", "🛡️ Campus Police Backed", "📱 Easy to Use"].map(b => (
              <span key={b} style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "white",
                padding: "5px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                backdropFilter: "blur(4px)",
              }}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={S.body}>

        {/* ── COLLEGE CARD ── */}
        <FadeIn delay={0.1}>
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "24px 32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            marginBottom: "44px",
            borderLeft: "6px solid #10b981",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "linear-gradient(135deg,#065f46,#10b981)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              color: "white",
              flexShrink: 0,
            }}>
              🎓
            </div>
            <div>
              <h3 style={{ fontWeight: "700", color: "#065f46", marginBottom: "4px", fontSize: "17px" }}>
                Annamacharya Institute of Technologies and Sciences
              </h3>
              <p style={{ color: "#6b7280", margin: "2px 0", fontSize: "13px" }}>
                Department of Computer Science & Engineering (AI)
              </p>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "13px" }}>
                Campus Safety Connect — Student Portal 2025-2026
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ── STATS ── */}
        <div style={S.sectionTitle}>📊 Platform at a Glance</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginBottom: "48px",
        }}>
          <StatCard icon={<FaClipboardList />} value="10+" label="Complaint Categories" gradient="linear-gradient(135deg,#065f46,#047857)" delay={0.1} />
          <StatCard icon={<FaUserGraduate />} value="24/7" label="Portal Access" gradient="linear-gradient(135deg,#0891b2,#0e7490)" delay={0.2} />
          <StatCard icon={<FaCheckCircle />} value="100%" label="Confidential" gradient="linear-gradient(135deg,#7c3aed,#6d28d9)" delay={0.3} />
          <StatCard icon={<FaRocket />} value="Fast" label="Response Time" gradient="linear-gradient(135deg,#b45309,#d97706)" delay={0.4} />
        </div>

        {/* ── WHAT IS THIS ── */}
        <div style={S.sectionTitle}>📌 What is Campus Safety Connect?</div>
        <FadeIn delay={0.1}>
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "48px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            lineHeight: "1.9",
            color: "#374151",
            fontSize: "14.5px",
            borderTop: "4px solid #10b981",
          }}>
            <p style={{ margin: "0 0 14px" }}>
              <strong style={{ color: "#065f46" }}>Campus Safety Connect</strong> is an official
              student-police complaint management system developed for AITS. It empowers students
              to securely report safety incidents directly to campus police — including ragging,
              theft, cyber crimes, physical assault, stalking, and more.
            </p>
            <p style={{ margin: 0 }}>
              All complaints are handled with <strong style={{ color: "#065f46" }}>full confidentiality</strong> and
              reviewed by trained campus police officers. Students can track complaint status
              in real time and update details whenever needed.
            </p>
          </div>
        </FadeIn>

        {/* ── HOW IT WORKS ── */}
        <div style={S.sectionTitle}>⚙️ How It Works</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "20px",
          marginBottom: "48px",
        }}>
          <StepCard step="1" icon={<FaSearch />}    title="Choose Category"  desc="Select the complaint type that best matches your situation."        delay={0.1} />
          <StepCard step="2" icon={<FaClipboardList />} title="Fill the Form"  desc="Provide accurate details for the fastest possible resolution." delay={0.2} />
          <StepCard step="3" icon={<FaRocket />}    title="Submit & Track"   desc="Submit your complaint and monitor its status in real time."         delay={0.3} />
          <StepCard step="4" icon={<FaCheckCircle />} title="Resolution"     desc="Campus police review and resolve your complaint promptly."          delay={0.4} />
        </div>

        {/* ── FEATURES ── */}
        <div style={S.sectionTitle}>✨ Key Features</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "20px",
          marginBottom: "48px",
        }}>
          <FeatureCard icon={<FaLock />}          color="#065f46" title="Fully Confidential"     desc="Your identity and complaint details are protected at all times."         delay={0.1} />
          <FeatureCard icon={<FaCheckCircle />}   color="#0891b2" title="Real-time Status"       desc="Track whether your complaint is Pending or Solved instantly."           delay={0.2} />
          <FeatureCard icon={<FaClipboardList />} color="#7c3aed" title="10 Crime Categories"    desc="Cover all types of campus incidents with detailed, specific forms."      delay={0.3} />
          <FeatureCard icon={<FaSearch />}        color="#d97706" title="Edit Your Complaints"   desc="Update description, location, or witness details before resolution."    delay={0.4} />
          <FeatureCard icon={<FaUserGraduate />}  color="#065f46" title="Student-Friendly UI"    desc="Simple, clean interface designed to be accessible to all students."     delay={0.5} />
          <FeatureCard icon={<FaHeart />}         color="#e11d48" title="Student Welfare Focus"  desc="Built with student safety and mental well-being as the top priority."   delay={0.6} />
        </div>

        {/* ── SAFETY TIPS ── */}
        <div style={S.sectionTitle}>🛡️ Campus Safety Tips</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "48px",
        }}>
          <TipCard emoji="🚨" text="Report suspicious activity immediately to campus police."            delay={0.1} />
          <TipCard emoji="🔒" text="Keep your belongings secure and never leave them unattended."        delay={0.2} />
          <TipCard emoji="📱" text="Save campus emergency numbers on your phone."                        delay={0.3} />
          <TipCard emoji="👥" text="Walk in groups during late hours on campus."                         delay={0.4} />
          <TipCard emoji="💻" text="Never share your account credentials or OTPs with anyone."          delay={0.5} />
          <TipCard emoji="📋" text="Document evidence before submitting a complaint for best results."  delay={0.6} />
        </div>

        {/* ── CONTACT ── */}
        <div style={S.sectionTitle}>📞 Contact & Support</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "48px",
        }}>
          <ContactCard icon={<FaPhoneAlt />}     label="Emergency"  value="Campus Police: 100"          delay={0.1} />
          <ContactCard icon={<FaEnvelope />}     label="Email"      value="safety@aits.edu.in"          delay={0.2} />
          <ContactCard icon={<FaMapMarkerAlt />} label="Location"   value="Admin Block, Ground Floor"   delay={0.3} />
          <ContactCard icon={<FaShieldAlt />}    label="Portal"     value="campussafety.aits.edu.in"    delay={0.4} />
        </div>

        {/* ── CTA ── */}
        <FadeIn delay={0.2}>
          <div style={{
            background: "linear-gradient(135deg, #065f46 0%, #047857 50%, #10b981 100%)",
            borderRadius: "20px",
            padding: "44px 32px",
            textAlign: "center",
            marginBottom: "32px",
            color: "white",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 16px 48px rgba(6,95,70,0.35)",
          }}>
            {/* Decorative circles */}
            <div style={{
              position: "absolute", top: "-40px", right: "-40px",
              width: "160px", height: "160px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: "-30px", left: "-30px",
              width: "120px", height: "120px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              pointerEvents: "none",
            }} />

            <FaStar style={{ fontSize: "40px", color: "#6ee7b7", marginBottom: "14px" }} />
            <h3 style={{ fontWeight: "800", marginBottom: "10px", fontSize: "22px" }}>
              Your Safety, Our Priority
            </h3>
            <p style={{ color: "rgba(255,255,255,0.88)", marginBottom: "24px", fontSize: "14px", maxWidth: "500px", margin: "0 auto 24px" }}>
              Don't stay silent. Every complaint matters. Submit yours now and our campus
              police will respond promptly.
            </p>
            <button
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              onClick={() => navigate("/submit")}
              style={{
                background: btnHovered ? "white" : "#6ee7b7",
                color: btnHovered ? "#065f46" : "#065f46",
                border: "none",
                borderRadius: "12px",
                padding: "14px 36px",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: btnHovered
                  ? "0 8px 28px rgba(0,0,0,0.2)"
                  : "0 4px 14px rgba(0,0,0,0.15)",
                transform: btnHovered ? "scale(1.05)" : "scale(1)",
                transition: "all 0.25s ease",
              }}
            >
              <FaClipboardList /> Submit a Complaint
            </button>
          </div>
        </FadeIn>

        {/* ── FOOTER ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          color: "#6b7280",
          fontSize: "13px",
          borderTop: "1px solid #d1fae5",
          marginTop: "10px",
          gap: "8px",
        }}>
          <FaShieldAlt style={{ color: "#10b981" }} />
          © 2026 Campus Safety Connect — AITS CSE AI Student Portal
        </div>

      </div>

      {/* Pulse animation keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.1); }
        }
      `}</style>

    </div>
  );
}

export default StudentAboutUs;
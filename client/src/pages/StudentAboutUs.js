import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShieldAlt, FaClipboardList, FaSearch, FaCheckCircle,
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserGraduate,
  FaLock, FaRocket, FaHeart, FaStar
} from "react-icons/fa";

/* ── Fade-in on scroll ── */
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

/* ── Stat card ── */
function StatCard({ icon, value, label, gradient, delay }) {
  const [h, setH] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: gradient, borderRadius: "14px",
          padding: "clamp(14px,3vw,22px) clamp(10px,2vw,16px)",
          color: "white", display: "flex", flexDirection: "column",
          alignItems: "center", gap: "6px", textAlign: "center",
          boxShadow: h ? "0 18px 44px rgba(6,95,70,0.3)" : "0 6px 18px rgba(0,0,0,0.12)",
          transform: h ? "translateY(-5px) scale(1.02)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ fontSize: "clamp(20px,4vw,28px)", opacity: 0.9 }}>{icon}</div>
        <div style={{ fontSize: "clamp(22px,5vw,32px)", fontWeight: "800", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: "clamp(10px,2vw,12px)", fontWeight: "600", opacity: 0.9 }}>{label}</div>
      </div>
    </FadeIn>
  );
}

/* ── Step card ── */
function StepCard({ step, icon, title, desc, delay }) {
  const [h, setH] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: "white", borderRadius: "14px",
          padding: "clamp(16px,3vw,24px) clamp(14px,3vw,18px)",
          textAlign: "center",
          boxShadow: h ? "0 14px 36px rgba(16,185,129,0.2)" : "0 4px 14px rgba(0,0,0,0.07)",
          transform: h ? "translateY(-5px)" : "none",
          transition: "all 0.3s ease",
          borderTop: `4px solid ${h ? "#065f46" : "#10b981"}`,
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "6px", right: "10px", fontSize: "clamp(28px,6vw,44px)", fontWeight: "800", color: "#f0fdf4", lineHeight: 1, userSelect: "none" }}>{step}</div>
        <div style={{ width: "clamp(40px,8vw,52px)", height: "clamp(40px,8vw,52px)", borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: "clamp(16px,3.5vw,22px)", color: "white", boxShadow: "0 4px 12px rgba(16,185,129,0.3)" }}>{icon}</div>
        <h4 style={{ fontWeight: "700", color: "#1f2937", marginBottom: "5px", fontSize: "clamp(12px,2.5vw,14px)" }}>{title}</h4>
        <p style={{ color: "#6b7280", fontSize: "clamp(11px,2vw,12px)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

/* ── Feature card ── */
function FeatureCard({ icon, title, desc, color, delay }) {
  const [h, setH] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: "white", borderRadius: "14px",
          padding: "clamp(14px,3vw,22px) clamp(14px,3vw,20px)",
          boxShadow: h ? `0 14px 36px ${color}33` : "0 4px 14px rgba(0,0,0,0.07)",
          transform: h ? "translateY(-5px)" : "none",
          transition: "all 0.3s ease",
          borderLeft: `5px solid ${color}`,
        }}
      >
        <div style={{ fontSize: "clamp(18px,3.5vw,24px)", marginBottom: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "clamp(38px,7vw,48px)", height: "clamp(38px,7vw,48px)", borderRadius: "12px", background: `${color}18`, color }}>{icon}</div>
        <h4 style={{ fontWeight: "700", color: "#1f2937", marginBottom: "5px", fontSize: "clamp(12px,2.5vw,14px)" }}>{title}</h4>
        <p style={{ color: "#6b7280", fontSize: "clamp(11px,2vw,12px)", margin: 0, lineHeight: 1.6 }}>{desc}</p>
      </div>
    </FadeIn>
  );
}

/* ── Contact card ── */
function ContactCard({ icon, label, value, delay }) {
  const [h, setH] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: "white", borderRadius: "14px",
          padding: "clamp(12px,2.5vw,18px)",
          display: "flex", alignItems: "center", gap: "12px",
          boxShadow: h ? "0 10px 28px rgba(16,185,129,0.18)" : "0 4px 12px rgba(0,0,0,0.07)",
          transform: h ? "translateY(-3px)" : "none",
          transition: "all 0.3s ease",
          border: h ? "1.5px solid #10b981" : "1.5px solid transparent",
        }}
      >
        <div style={{ width: "clamp(36px,7vw,44px)", height: "clamp(36px,7vw,44px)", borderRadius: "12px", background: "linear-gradient(135deg,#10b981,#34d399)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(13px,2.5vw,16px)", color: "white", flexShrink: 0, boxShadow: "0 4px 10px rgba(16,185,129,0.25)" }}>{icon}</div>
        <div>
          <div style={{ fontSize: "10px", fontWeight: "700", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.8px" }}>{label}</div>
          <div style={{ fontSize: "clamp(11px,2.5vw,13px)", fontWeight: "600", color: "#1f2937", marginTop: "2px" }}>{value}</div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Safety tip card ── */
function TipCard({ emoji, text, delay }) {
  const [h, setH] = useState(false);
  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: "white", borderRadius: "12px",
          padding: "clamp(12px,2.5vw,16px) clamp(14px,3vw,18px)",
          display: "flex", alignItems: "flex-start", gap: "10px",
          boxShadow: h ? "0 8px 22px rgba(16,185,129,0.15)" : "0 2px 10px rgba(0,0,0,0.06)",
          transform: h ? "translateY(-3px)" : "none",
          transition: "all 0.3s ease",
          borderLeft: "4px solid #10b981",
        }}
      >
        <span style={{ fontSize: "clamp(16px,3vw,20px)", flexShrink: 0 }}>{emoji}</span>
        <p style={{ fontSize: "clamp(11px,2.5vw,13px)", color: "#374151", margin: 0, lineHeight: 1.6 }}>{text}</p>
      </div>
    </FadeIn>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
function StudentAboutUs() {
  const navigate = useNavigate();
  const [btnH, setBtnH] = useState(false);

  /* Shared section-header style */
  const sectionTitle = {
    fontSize: "clamp(15px,3.5vw,18px)",
    fontWeight: "700",
    color: "#065f46",
    marginBottom: "16px",
    borderLeft: "4px solid #10b981",
    paddingLeft: "12px",
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif", background: "#f0fdf4", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <div style={{ width: "100%", background: "linear-gradient(135deg, rgba(6,95,70,0.95), rgba(4,120,87,0.9))" }}>
        <div style={{ padding: "clamp(32px,7vw,64px) clamp(16px,5vw,40px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "12px" }}>
          <FaShieldAlt style={{ fontSize: "clamp(36px,7vw,54px)", color: "#6ee7b7", filter: "drop-shadow(0 0 14px rgba(110,231,183,0.7))" }} />
          <h1 style={{ fontSize: "clamp(18px,5vw,34px)", fontWeight: "800", color: "white", margin: 0, letterSpacing: "0.3px", lineHeight: 1.3 }}>About Campus Safety Connect</h1>
          <p style={{ fontSize: "clamp(11px,2.8vw,15px)", color: "rgba(255,255,255,0.88)", maxWidth: "600px", lineHeight: "1.8", margin: 0 }}>
            A secure, student-first platform to report safety concerns and get timely resolutions from campus police — built for AITS by AITS.
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
            {["🔒 Confidential", "⚡ Real-time", "🛡️ Police Backed", "📱 Mobile Friendly"].map(b => (
              <span key={b} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", color: "white", padding: "3px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: "600" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "clamp(18px,4vw,48px) clamp(12px,4vw,40px)", maxWidth: "1100px", margin: "0 auto" }}>

        {/* College card */}
        <FadeIn delay={0.1}>
          <div style={{ background: "white", borderRadius: "14px", padding: "clamp(14px,3vw,22px) clamp(14px,3vw,24px)", boxShadow: "0 4px 18px rgba(0,0,0,0.07)", marginBottom: "28px", borderLeft: "6px solid #10b981", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <div style={{ width: "clamp(40px,7vw,48px)", height: "clamp(40px,7vw,48px)", borderRadius: "12px", background: "linear-gradient(135deg,#065f46,#10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(18px,3.5vw,22px)", color: "white", flexShrink: 0 }}>🎓</div>
            <div>
              <h3 style={{ fontWeight: "700", color: "#065f46", marginBottom: "4px", fontSize: "clamp(13px,3vw,17px)", lineHeight: 1.3 }}>Annamacharya Institute of Technologies and Sciences</h3>
              <p style={{ color: "#6b7280", margin: "2px 0 0", fontSize: "12px" }}>Department of Computer Science & Engineering (AI)</p>
            </div>
          </div>
        </FadeIn>

        {/* Stats */}
        <div style={sectionTitle}>📊 Platform at a Glance</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,120px), 1fr))", gap: "clamp(8px,2vw,14px)", marginBottom: "32px" }}>
          <StatCard icon={<FaClipboardList />} value="10+"  label="Categories"  gradient="linear-gradient(135deg,#065f46,#047857)" delay={0.1} />
          <StatCard icon={<FaUserGraduate />}  value="24/7" label="Access"       gradient="linear-gradient(135deg,#0891b2,#0e7490)" delay={0.2} />
          <StatCard icon={<FaCheckCircle />}   value="100%" label="Confidential" gradient="linear-gradient(135deg,#7c3aed,#6d28d9)" delay={0.3} />
          <StatCard icon={<FaRocket />}        value="Fast" label="Response"     gradient="linear-gradient(135deg,#b45309,#d97706)" delay={0.4} />
        </div>

        {/* What is this */}
        <div style={sectionTitle}>📌 What is Campus Safety Connect?</div>
        <FadeIn delay={0.1}>
          <div style={{ background: "white", borderRadius: "14px", padding: "clamp(16px,3vw,24px)", marginBottom: "32px", boxShadow: "0 4px 18px rgba(0,0,0,0.06)", lineHeight: "1.9", color: "#374151", fontSize: "clamp(12px,2.5vw,14px)", borderTop: "4px solid #10b981" }}>
            <p style={{ margin: "0 0 10px" }}><strong style={{ color: "#065f46" }}>Campus Safety Connect</strong> is an official student-police complaint management system for AITS. It empowers students to securely report safety incidents — including ragging, theft, cyber crimes, physical assault, stalking, and more.</p>
            <p style={{ margin: 0 }}>All complaints are handled with <strong style={{ color: "#065f46" }}>full confidentiality</strong> and reviewed by trained campus police officers. Track complaint status in real time and update details whenever needed.</p>
          </div>
        </FadeIn>

        {/* How it works */}
        <div style={sectionTitle}>⚙️ How It Works</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,140px), 1fr))", gap: "clamp(10px,2vw,16px)", marginBottom: "32px" }}>
          <StepCard step="1" icon={<FaSearch />}        title="Choose Category" desc="Select the type that matches your situation."    delay={0.1} />
          <StepCard step="2" icon={<FaClipboardList />} title="Fill the Form"   desc="Provide accurate details for fastest resolution." delay={0.2} />
          <StepCard step="3" icon={<FaRocket />}        title="Submit & Track"  desc="Submit and monitor your complaint in real time."  delay={0.3} />
          <StepCard step="4" icon={<FaCheckCircle />}   title="Resolution"      desc="Campus police review and resolve it promptly."    delay={0.4} />
        </div>

        {/* Features */}
        <div style={sectionTitle}>✨ Key Features</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,160px), 1fr))", gap: "clamp(10px,2vw,16px)", marginBottom: "32px" }}>
          <FeatureCard icon={<FaLock />}          color="#065f46" title="Fully Confidential"  desc="Your identity and details are protected at all times."       delay={0.1} />
          <FeatureCard icon={<FaCheckCircle />}   color="#0891b2" title="Real-time Status"    desc="Track whether your complaint is Pending or Solved."          delay={0.2} />
          <FeatureCard icon={<FaClipboardList />} color="#7c3aed" title="10 Crime Categories" desc="Cover all types of campus incidents with specific forms."    delay={0.3} />
          <FeatureCard icon={<FaSearch />}        color="#d97706" title="Edit Complaints"     desc="Update description or witness details before resolution."    delay={0.4} />
          <FeatureCard icon={<FaUserGraduate />}  color="#065f46" title="Student-Friendly"   desc="Simple interface designed to be accessible to all students." delay={0.5} />
          <FeatureCard icon={<FaHeart />}         color="#e11d48" title="Student Welfare"     desc="Built with student safety and well-being as top priority."   delay={0.6} />
        </div>

        {/* Safety Tips */}
        <div style={sectionTitle}>🛡️ Campus Safety Tips</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,180px), 1fr))", gap: "10px", marginBottom: "32px" }}>
          <TipCard emoji="🚨" text="Report suspicious activity immediately to campus police."           delay={0.1} />
          <TipCard emoji="🔒" text="Keep your belongings secure and never leave them unattended."      delay={0.2} />
          <TipCard emoji="📱" text="Save campus emergency numbers on your phone."                      delay={0.3} />
          <TipCard emoji="👥" text="Walk in groups during late hours on campus."                       delay={0.4} />
          <TipCard emoji="💻" text="Never share your account credentials or OTPs with anyone."        delay={0.5} />
          <TipCard emoji="📋" text="Document evidence before submitting a complaint for best results." delay={0.6} />
        </div>

        {/* Contact */}
        <div style={sectionTitle}>📞 Contact & Support</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,180px), 1fr))", gap: "10px", marginBottom: "32px" }}>
          <ContactCard icon={<FaPhoneAlt />}     label="Emergency" value="Campus Police: 100"        delay={0.1} />
          <ContactCard icon={<FaEnvelope />}     label="Email"     value="safety@aits.edu.in"        delay={0.2} />
          <ContactCard icon={<FaMapMarkerAlt />} label="Location"  value="Admin Block, Ground Floor" delay={0.3} />
          <ContactCard icon={<FaShieldAlt />}    label="Portal"    value="campussafety.aits.edu.in"  delay={0.4} />
        </div>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div style={{ background: "linear-gradient(135deg,#065f46,#047857,#10b981)", borderRadius: "18px", padding: "clamp(24px,5vw,44px) clamp(16px,5vw,32px)", textAlign: "center", marginBottom: "24px", color: "white", position: "relative", overflow: "hidden", boxShadow: "0 16px 44px rgba(6,95,70,0.32)" }}>
            <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
            <FaStar style={{ fontSize: "clamp(28px,5vw,36px)", color: "#6ee7b7", marginBottom: "10px" }} />
            <h3 style={{ fontWeight: "800", marginBottom: "8px", fontSize: "clamp(16px,4vw,22px)" }}>Your Safety, Our Priority</h3>
            <p style={{ color: "rgba(255,255,255,0.88)", marginBottom: "20px", fontSize: "clamp(11px,2.5vw,13px)", maxWidth: "460px", margin: "0 auto 20px" }}>
              Don't stay silent. Every complaint matters. Submit yours now and our campus police will respond promptly.
            </p>
            <button
              onMouseEnter={() => setBtnH(true)}
              onMouseLeave={() => setBtnH(false)}
              onClick={() => navigate("/submit")}
              style={{ background: btnH ? "white" : "#6ee7b7", color: "#065f46", border: "none", borderRadius: "12px", padding: "clamp(10px,2vw,12px) clamp(20px,4vw,28px)", fontWeight: "700", fontSize: "clamp(12px,2.5vw,14px)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", transform: btnH ? "scale(1.04)" : "scale(1)", transition: "all 0.25s ease", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", fontFamily: "'Poppins', sans-serif" }}
            >
              <FaClipboardList /> Submit a Complaint
            </button>
          </div>
        </FadeIn>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "18px", color: "#6b7280", fontSize: "12px", borderTop: "1px solid #d1fae5", gap: "8px", textAlign: "center", flexWrap: "wrap" }}>
          <FaShieldAlt style={{ color: "#10b981" }} />
          © 2026 Campus Safety Connect — AITS CSE AI Student Portal
        </div>

      </div>

      <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }`}</style>
    </div>
  );
}

export default StudentAboutUs;
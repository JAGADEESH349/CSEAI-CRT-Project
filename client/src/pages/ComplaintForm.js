import API_URL from "../config";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const categoryMeta = {
  "Ragging/Bullying":  { icon: "😤", color: "#f59e0b", desc: "Report incidents of ragging, bullying or mental harassment." },
  "Theft":             { icon: "🔒", color: "#6366f1", desc: "Report theft or loss of personal property on campus." },
  "Cyber Crime":       { icon: "💻", color: "#0ea5e9", desc: "Report online fraud, hacking, cyberbullying or identity theft." },
  "Physical Assault":  { icon: "🚨", color: "#ef4444", desc: "Report physical violence, attack or bodily harm." },
  "Stalking":          { icon: "👁️", color: "#8b5cf6", desc: "Report unwanted following, surveillance or harassment." },
  "Sexual Harassment": { icon: "⚠️", color: "#ec4899", desc: "Report any form of sexual harassment or misconduct." },
  "Drug Activities":   { icon: "🚫", color: "#dc2626", desc: "Report drug possession, selling or consumption on campus." },
  "Missing Person":    { icon: "🔍", color: "#64748b", desc: "Report a missing student or person last seen on campus." },
  "Fraud/Cheating":    { icon: "💳", color: "#d97706", desc: "Report financial fraud, exam cheating or impersonation." },
  "Road Accident":     { icon: "🚗", color: "#0891b2", desc: "Report a road accident or vehicle-related incident on campus." },
  "Other":             { icon: "📝", color: "#10b981", desc: "Report any incident that doesn't fit the above categories." },
};

/* ─── Reusable field components ─── */
const Input = ({ label, placeholder, type = "text", required = false, value, onChange, span = 1, isMobile }) => (
  <div style={{ gridColumn: isMobile ? "span 1" : `span ${span}`, display: "flex", flexDirection: "column", gap: "7px" }}>
    <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", letterSpacing: "0.8px", textTransform: "uppercase" }}>
      {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
    </label>
    <input
      type={type}
      placeholder={placeholder || label}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1.5px solid #e5e7eb",
        fontSize: "14px",
        fontFamily: "'Poppins', sans-serif",
        color: "#1f2937",
        background: "#f9fafb",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
      }}
      onFocus={e => { e.target.style.borderColor = "#10b981"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.1)"; }}
      onBlur={e =>  { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const Textarea = ({ label, placeholder, required = false, value, onChange, rows = 4 }) => (
  <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "7px" }}>
    <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", letterSpacing: "0.8px", textTransform: "uppercase" }}>
      {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
    </label>
    <textarea
      placeholder={placeholder || label}
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1.5px solid #e5e7eb",
        fontSize: "14px",
        fontFamily: "'Poppins', sans-serif",
        color: "#1f2937",
        background: "#f9fafb",
        outline: "none",
        resize: "vertical",
        minHeight: "110px",
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.2s ease",
      }}
      onFocus={e => { e.target.style.borderColor = "#10b981"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.1)"; }}
      onBlur={e =>  { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }}
    />
  </div>
);

const Select = ({ label, options, required = false, value, onChange }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
    <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", letterSpacing: "0.8px", textTransform: "uppercase" }}>
      {label}{required && <span style={{ color: "#ef4444" }}> *</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1.5px solid #e5e7eb",
        fontSize: "14px",
        fontFamily: "'Poppins', sans-serif",
        color: value ? "#1f2937" : "#9ca3af",
        background: "#f9fafb",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        appearance: "none",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onFocus={e => { e.target.style.borderColor = "#10b981"; e.target.style.background = "white"; e.target.style.boxShadow = "0 0 0 4px rgba(16,185,129,0.1)"; }}
      onBlur={e =>  { e.target.style.borderColor = "#e5e7eb"; e.target.style.background = "#f9fafb"; e.target.style.boxShadow = "none"; }}
    >
      <option value="">Select {label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const SectionHead = ({ icon, title }) => (
  <div style={{
    gridColumn: "1 / -1",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "8px 0 4px",
    paddingBottom: "10px",
    borderBottom: "2px solid #f0fdf4",
  }}>
    <span style={{ fontSize: "16px" }}>{icon}</span>
    <span style={{ fontSize: "13px", fontWeight: "700", color: "#065f46", letterSpacing: "0.5px", textTransform: "uppercase" }}>{title}</span>
    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #a7f3d0, transparent)" }} />
  </div>
);

function ComplaintForm() {
  const { category } = useParams();
  const navigate = useNavigate();
  const cat = decodeURIComponent(category || "");
  const meta = categoryMeta[cat] || { icon: "📋", color: "#10b981", desc: "Report any campus safety concern." };

  const [form, setForm] = useState({});
  const [evidence, setEvidence] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // ✅ FIX: Track screen size to change layout
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("category", cat);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (evidence) fd.append("evidence", evidence);
      await axios.post(`${API_URL}/complaints`, fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      setSuccess("Complaint submitted successfully!");
      setTimeout(() => navigate("/my-complaints"), 1600);
    } catch(err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.clear(); window.location.href = "/"; return;
      }
      setError(err.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const studentBlock = (
    <>
      <SectionHead icon="👤" title="Student Information" />
      <Input isMobile={isMobile} label="Student Name"  placeholder="Your full name"         required value={form.studentName  || ""} onChange={set("studentName")}  />
      <Input isMobile={isMobile} label="Roll Number"   placeholder="e.g. 22B91A6601"        required value={form.rollNumber   || ""} onChange={set("rollNumber")}   />
      <Input isMobile={isMobile} label="Phone Number"  placeholder="10-digit mobile number" required type="tel" value={form.phoneNumber || ""} onChange={set("phoneNumber")} />
    </>
  );

  const evidenceBlock = (
    <>
      <SectionHead icon="📎" title="Evidence & Supporting Documents" />
      <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{ fontSize: "11px", fontWeight: "700", color: "#6b7280", letterSpacing: "0.8px", textTransform: "uppercase" }}>
          Upload Evidence <span style={{ color: "#9ca3af", fontWeight: "400", fontSize: "10px", textTransform: "lowercase" }}>(optional)</span>
        </label>
        <label style={{
          display: "flex", alignItems: "center", gap: "12px",
          padding: "16px 20px",
          borderRadius: "10px",
          border: "2px dashed #a7f3d0",
          background: "#f0fdf4",
          cursor: "pointer",
          color: "#065f46",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13px",
          fontWeight: "500",
        }}>
          <span style={{ fontSize: "22px" }}>📁</span>
          <span>{evidence ? `✅ ${evidence.name}` : "Click to choose file"}</span>
          <input type="file" style={{ display: "none" }} onChange={e => setEvidence(e.target.files[0])} />
        </label>
      </div>
    </>
  );

  const witnessBlock = (
    <Textarea label="Witness Details" placeholder="Witness name, contact number, relationship to incident..."
      value={form.witnessDetails || ""} onChange={set("witnessDetails")} rows={3} />
  );

  const renderFields = () => {
    switch(cat) {
      case "Ragging/Bullying": return <>
        {studentBlock}
        <SectionHead icon="📋" title="Incident Details" />
        <Input isMobile={isMobile} label="Department"        placeholder="Your department"      required value={form.department       || ""} onChange={set("department")} />
        <Input isMobile={isMobile} label="Incident Date"     type="date" required                        value={form.incidentDate     || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Incident Location" placeholder="Where it happened"   required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
        <Select label="Complaint Type" required value={form.title || ""} onChange={set("title")}
          options={["Physical Ragging","Verbal Ragging","Online Bullying","Mental Harassment","Other"]} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Describe the Incident" required placeholder="Describe in detail — who, what, when, where and how it happened..."
          value={form.description || ""} onChange={set("description")} />
        {evidenceBlock}
        {witnessBlock}
      </>;

      case "Theft": return <>
        {studentBlock}
        <SectionHead icon="🔍" title="Theft Details" />
        <Input isMobile={isMobile} label="Item Stolen"          placeholder="What was stolen?"        required value={form.itemStolen      || ""} onChange={set("itemStolen")} />
        <Input isMobile={isMobile} label="Date of Theft"        type="date" required                           value={form.incidentDate    || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Location of Theft"    placeholder="Where was it stolen?"    required value={form.incidentLocation|| ""} onChange={set("incidentLocation")} />
        <Input isMobile={isMobile} label="Estimated Value (₹)"  placeholder="Approx. value" type="number"     value={form.estimatedValue  || ""} onChange={set("estimatedValue")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Item Description"     placeholder="Describe the stolen item in detail..."  value={form.itemDescription || ""} onChange={set("itemDescription")} rows={3} />
        <Textarea label="Incident Description" required placeholder="Describe what happened..."    value={form.description     || ""} onChange={set("description")} />
        {evidenceBlock}
      </>;

      case "Cyber Crime": return <>
        {studentBlock}
        <SectionHead icon="💻" title="Cyber Crime Details" />
        <Select label="Cyber Crime Type" required value={form.cyberCrimeType || ""} onChange={set("cyberCrimeType")}
          options={["Hacking","Online Fraud","Cyberbullying","Identity Theft","Phishing","Morphing","Other"]} />
        <Input isMobile={isMobile} label="Platform"                placeholder="Instagram / WhatsApp / Email etc." value={form.platform        || ""} onChange={set("platform")} />
        <Input isMobile={isMobile} label="Date of Incident"        type="date" required                             value={form.incidentDate    || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Suspect Username / Link" placeholder="Profile URL or username"           value={form.suspectUsername || ""} onChange={set("suspectUsername")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Describe the Incident" required placeholder="Describe the cyber incident in detail..."
          value={form.description || ""} onChange={set("description")} />
        {evidenceBlock}
      </>;

      case "Physical Assault": return <>
        {studentBlock}
        <SectionHead icon="⚠️" title="Assault Details" />
        <Input isMobile={isMobile} label="Date of Incident" type="date" required                        value={form.incidentDate     || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Location"         placeholder="Where did it happen?" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
        <Input isMobile={isMobile} label="Accused Name"     placeholder="Name (if known)"               value={form.accusedName      || ""} onChange={set("accusedName")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Describe the Incident" required placeholder="Describe the assault in detail..." value={form.description  || ""} onChange={set("description")} />
        <Textarea label="Injury Details" placeholder="Describe any injuries sustained..."                value={form.injuryDetails|| ""} onChange={set("injuryDetails")} rows={3} />
        {evidenceBlock}
        {witnessBlock}
      </>;

      case "Stalking": return <>
        {studentBlock}
        <SectionHead icon="🚨" title="Stalking Details" />
        <Select label="Stalking Type" required value={form.stalkingType || ""} onChange={set("stalkingType")}
          options={["Physical Stalking","Online Stalking","Phone Harassment","Other"]} />
        <Input isMobile={isMobile} label="Platform / Location"      placeholder="App name or physical location" value={form.stalkingPlatform|| ""} onChange={set("stalkingPlatform")} />
        <Input isMobile={isMobile} label="Date of Incident"         type="date" required                        value={form.incidentDate    || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Suspect Name / Description" placeholder="Who is stalking you?"       value={form.stalkingSuspect || ""} onChange={set("stalkingSuspect")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Describe the Incidents" required placeholder="Describe the stalking incidents in detail..."
          value={form.description || ""} onChange={set("description")} />
        {evidenceBlock}
        {witnessBlock}
      </>;

      case "Sexual Harassment": return <>
        {studentBlock}
        <SectionHead icon="⚠️" title="Harassment Details" />
        <Select label="Type of Harassment" required value={form.harassmentType || ""} onChange={set("harassmentType")}
          options={["Verbal","Physical","Online","Gestural","Other"]} />
        <Input isMobile={isMobile} label="Incident Date" type="date" required                        value={form.incidentDate     || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Location"      placeholder="Where did it happen?" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
        <Input isMobile={isMobile} label="Accused Person Name / Description" placeholder="Name or description of accused" value={form.accusedName || ""} onChange={set("accusedName")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Describe the Incident" required placeholder="Describe what happened..."
          value={form.description || ""} onChange={set("description")} />
        {evidenceBlock}
        {witnessBlock}
      </>;

      case "Fraud/Cheating": return <>
        {studentBlock}
        <SectionHead icon="💰" title="Fraud Details" />
        <Select label="Fraud Type" required value={form.fraudType || ""} onChange={set("fraudType")}
          options={["Online Fraud","UPI Fraud","Fake Job Offer","Exam Cheating","Impersonation","Other"]} />
        <Input isMobile={isMobile} label="Date of Incident"    type="date" required                    value={form.incidentDate   || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Platform / Location" placeholder="Where did fraud occur?"    value={form.platform       || ""} onChange={set("platform")} />
        <Input isMobile={isMobile} label="Amount Lost (₹)"     placeholder="Total amount" type="number" value={form.amountLost    || ""} onChange={set("amountLost")} />
        <Input isMobile={isMobile} label="Transaction ID"      placeholder="UPI/bank transaction ID"  value={form.transactionId  || ""} onChange={set("transactionId")} />
        <Input isMobile={isMobile} label="Suspect Contact"     placeholder="Phone / Email / UPI ID"   value={form.suspectContact || ""} onChange={set("suspectContact")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Describe the Incident" required placeholder="Describe the fraud in detail..."
          value={form.description || ""} onChange={set("description")} />
        {evidenceBlock}
      </>;

      case "Drug Activities": return <>
        {studentBlock}
        <SectionHead icon="🚫" title="Drug Activity Details" />
        <Select label="Type of Drug Activity" required value={form.drugActivityType || ""} onChange={set("drugActivityType")}
          options={["Possession","Selling","Consumption","Distribution","Other"]} />
        <Input isMobile={isMobile} label="Date of Incident"          type="date" required                        value={form.incidentDate       || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Location"                  placeholder="Where did it happen?" required value={form.incidentLocation   || ""} onChange={set("incidentLocation")} />
        <Input isMobile={isMobile} label="Suspect Name / Description" placeholder="Who was involved?"           value={form.suspectDescription || ""} onChange={set("suspectDescription")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Describe What You Witnessed" required placeholder="Describe what you saw in detail..."
          value={form.description || ""} onChange={set("description")} />
        {evidenceBlock}
        {witnessBlock}
      </>;

      case "Missing Person": return <>
        {studentBlock}
        <SectionHead icon="🔍" title="Missing Person Details" />
        <Input isMobile={isMobile} label="Missing Person Name" placeholder="Full name"         required value={form.missingPersonName   || ""} onChange={set("missingPersonName")} />
        <Input isMobile={isMobile} label="Age"                 type="number" placeholder="Age" required value={form.missingPersonAge    || ""} onChange={set("missingPersonAge")} />
        <Select label="Gender" required value={form.missingPersonGender || ""} onChange={set("missingPersonGender")}
          options={["Male","Female","Other"]} />
        <Input isMobile={isMobile} label="Last Seen Date"     type="date" required                                   value={form.lastSeenDate     || ""} onChange={set("lastSeenDate")} />
        <Input isMobile={isMobile} label="Last Seen Location" placeholder="Where were they last seen?" required     value={form.lastSeenLocation || ""} onChange={set("lastSeenLocation")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Clothing / Physical Description" placeholder="What were they wearing? Any identifying features..." value={form.clothingDescription || ""} onChange={set("clothingDescription")} rows={3} />
        <Textarea label="Other Relevant Details"          placeholder="Any other useful information..."               value={form.description         || ""} onChange={set("description")} rows={3} />
        {evidenceBlock}
        {witnessBlock}
      </>;

      case "Road Accident": return <>
        {studentBlock}
        <SectionHead icon="🚗" title="Accident Details" />
        <Input isMobile={isMobile} label="Date of Accident" type="date" required                       value={form.accidentDate     || ""} onChange={set("accidentDate")} />
        <Input isMobile={isMobile} label="Time of Accident" type="time" required                       value={form.accidentTime     || ""} onChange={set("accidentTime")} />
        <Input isMobile={isMobile} label="Location"         placeholder="Exact location" required      value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
        <Input isMobile={isMobile} label="Vehicle Number"   placeholder="e.g. AP39AB1234"             value={form.vehicleNumber    || ""} onChange={set("vehicleNumber")} />
        <Input isMobile={isMobile} label="Driver Name"      placeholder="Name of driver (if known)"   value={form.driverName       || ""} onChange={set("driverName")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Injury Details"       placeholder="Describe any injuries..."              value={form.injuryDetails || ""} onChange={set("injuryDetails")} rows={3} />
        <Textarea label="Accident Description" required placeholder="Describe how the accident occurred..." value={form.description || ""} onChange={set("description")} />
        {evidenceBlock}
        {witnessBlock}
      </>;

      case "Other": return <>
        {studentBlock}
        <SectionHead icon="📋" title="Complaint Details" />
        <Input isMobile={isMobile} label="Complaint Title"   placeholder="Brief title of your complaint" required value={form.title           || ""} onChange={set("title")} />
        <Input isMobile={isMobile} label="Incident Date"     type="date" required                                  value={form.incidentDate     || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Incident Location" placeholder="Where did it happen?" required           value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
        <Input isMobile={isMobile} label="Department"        placeholder="Your department (if relevant)"           value={form.department       || ""} onChange={set("department")} />
        <Input isMobile={isMobile} label="Persons Involved"  placeholder="Names or description"                    value={form.accusedName      || ""} onChange={set("accusedName")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Full Description" required placeholder="Describe your complaint in full detail..." value={form.description || ""} onChange={set("description")} rows={5} />
        {evidenceBlock}
        {witnessBlock}
      </>;

      default: return <>
        {studentBlock}
        <SectionHead icon="📋" title="Incident Details" />
        <Input isMobile={isMobile} label="Incident Date" type="date" required                        value={form.incidentDate     || ""} onChange={set("incidentDate")} />
        <Input isMobile={isMobile} label="Location"      placeholder="Where did it happen?" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
        <SectionHead icon="📝" title="Description" />
        <Textarea label="Description" required placeholder="Describe the incident..." value={form.description || ""} onChange={set("description")} />
        {evidenceBlock}
      </>;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0fdf4",
      fontFamily: "'Poppins', sans-serif",
      padding: isMobile ? "16px 12px 40px" : "40px 24px 64px",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>

      <div style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "0 auto",
        // ✅ FIX: On mobile stack vertically, on desktop side by side
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
        borderRadius: isMobile ? "16px" : "24px",
        overflow: "hidden",
        boxShadow: "0 8px 48px rgba(0,0,0,0.14)",
      }}>

        {/* ═══════════════════════════
            LEFT PANEL — Category Info
        ═══════════════════════════ */}
        <div style={{
          background: "linear-gradient(160deg, #064e3b 0%, #065f46 40%, #047857 100%)",
          padding: isMobile ? "20px 20px" : "48px 32px",
          display: "flex",
          flexDirection: isMobile ? "row" : "column",
          alignItems: isMobile ? "center" : "stretch",
          gap: isMobile ? "14px" : "32px",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Back button — always visible */}
          <button onClick={() => navigate("/submit")} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white", borderRadius: "8px",
            padding: "8px 14px", cursor: "pointer",
            fontSize: "13px", fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
            transition: "all 0.2s",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}>
            ← Back
          </button>

          {/* Category icon */}
          <div style={{
            width: isMobile ? "44px" : "72px",
            height: isMobile ? "44px" : "72px",
            borderRadius: isMobile ? "12px" : "20px",
            background: "rgba(255,255,255,0.12)",
            border: "2px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: isMobile ? "22px" : "34px",
            flexShrink: 0,
          }}>
            {meta.icon}
          </div>

          {/* Category name + desc */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#6ee7b7", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "3px" }}>
              {cat}
            </div>
            {!isMobile && (
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", lineHeight: 1.7, margin: 0 }}>
                {meta.desc}
              </p>
            )}
          </div>

          {/* Tips & confidential badge — desktop only */}
          {!isMobile && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "700", color: "#6ee7b7", letterSpacing: "1px", textTransform: "uppercase" }}>
                  Tips for Faster Resolution
                </div>
                {["Fill all required fields marked *","Be specific with dates & locations","Upload evidence if available","Provide witness details if any"].map((tip, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(110,231,183,0.2)", border: "1px solid #6ee7b7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#6ee7b7", flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{tip}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "auto", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "20px" }}>🔒</span>
                <div>
                  <div style={{ color: "white", fontWeight: "700", fontSize: "12px" }}>100% Confidential</div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px", marginTop: "2px" }}>Your identity is protected</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ═══════════════════════════
            RIGHT PANEL — The Form
        ═══════════════════════════ */}
        <div style={{ background: "white", padding: isMobile ? "24px 16px" : "48px 44px" }}>

          {/* Header */}
          <div style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "2px solid #f0fdf4" }}>
            <h2 style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "800", color: "#065f46", margin: "0 0 6px" }}>
              Submit Complaint
            </h2>
            <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
              Fields marked <span style={{ color: "#ef4444" }}>*</span> are required.
            </p>
          </div>

          {success && (
            <div style={{ background: "linear-gradient(135deg,#d1fae5,#a7f3d0)", color: "#065f46", padding: "14px 18px", borderRadius: "12px", marginBottom: "20px", fontWeight: "600", fontSize: "14px", border: "1px solid #6ee7b7" }}>
              ✅ {success}
            </div>
          )}
          {error && (
            <div style={{ background: "linear-gradient(135deg,#fee2e2,#fecaca)", color: "#b91c1c", padding: "14px 18px", borderRadius: "12px", marginBottom: "20px", fontWeight: "500", fontSize: "14px", border: "1px solid #fca5a5" }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{
              display: "grid",
              // ✅ FIX: 1 column on mobile, 3 on desktop
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: isMobile ? "14px" : "20px",
              marginBottom: "28px",
            }}>
              {renderFields()}
            </div>

            <div style={{ display: "flex", gap: "12px", paddingTop: "8px", borderTop: "2px solid #f0fdf4", flexDirection: isMobile ? "column" : "row" }}>
              <button type="button" onClick={() => navigate("/submit")} style={{
                flex: 1, padding: "14px",
                background: "white", color: "#374151",
                border: "2px solid #e5e7eb", borderRadius: "12px",
                fontWeight: "600", fontSize: "14px", cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
              }}>
                ← Back
              </button>
              <button type="submit" disabled={submitting} style={{
                flex: isMobile ? "none" : 2, padding: "14px",
                background: submitting ? "#a7f3d0" : "linear-gradient(135deg, #065f46, #10b981)",
                color: "white", border: "none", borderRadius: "12px",
                fontWeight: "700", fontSize: "15px", cursor: submitting ? "not-allowed" : "pointer",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: submitting ? "none" : "0 4px 16px rgba(16,185,129,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
                {submitting ? "⏳ Submitting..." : "🚀 Submit Complaint"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;
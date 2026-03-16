import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/complaint.css";

const categoryImages = {
  "Ragging/Bullying":     "/categories/ragging.jpeg",
  "Theft":                "/categories/theft.jpeg",
  "Cyber Crime":          "/categories/cyber.jpeg",
  "Physical Assault":     "/categories/physical assault.jpeg",
  "Stalking":             "/categories/stalking.jpeg",
  "Sexual Harassment":    "/categories/sexual harrasement.jpeg",
  "Drug Activities":      "/categories/drug.jpeg",
  "Missing Person":       "/categories/missing.jpeg",
  "Fraud/Cheating":       "/categories/fraud.jpeg",
  "Road Accident":        "/categories/road accident.jpeg",
};

const Input = ({ label, placeholder, type = "text", required = false, value, onChange }) => (
  <div className="cf-field">
    <label className="cf-label">{label}{required && <span style={{color:"#ef4444"}}> *</span>}</label>
    <input
      type={type}
      placeholder={placeholder || label}
      className="cf-input"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const Textarea = ({ label, placeholder, required = false, value, onChange }) => (
  <div className="cf-field cf-full">
    <label className="cf-label">{label}{required && <span style={{color:"#ef4444"}}> *</span>}</label>
    <textarea
      placeholder={placeholder || label}
      className="cf-textarea"
      rows={4}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const Select = ({ label, options, required = false, value, onChange }) => (
  <div className="cf-field">
    <label className="cf-label">{label}{required && <span style={{color:"#ef4444"}}> *</span>}</label>
    <select className="cf-input" value={value} onChange={onChange} required={required}>
      <option value="">Select {label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

function ComplaintForm() {
  const { category } = useParams();
  const navigate = useNavigate();
  const cat = decodeURIComponent(category || "");
  const bgImage = categoryImages[cat] || "/police-bg.jpg";

  const [form, setForm] = useState({});
  const [evidence, setEvidence] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();
      fd.append("category", cat);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (evidence) fd.append("evidence", evidence);
      await axios.post("http://localhost:5000/complaints", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setSuccess("Complaint submitted successfully!");
      setTimeout(() => navigate("/my-complaints"), 1500);
    } catch(err) {
      setError("Failed to submit. Please try again.");
    }
  };

  const evidenceField = (
    <div className="cf-field cf-full">
      <label className="cf-label">Upload Evidence</label>
      <input type="file" className="cf-file" onChange={e => setEvidence(e.target.files[0])} />
    </div>
  );

 const studentFields = (
  <div className="cf-field cf-full">
    <div className="cf-student-section">
      <div className="cf-student-section-title">👤 Student Information</div>
      <div className="cf-student-grid">
        <div className="cf-field">
          <label className="cf-label">Student Name <span style={{color:"#ef4444"}}>*</span></label>
          <input className="cf-input" placeholder="Student Name" required
            value={form.studentName || ""} onChange={set("studentName")} />
        </div>
        <div className="cf-field">
          <label className="cf-label">Roll Number <span style={{color:"#ef4444"}}>*</span></label>
          <input className="cf-input" placeholder="Roll Number" required
            value={form.rollNumber || ""} onChange={set("rollNumber")} />
        </div>
        <div className="cf-field">
          <label className="cf-label">Phone Number <span style={{color:"#ef4444"}}>*</span></label>
          <input className="cf-input" placeholder="Phone Number" type="tel" required
            value={form.phoneNumber || ""} onChange={set("phoneNumber")} />
        </div>
      </div>
    </div>
  </div>
);

  const witnessField = (
    <Textarea label="Witness Details" placeholder="Name, contact, relationship..."
      value={form.witnessDetails || ""} onChange={set("witnessDetails")} />
  );

  const renderFields = () => {
    switch(cat) {

      case "Ragging/Bullying":
        return <>
          {studentFields}
          <Input label="Department" required value={form.department || ""} onChange={set("department")} />
          <Input label="Incident Date" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Input label="Incident Location" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
          <Select label="Complaint Type" required value={form.title || ""} onChange={set("title")}
            options={["Physical Ragging","Verbal Ragging","Online Bullying","Mental Harassment","Other"]} />
          <Textarea label="Description" required value={form.description || ""} onChange={set("description")}
            placeholder="Describe the incident in detail..." />
          {evidenceField}
          {witnessField}
        </>;

      case "Theft":
        return <>
          {studentFields}
          <Input label="Item Stolen" required value={form.itemStolen || ""} onChange={set("itemStolen")} />
          <Input label="Estimated Value (₹)" type="number" value={form.estimatedValue || ""} onChange={set("estimatedValue")} />
          <Input label="Date of Theft" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Input label="Location of Theft" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
          <Textarea label="Item Description" value={form.itemDescription || ""} onChange={set("itemDescription")} />
          <Textarea label="Description of Incident" required value={form.description || ""} onChange={set("description")} />
          {evidenceField}
        </>;

      case "Cyber Crime":
        return <>
          {studentFields}
          <Select label="Cyber Crime Type" required value={form.cyberCrimeType || ""} onChange={set("cyberCrimeType")}
            options={["Hacking","Online Fraud","Cyberbullying","Identity Theft","Phishing","Morphing","Other"]} />
          <Input label="Platform (Instagram/WhatsApp/Email etc.)" value={form.platform || ""} onChange={set("platform")} />
          <Input label="Suspect Username / Link" value={form.suspectUsername || ""} onChange={set("suspectUsername")} />
          <Input label="Date of Incident" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Textarea label="Description" required value={form.description || ""} onChange={set("description")} />
          {evidenceField}
        </>;

      case "Physical Assault":
        return <>
          {studentFields}
          <Input label="Date of Incident" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Input label="Location" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
          <Input label="Accused Person Name" value={form.accusedName || ""} onChange={set("accusedName")} />
          <Textarea label="Description of Incident" required value={form.description || ""} onChange={set("description")} />
          <Textarea label="Injury Details" value={form.injuryDetails || ""} onChange={set("injuryDetails")} />
          {evidenceField}
          {witnessField}
        </>;

      case "Stalking":
        return <>
          {studentFields}
          <Select label="Stalking Type" required value={form.stalkingType || ""} onChange={set("stalkingType")}
            options={["Physical Stalking","Online Stalking","Phone Harassment","Other"]} />
          <Input label="Platform / Location" value={form.stalkingPlatform || ""} onChange={set("stalkingPlatform")} />
          <Input label="Suspect Name / Description" value={form.stalkingSuspect || ""} onChange={set("stalkingSuspect")} />
          <Input label="Date of Incident" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Textarea label="Description" required value={form.description || ""} onChange={set("description")} />
          {evidenceField}
          {witnessField}
        </>;

      case "Sexual Harassment":
        return <>
          {studentFields}
          <Input label="Incident Date" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Input label="Location" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
          <Input label="Accused Person Name / Description" value={form.accusedName || ""} onChange={set("accusedName")} />
          <Select label="Type of Harassment" required value={form.harassmentType || ""} onChange={set("harassmentType")}
            options={["Verbal","Physical","Online","Gestural","Other"]} />
          <Textarea label="Incident Description" required value={form.description || ""} onChange={set("description")} />
          {evidenceField}
          {witnessField}
        </>;

      case "Fraud/Cheating":
        return <>
          {studentFields}
          <Select label="Fraud Type" required value={form.fraudType || ""} onChange={set("fraudType")}
            options={["Online Fraud","UPI Fraud","Fake Job Offer","Exam Cheating","Impersonation","Other"]} />
          <Input label="Date of Incident" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Input label="Platform / Location" value={form.platform || ""} onChange={set("platform")} />
          <Input label="Suspect Phone / Email / UPI ID" value={form.suspectContact || ""} onChange={set("suspectContact")} />
          <Input label="Amount Lost (₹)" type="number" value={form.amountLost || ""} onChange={set("amountLost")} />
          <Input label="Transaction ID" value={form.transactionId || ""} onChange={set("transactionId")} />
          <Textarea label="Description of Incident" required value={form.description || ""} onChange={set("description")} />
          {evidenceField}
        </>;

      case "Drug Activities":
        return <>
          {studentFields}
          <Select label="Type of Drug Activity" required value={form.drugActivityType || ""} onChange={set("drugActivityType")}
            options={["Possession","Selling","Consumption","Distribution","Other"]} />
          <Input label="Date of Incident" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Input label="Location" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
          <Input label="Suspect Name / Description" value={form.suspectDescription || ""} onChange={set("suspectDescription")} />
          <Textarea label="Incident Description" required value={form.description || ""} onChange={set("description")} />
          {evidenceField}
          {witnessField}
        </>;

      case "Missing Person":
        return <>
          {studentFields}
          <Input label="Missing Person Name" required value={form.missingPersonName || ""} onChange={set("missingPersonName")} />
          <Input label="Age" type="number" required value={form.missingPersonAge || ""} onChange={set("missingPersonAge")} />
          <Select label="Gender" required value={form.missingPersonGender || ""} onChange={set("missingPersonGender")}
            options={["Male","Female","Other"]} />
          <Input label="Last Seen Date" type="date" required value={form.lastSeenDate || ""} onChange={set("lastSeenDate")} />
          <Input label="Last Seen Location" required value={form.lastSeenLocation || ""} onChange={set("lastSeenLocation")} />
          <Textarea label="Clothing Description" value={form.clothingDescription || ""} onChange={set("clothingDescription")} />
          <Textarea label="Incident Description" value={form.description || ""} onChange={set("description")} />
          {evidenceField}
          {witnessField}
        </>;

      case "Road Accident":
        return <>
          {studentFields}
          <Input label="Date of Accident" type="date" required value={form.accidentDate || ""} onChange={set("accidentDate")} />
          <Input label="Time of Accident" type="time" required value={form.accidentTime || ""} onChange={set("accidentTime")} />
          <Input label="Location" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
          <Input label="Vehicle Number" value={form.vehicleNumber || ""} onChange={set("vehicleNumber")} />
          <Input label="Driver Name" value={form.driverName || ""} onChange={set("driverName")} />
          <Textarea label="Injury Details" value={form.injuryDetails || ""} onChange={set("injuryDetails")} />
          <Textarea label="Accident Description" required value={form.description || ""} onChange={set("description")} />
          {evidenceField}
          {witnessField}
        </>;

      default:
        return <>
          {studentFields}
          <Input label="Incident Date" type="date" required value={form.incidentDate || ""} onChange={set("incidentDate")} />
          <Input label="Location" required value={form.incidentLocation || ""} onChange={set("incidentLocation")} />
          <Textarea label="Description" required value={form.description || ""} onChange={set("description")} />
          {evidenceField}
        </>;
    }
  };

  return (
    <div
      className="complaint-container"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="complaint-overlay">
        <div className="complaint-card">

          <div className="cf-header">
            <div className="cf-badge">{cat}</div>
            <h2 className="complaint-title">Submit Complaint</h2>
            <p className="complaint-subtitle">Fill all details carefully for faster resolution</p>
          </div>

          {success && <div className="complaint-success">✅ {success}</div>}
          {error && <div className="complaint-error">❌ {error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="cf-grid">
              {renderFields()}
            </div>
            <div className="complaint-actions">
              <button type="button" className="complaint-back-btn" onClick={() => navigate("/submit")}>
                ← Back
              </button>
              <button type="submit" className="complaint-btn">
                Submit Complaint
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default ComplaintForm;
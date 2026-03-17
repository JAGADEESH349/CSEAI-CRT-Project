import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/dashboard.css";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const statusFilter = params.get("status");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_URL}/complaints`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setComplaints(res.data))
      .catch(err => { console.log(err); if (err.response?.status === 401 || err.response?.status === 403) { localStorage.clear(); window.location.href = "/"; } });
  }, []);

  const markSolved = async (id) => {
    const token = localStorage.getItem("token");
    await axios.patch(`${API_URL}/complaints/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setComplaints(prev => prev.map(c => c._id === id ? { ...c, status: "Solved" } : c));
  };

  const filtered = complaints.filter(c => {
    const matchSearch =
      (c.studentName?.toLowerCase().includes(search.toLowerCase())) ||
      (c.category?.toLowerCase().includes(search.toLowerCase())) ||
      (c.rollNumber?.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter === "pending") return c.status === "Pending" && matchSearch;
    if (statusFilter === "solved")  return c.status === "Solved"  && matchSearch;
    return matchSearch;
  });

  const pageTitle = statusFilter === "pending" ? "Pending Complaints"
    : statusFilter === "solved" ? "Solved Complaints" : "All Complaints";

  const renderDetails = (c) => {
    const rows = [];
    if (c.studentName)       rows.push(["Student Name", c.studentName]);
    if (c.rollNumber)        rows.push(["Roll Number", c.rollNumber]);
    if (c.phoneNumber)       rows.push(["Phone", c.phoneNumber]);
    if (c.department)        rows.push(["Department", c.department]);
    if (c.incidentDate)      rows.push(["Incident Date", c.incidentDate]);
    if (c.incidentLocation)  rows.push(["Location", c.incidentLocation]);
    if (c.itemStolen)        rows.push(["Item Stolen", c.itemStolen]);
    if (c.estimatedValue)    rows.push(["Est. Value", `₹${c.estimatedValue}`]);
    if (c.cyberCrimeType)    rows.push(["Crime Type", c.cyberCrimeType]);
    if (c.platform)          rows.push(["Platform", c.platform]);
    if (c.suspectUsername)   rows.push(["Suspect Username", c.suspectUsername]);
    if (c.accusedName)       rows.push(["Accused", c.accusedName]);
    if (c.injuryDetails)     rows.push(["Injury Details", c.injuryDetails]);
    if (c.harassmentType)    rows.push(["Harassment Type", c.harassmentType]);
    if (c.fraudType)         rows.push(["Fraud Type", c.fraudType]);
    if (c.suspectContact)    rows.push(["Suspect Contact", c.suspectContact]);
    if (c.amountLost)        rows.push(["Amount Lost", `₹${c.amountLost}`]);
    if (c.transactionId)     rows.push(["Transaction ID", c.transactionId]);
    if (c.drugActivityType)  rows.push(["Drug Activity", c.drugActivityType]);
    if (c.suspectDescription)rows.push(["Suspect", c.suspectDescription]);
    if (c.vehicleNumber)     rows.push(["Vehicle No.", c.vehicleNumber]);
    if (c.driverName)        rows.push(["Driver Name", c.driverName]);
    if (c.stalkingType)      rows.push(["Stalking Type", c.stalkingType]);
    if (c.witnessDetails)    rows.push(["Witnesses", c.witnessDetails]);
    return rows;
  };

  return (
    <div style={{ padding: "16px", background: "#f8fafc", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>

      <h3 className="section-title" style={{ fontSize: "clamp(16px, 4vw, 22px)" }}>{pageTitle}</h3>

      {/* Search */}
      <div className="search-container" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, roll no, category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0" }}>No complaints found</p>
      )}

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
        gap: "16px",
        marginBottom: "32px",
      }}>
        {filtered.map(c => (
          <div key={c._id} className={`card complaint-card ${c.status === "Solved" ? "solved" : ""}`} style={{ height: "100%" }}>
            <div className="card-body">

              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: "700" }}>
                  {c.category}
                </span>
                <span className={`badge ${c.status === "Solved" ? "bg-success" : "bg-danger"}`}>{c.status}</span>
              </div>

              <div className="complaint-title-box">👤 {c.studentName || "Unknown"} — {c.rollNumber || "N/A"}</div>

              <div style={{ fontSize: "13px", color: "#374151", marginBottom: "10px" }}>
                {c.phoneNumber       && <p style={{ margin: "2px 0" }}>📞 {c.phoneNumber}</p>}
                {c.incidentDate      && <p style={{ margin: "2px 0" }}>📅 {c.incidentDate}</p>}
                {c.incidentLocation  && <p style={{ margin: "2px 0" }}>📍 {c.incidentLocation}</p>}
              </div>

              {c.description && <p className="card-text" style={{ marginBottom: "10px" }}>{c.description}</p>}

              {/* Expand */}
              <button
                onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                style={{ background: "#f0fdf4", color: "#065f46", border: "1px solid #a7f3d0", borderRadius: "8px", padding: "8px 14px", fontSize: "12px", fontWeight: "600", cursor: "pointer", marginBottom: "10px", width: "100%", fontFamily: "'Poppins', sans-serif" }}
              >
                {expanded === c._id ? "▲ Hide Details" : "▼ View Full Details"}
              </button>

              {expanded === c._id && (
                <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px", marginBottom: "10px", border: "1px solid #e2e8f0", maxHeight: "300px", overflowY: "auto" }}>
                  {renderDetails(c).map(([label, value]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid #f1f5f9", fontSize: "12px", gap: "8px" }}>
                      <span style={{ color: "#6b7280", fontWeight: "600", flexShrink: 0 }}>{label}</span>
                      <span style={{ color: "#1f2937", textAlign: "right", wordBreak: "break-word" }}>{value}</span>
                    </div>
                  ))}
                  {c.evidencePath && (
                    <a href={`${API_URL}/uploads/${c.evidencePath}`} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: "8px", color: "#1d4ed8", fontSize: "12px", fontWeight: "600" }}>
                      📎 View Evidence
                    </a>
                  )}
                </div>
              )}

              <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 10px" }}>
                🕐 {c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A"}
              </p>

              {c.status === "Pending" && (
                <button className="btn btn-success solve-btn w-100" onClick={() => markSolved(c._id)}>✅ Mark as Solved</button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminComplaints;
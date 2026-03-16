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
    axios.get("http://localhost:5000/complaints", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComplaints(res.data))
    .catch(err => console.log(err));
  }, []);

  const markSolved = async (id) => {
    const token = localStorage.getItem("token");
    await axios.patch(`http://localhost:5000/complaints/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setComplaints(prev =>
      prev.map(c => c._id === id ? { ...c, status: "Solved" } : c)
    );
  };

  const filtered = complaints.filter(c => {
    const matchSearch =
      (c.studentName?.toLowerCase().includes(search.toLowerCase())) ||
      (c.category?.toLowerCase().includes(search.toLowerCase())) ||
      (c.rollNumber?.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter === "pending") return c.status === "Pending" && matchSearch;
    if (statusFilter === "solved") return c.status === "Solved" && matchSearch;
    return matchSearch;
  });

  const pageTitle = statusFilter === "pending"
    ? "Pending Complaints"
    : statusFilter === "solved"
    ? "Solved Complaints"
    : "All Complaints";

  const renderDetails = (c) => {
    const rows = [];
    if (c.studentName) rows.push(["Student Name", c.studentName]);
    if (c.rollNumber) rows.push(["Roll Number", c.rollNumber]);
    if (c.phoneNumber) rows.push(["Phone", c.phoneNumber]);
    if (c.department) rows.push(["Department", c.department]);
    if (c.incidentDate) rows.push(["Incident Date", c.incidentDate]);
    if (c.incidentLocation) rows.push(["Location", c.incidentLocation]);
    if (c.itemStolen) rows.push(["Item Stolen", c.itemStolen]);
    if (c.estimatedValue) rows.push(["Est. Value", `₹${c.estimatedValue}`]);
    if (c.cyberCrimeType) rows.push(["Crime Type", c.cyberCrimeType]);
    if (c.platform) rows.push(["Platform", c.platform]);
    if (c.suspectUsername) rows.push(["Suspect Username", c.suspectUsername]);
    if (c.accusedName) rows.push(["Accused", c.accusedName]);
    if (c.injuryDetails) rows.push(["Injury Details", c.injuryDetails]);
    if (c.harassmentType) rows.push(["Harassment Type", c.harassmentType]);
    if (c.fraudType) rows.push(["Fraud Type", c.fraudType]);
    if (c.suspectContact) rows.push(["Suspect Contact", c.suspectContact]);
    if (c.amountLost) rows.push(["Amount Lost", `₹${c.amountLost}`]);
    if (c.transactionId) rows.push(["Transaction ID", c.transactionId]);
    if (c.drugActivityType) rows.push(["Drug Activity", c.drugActivityType]);
    if (c.suspectDescription) rows.push(["Suspect", c.suspectDescription]);
    if (c.missingPersonName) rows.push(["Missing Person", c.missingPersonName]);
    if (c.missingPersonAge) rows.push(["Age", c.missingPersonAge]);
    if (c.missingPersonGender) rows.push(["Gender", c.missingPersonGender]);
    if (c.lastSeenDate) rows.push(["Last Seen Date", c.lastSeenDate]);
    if (c.lastSeenLocation) rows.push(["Last Seen Location", c.lastSeenLocation]);
    if (c.clothingDescription) rows.push(["Clothing", c.clothingDescription]);
    if (c.vehicleNumber) rows.push(["Vehicle No.", c.vehicleNumber]);
    if (c.driverName) rows.push(["Driver Name", c.driverName]);
    if (c.accidentDate) rows.push(["Accident Date", c.accidentDate]);
    if (c.accidentTime) rows.push(["Accident Time", c.accidentTime]);
    if (c.stalkingType) rows.push(["Stalking Type", c.stalkingType]);
    if (c.stalkingPlatform) rows.push(["Platform", c.stalkingPlatform]);
    if (c.stalkingSuspect) rows.push(["Suspect", c.stalkingSuspect]);
    if (c.witnessDetails) rows.push(["Witnesses", c.witnessDetails]);
    return rows;
  };

  return (
    <div className="dashboard-page">
      <div className="admin-panel container-fluid">
        <div className="container mt-4">

          <h3 className="section-title">{pageTitle}</h3>

          <div className="search-container">
            <label className="search-label">Search by Name, Roll No, Category</label>
            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-box"
            />
          </div>

          {filtered.length === 0 && (
            <p className="text-center">No complaints found</p>
          )}

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
            {filtered.map(c => (
              <div key={c._id} className="col">
                <div className={`card complaint-card h-100 ${c.status === "Solved" ? "solved" : ""}`}>
                  <div className="card-body">

                    {/* Category + Status */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{
                        background: "linear-gradient(135deg, #1d4ed8, #3b82f6)",
                        color: "white", padding: "4px 12px",
                        borderRadius: "20px", fontSize: "11px", fontWeight: "700"
                      }}>
                        {c.category}
                      </span>
                      <span className={`badge ms-2 ${c.status === "Solved" ? "bg-success" : "bg-danger"}`}>
                        {c.status}
                      </span>
                    </div>

                    {/* Student Info */}
                    <div className="complaint-title-box">
                      👤 {c.studentName || "Unknown"} — {c.rollNumber || "N/A"}
                    </div>

                    {/* Quick Info */}
                    <div style={{ fontSize: "13px", color: "#374151", marginBottom: "10px" }}>
                      {c.phoneNumber && <p style={{margin:"2px 0"}}><b>📞</b> {c.phoneNumber}</p>}
                      {c.incidentDate && <p style={{margin:"2px 0"}}><b>📅</b> {c.incidentDate}</p>}
                      {c.incidentLocation && <p style={{margin:"2px 0"}}><b>📍</b> {c.incidentLocation}</p>}
                    </div>

                    {/* Description */}
                    {c.description && (
                      <p className="card-text" style={{ marginBottom: "10px" }}>
                        {c.description}
                      </p>
                    )}

                    {/* Expand/Collapse */}
                    <button
                      onClick={() => setExpanded(expanded === c._id ? null : c._id)}
                      style={{
                        background: "#f0fdf4", color: "#065f46",
                        border: "1px solid #a7f3d0", borderRadius: "8px",
                        padding: "6px 14px", fontSize: "12px",
                        fontWeight: "600", cursor: "pointer",
                        marginBottom: "10px", width: "100%"
                      }}
                    >
                      {expanded === c._id ? "▲ Hide Details" : "▼ View Full Details"}
                    </button>

                    {/* Full Details — FIX: Added missing closing </div> for expanded block */}
                    {expanded === c._id && (
                      <div style={{
                        background: "#f8fafc", borderRadius: "10px",
                        padding: "12px", marginBottom: "10px",
                        border: "1px solid #e2e8f0"
                      }}>
                        {renderDetails(c).map(([label, value]) => (
                          <div key={label} style={{
                            display: "flex", justifyContent: "space-between",
                            padding: "4px 0", borderBottom: "1px solid #f1f5f9",
                            fontSize: "12px"
                          }}>
                            <span style={{ color: "#6b7280", fontWeight: "600" }}>{label}</span>
                            <span style={{ color: "#1f2937", textAlign: "right", maxWidth: "55%" }}>{value}</span>
                          </div>
                        ))}

                        {/* FIX: Added missing <a tag */}
                        {c.evidencePath && (
                          <a
                            href={`http://localhost:5000/uploads/${c.evidencePath}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: "block", marginTop: "8px",
                              color: "#1d4ed8", fontSize: "12px", fontWeight: "600"
                            }}
                          >
                            📎 View Evidence
                          </a>
                        )}
                      </div>
                    )}

                    {/* Submitted */}
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: "0 0 10px" }}>
                      🕐 {c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A"}
                    </p>

                    {/* Mark Solved */}
                    {c.status === "Pending" && (
                      <button className="btn btn-success solve-btn w-100" onClick={() => markSolved(c._id)}>
                        ✅ Mark as Solved
                      </button>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminComplaints;
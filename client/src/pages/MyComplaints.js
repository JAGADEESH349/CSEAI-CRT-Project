import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/myComplaints.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusFilter = params.get("status");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }
    axios.get("http://localhost:5000/complaints", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComplaints(res.data))
    .catch(err => console.log(err));
  }, [navigate]);

  const startEdit = (c) => {
    setEditingId(c._id);
    setEditForm({
      description: c.description || "",
      incidentLocation: c.incidentLocation || "",
      witnessDetails: c.witnessDetails || "",
    });
  };

  const saveEdit = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.patch(
        `http://localhost:5000/complaints/${id}/update`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints(complaints.map(c => c._id === id ? res.data : c));
      setEditingId(null);
    } catch(err) {
      console.log(err);
    }
  };

  const filtered = complaints.filter(c => {
    if (statusFilter === "pending") return c.status === "Pending";
    if (statusFilter === "solved") return c.status === "Solved";
    return true;
  });

  const pageTitle = statusFilter === "pending"
    ? "Pending Complaints"
    : statusFilter === "solved"
    ? "Solved Complaints"
    : "My Complaints";

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
    if (c.suspectUsername) rows.push(["Suspect", c.suspectUsername]);
    if (c.accusedName) rows.push(["Accused", c.accusedName]);
    if (c.injuryDetails) rows.push(["Injury", c.injuryDetails]);
    if (c.harassmentType) rows.push(["Type", c.harassmentType]);
    if (c.fraudType) rows.push(["Fraud Type", c.fraudType]);
    if (c.amountLost) rows.push(["Amount Lost", `₹${c.amountLost}`]);
    if (c.transactionId) rows.push(["Transaction ID", c.transactionId]);
    if (c.drugActivityType) rows.push(["Activity Type", c.drugActivityType]);
    if (c.missingPersonName) rows.push(["Missing Person", c.missingPersonName]);
    if (c.missingPersonAge) rows.push(["Age", c.missingPersonAge]);
    if (c.missingPersonGender) rows.push(["Gender", c.missingPersonGender]);
    if (c.lastSeenDate) rows.push(["Last Seen", c.lastSeenDate]);
    if (c.lastSeenLocation) rows.push(["Last Seen Location", c.lastSeenLocation]);
    if (c.vehicleNumber) rows.push(["Vehicle No.", c.vehicleNumber]);
    if (c.driverName) rows.push(["Driver", c.driverName]);
    if (c.accidentDate) rows.push(["Accident Date", c.accidentDate]);
    if (c.accidentTime) rows.push(["Time", c.accidentTime]);
    if (c.stalkingType) rows.push(["Stalking Type", c.stalkingType]);
    if (c.stalkingSuspect) rows.push(["Suspect", c.stalkingSuspect]);
    return rows;
  };

  return (
    <div className="mycomplaints-container">

      <h2 className="mycomplaints-title">{pageTitle}</h2>
      <p className="mycomplaints-subtitle">
        {filtered.length} complaint{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* EDIT MODAL */}
      {editingId && (
        <div className="edit-overlay">
          <div className="edit-card">
            <h3>✏️ Edit Complaint</h3>

            <label className="edit-label">Description</label>
            <textarea className="edit-textarea"
              value={editForm.description || ""}
              onChange={e => setEditForm({...editForm, description: e.target.value})}
            />

            <label className="edit-label">Incident Location</label>
            <input className="edit-input"
              value={editForm.incidentLocation || ""}
              onChange={e => setEditForm({...editForm, incidentLocation: e.target.value})}
            />

            <label className="edit-label">Witness Details</label>
            <textarea className="edit-textarea"
              value={editForm.witnessDetails || ""}
              onChange={e => setEditForm({...editForm, witnessDetails: e.target.value})}
            />

            <div className="edit-buttons">
              <button className="save-btn" onClick={() => saveEdit(editingId)}>Save Changes</button>
              <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="empty-state">
          <p>No complaints found.</p>
        </div>
      )}

      {/* GRID */}
      <div className="mycomplaints-grid">
        {filtered.map((c) => (
          <div key={c._id} className={`complaint-card ${c.status === "Solved" ? "solved-card" : ""}`}>
            <div className="complaint-card-body">

              {/* Category Badge */}
              <div className="mc-category-badge">{c.category}</div>

              {/* Status */}
              <div className="complaint-status">
                <span className="status-label">Status:</span>
                <span className={`status-badge ${c.status === "Solved" ? "status-solved" : "status-pending"}`}>
                  {c.status}
                </span>
              </div>

              {/* Details Table */}
              <div className="mc-details-table">
                {renderDetails(c).map(([label, value]) => (
                  <div key={label} className="mc-detail-row">
                    <span className="mc-detail-label">{label}</span>
                    <span className="mc-detail-value">{value}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              {c.description && (
                <div className="complaint-description">
                  <strong>Description:</strong>
                  <p style={{ margin: "4px 0 0" }}>{c.description}</p>
                </div>
              )}

              {/* Witness */}
              {c.witnessDetails && (
                <div className="complaint-description" style={{ marginTop: "8px" }}>
                  <strong>Witness:</strong>
                  <p style={{ margin: "4px 0 0" }}>{c.witnessDetails}</p>
                </div>
              )}

              {/* Evidence */}
                    {c.evidencePath && (
        
          href={`http://localhost:5000/uploads/${c.evidencePath}`}
          target="_blank"
          rel="noreferrer"
          className="mc-evidence-link"
        >
          📎 View Evidence
        </a>
      )}

              {/* Submitted */}
              <div className="mc-submitted">
                🕐 Submitted: {c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A"}
              </div>

              {/* Edit Button */}
              {c.status !== "Solved" && (
                <button className="edit-btn" onClick={() => startEdit(c)}>
                  ✏️ Edit Complaint
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComplaints;
import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/myComplaints.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [viewingComplaint, setViewingComplaint] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusFilter = params.get("status");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }
    axios.get(`${API_URL}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComplaints(res.data))
    .catch(err => { console.log(err); if (err.response?.status === 401 || err.response?.status === 403) { localStorage.clear(); window.location.href = "/"; } });
  }, [navigate]);

  const startEdit = (c) => {
    setEditingId(c._id);
    setEditForm({
      title: c.title || "",
      description: c.description || "",
      incidentLocation: c.incidentLocation || "",
      incidentDate: c.incidentDate || "",
      phoneNumber: c.phoneNumber || "",
      witnessDetails: c.witnessDetails || "",
      accusedName: c.accusedName || "",
      injuryDetails: c.injuryDetails || "",
    });
  };

  const saveEdit = async (id) => {
    const token = localStorage.getItem("token");
    try {
      // ✅ FIX 2: Use student-update endpoint (not police-only /update)
      const res = await axios.patch(
        `${API_URL}/complaints/${id}/student-update`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComplaints(complaints.map(c => c._id === id ? res.data : c));
      setEditingId(null);
    } catch(err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to save changes");
    }
  };

  const filtered = complaints.filter(c => {
    if (statusFilter === "pending") return c.status === "Pending";
    if (statusFilter === "solved") return c.status === "Solved";
    return true;
  });

  const pageTitle = statusFilter === "pending"
    ? "⏳ Pending Complaints"
    : statusFilter === "solved"
    ? "✅ Solved Complaints"
    : "📋 My Complaints";

  const renderAllDetails = (c) => {
    const rows = [];
    if (c.studentName)        rows.push(["👤 Student Name",    c.studentName]);
    if (c.rollNumber)         rows.push(["🎓 Roll Number",     c.rollNumber]);
    if (c.phoneNumber)        rows.push(["📞 Phone",           c.phoneNumber]);
    if (c.department)         rows.push(["🏢 Department",      c.department]);
    if (c.incidentDate)       rows.push(["📅 Incident Date",   c.incidentDate]);
    if (c.accidentDate)       rows.push(["📅 Accident Date",   c.accidentDate]);
    if (c.accidentTime)       rows.push(["⏰ Accident Time",   c.accidentTime]);
    if (c.incidentLocation)   rows.push(["📍 Location",        c.incidentLocation]);
    if (c.title)              rows.push(["📌 Complaint Type",  c.title]);
    if (c.itemStolen)         rows.push(["🎒 Item Stolen",     c.itemStolen]);
    if (c.itemDescription)    rows.push(["📝 Item Desc.",      c.itemDescription]);
    if (c.estimatedValue)     rows.push(["💰 Est. Value",      `₹${c.estimatedValue}`]);
    if (c.cyberCrimeType)     rows.push(["💻 Crime Type",      c.cyberCrimeType]);
    if (c.platform)           rows.push(["📱 Platform",        c.platform]);
    if (c.suspectUsername)    rows.push(["🔍 Suspect",         c.suspectUsername]);
    if (c.accusedName)        rows.push(["⚠️ Accused",         c.accusedName]);
    if (c.injuryDetails)      rows.push(["🩹 Injury Details",  c.injuryDetails]);
    if (c.harassmentType)     rows.push(["🚨 Type",            c.harassmentType]);
    if (c.fraudType)          rows.push(["💳 Fraud Type",      c.fraudType]);
    if (c.suspectContact)     rows.push(["📞 Suspect Contact", c.suspectContact]);
    if (c.amountLost)         rows.push(["💸 Amount Lost",     `₹${c.amountLost}`]);
    if (c.transactionId)      rows.push(["🔢 Transaction ID",  c.transactionId]);
    if (c.drugActivityType)   rows.push(["💊 Drug Activity",   c.drugActivityType]);
    if (c.suspectDescription) rows.push(["🔎 Suspect",         c.suspectDescription]);
    if (c.missingPersonName)  rows.push(["👤 Missing Person",  c.missingPersonName]);
    if (c.missingPersonAge)   rows.push(["🎂 Age",             c.missingPersonAge]);
    if (c.missingPersonGender)rows.push(["⚧ Gender",          c.missingPersonGender]);
    if (c.lastSeenDate)       rows.push(["📅 Last Seen Date",  c.lastSeenDate]);
    if (c.lastSeenLocation)   rows.push(["📍 Last Seen At",    c.lastSeenLocation]);
    if (c.clothingDescription)rows.push(["👕 Clothing",        c.clothingDescription]);
    if (c.vehicleNumber)      rows.push(["🚗 Vehicle No.",     c.vehicleNumber]);
    if (c.driverName)         rows.push(["🧑 Driver",          c.driverName]);
    if (c.stalkingType)       rows.push(["🚨 Stalking Type",   c.stalkingType]);
    if (c.stalkingPlatform)   rows.push(["📱 Platform",        c.stalkingPlatform]);
    if (c.stalkingSuspect)    rows.push(["🔍 Suspect",         c.stalkingSuspect]);
    if (c.witnessDetails)     rows.push(["👥 Witnesses",       c.witnessDetails]);
    return rows;
  };

  return (
    <div className="mycomplaints-container">

      <h2 className="mycomplaints-title">{pageTitle}</h2>
      <p className="mycomplaints-subtitle">
        {filtered.length} complaint{filtered.length !== 1 ? "s" : ""} found
      </p>

      {/* VIEW MODAL */}
      {viewingComplaint && (
        <div className="mc-modal-overlay" onClick={() => setViewingComplaint(null)}>
          <div className="mc-view-modal" onClick={e => e.stopPropagation()}>
            <div className="mc-view-header">
              <div>
                <span className="mc-view-badge">{viewingComplaint.category}</span>
                <h3 className="mc-view-title">Full Complaint Details</h3>
              </div>
              <button className="mc-close-btn" onClick={() => setViewingComplaint(null)}>✕</button>
            </div>
            <div className="mc-view-meta-row">
              <span className={`status-badge ${viewingComplaint.status === "Solved" ? "status-solved" : "status-pending"}`}>
                {viewingComplaint.status === "Solved" ? "✅ Solved" : "⏳ Pending"}
              </span>
              <span className="mc-view-date">
                🕐 Submitted: {viewingComplaint.createdAt ? new Date(viewingComplaint.createdAt).toLocaleString() : "N/A"}
              </span>
            </div>
            <div className="mc-view-details-grid">
              {renderAllDetails(viewingComplaint).map(([label, value]) => (
                <div key={label} className="mc-view-detail-item">
                  <span className="mc-view-detail-label">{label}</span>
                  <span className="mc-view-detail-value">{value}</span>
                </div>
              ))}
            </div>
            {viewingComplaint.description && (
              <div className="mc-view-section">
                <div className="mc-view-section-title">📝 Description</div>
                <div className="mc-view-description">{viewingComplaint.description}</div>
              </div>
            )}
            {viewingComplaint.witnessDetails && (
              <div className="mc-view-section">
                <div className="mc-view-section-title">👥 Witness Details</div>
                <div className="mc-view-description">{viewingComplaint.witnessDetails}</div>
              </div>
            )}
            {viewingComplaint.evidencePath && (
              <div className="mc-view-section">
                <a href={`${API_URL}/uploads/${viewingComplaint.evidencePath}`} target="_blank" rel="noreferrer" className="mc-evidence-link">
                  📎 View Uploaded Evidence
                </a>
              </div>
            )}
            <div className="mc-view-footer">
              <button className="mc-view-close-btn" onClick={() => setViewingComplaint(null)}>Close</button>
              {viewingComplaint.status !== "Solved" && (
                <button className="mc-view-edit-btn" onClick={() => { setViewingComplaint(null); startEdit(viewingComplaint); }}>
                  ✏️ Edit This Complaint
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingId && (
        <div className="mc-modal-overlay" onClick={() => setEditingId(null)}>
          <div className="mc-edit-modal" onClick={e => e.stopPropagation()}>
            <div className="mc-edit-header">
              <div>
                <h3 className="mc-edit-title">✏️ Edit Complaint</h3>
                <p className="mc-edit-subtitle">Update the details below and save your changes</p>
              </div>
              <button className="mc-close-btn" onClick={() => setEditingId(null)}>✕</button>
            </div>
            <div className="mc-edit-body">
              <div className="mc-edit-field">
                <label className="mc-edit-label">📌 Complaint Title</label>
                <input className="mc-edit-input" placeholder="Short title"
                  value={editForm.title || ""} onChange={e => setEditForm({...editForm, title: e.target.value})} />
              </div>
              <div className="mc-edit-row">
                <div className="mc-edit-field">
                  <label className="mc-edit-label">📅 Incident Date</label>
                  <input className="mc-edit-input" type="date"
                    value={editForm.incidentDate || ""} onChange={e => setEditForm({...editForm, incidentDate: e.target.value})} />
                </div>
                <div className="mc-edit-field">
                  <label className="mc-edit-label">📞 Phone Number</label>
                  <input className="mc-edit-input" type="tel" placeholder="Your phone"
                    value={editForm.phoneNumber || ""} onChange={e => setEditForm({...editForm, phoneNumber: e.target.value})} />
                </div>
              </div>
              <div className="mc-edit-field">
                <label className="mc-edit-label">📍 Incident Location</label>
                <input className="mc-edit-input" placeholder="Where did it happen?"
                  value={editForm.incidentLocation || ""} onChange={e => setEditForm({...editForm, incidentLocation: e.target.value})} />
              </div>
              <div className="mc-edit-field">
                <label className="mc-edit-label">⚠️ Accused / Suspect</label>
                <input className="mc-edit-input" placeholder="Name or description"
                  value={editForm.accusedName || ""} onChange={e => setEditForm({...editForm, accusedName: e.target.value})} />
              </div>
              <div className="mc-edit-field">
                <label className="mc-edit-label">📝 Description <span style={{color:"#ef4444"}}>*</span></label>
                <textarea className="mc-edit-textarea" placeholder="Describe the incident..."
                  value={editForm.description || ""} onChange={e => setEditForm({...editForm, description: e.target.value})} />
              </div>
              <div className="mc-edit-field">
                <label className="mc-edit-label">🩹 Injury Details</label>
                <textarea className="mc-edit-textarea mc-edit-textarea-sm" placeholder="Any injuries..."
                  value={editForm.injuryDetails || ""} onChange={e => setEditForm({...editForm, injuryDetails: e.target.value})} />
              </div>
              <div className="mc-edit-field">
                <label className="mc-edit-label">👥 Witness Details</label>
                <textarea className="mc-edit-textarea mc-edit-textarea-sm" placeholder="Witness info..."
                  value={editForm.witnessDetails || ""} onChange={e => setEditForm({...editForm, witnessDetails: e.target.value})} />
              </div>
            </div>
            <div className="mc-edit-footer">
              <button className="mc-cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
              <button className="mc-save-btn" onClick={() => saveEdit(editingId)}>💾 Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="empty-state">
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
          <p>No complaints found.</p>
        </div>
      )}

      <div className="mycomplaints-grid">
        {filtered.map((c) => (
          <div key={c._id} className={`complaint-card ${c.status === "Solved" ? "solved-card" : ""}`}>
            <div className="complaint-card-body">
              <div className="mc-category-badge">{c.category}</div>
              <div className="complaint-status">
                <span className="status-label">Status:</span>
                <span className={`status-badge ${c.status === "Solved" ? "status-solved" : "status-pending"}`}>
                  {c.status === "Solved" ? "✅ Solved" : "⏳ Pending"}
                </span>
              </div>
              <div className="mc-quick-info">
                {c.studentName && <div className="mc-info-row"><span>👤</span><span>{c.studentName}</span></div>}
                {c.rollNumber  && <div className="mc-info-row"><span>🎓</span><span>{c.rollNumber}</span></div>}
                {(c.incidentDate || c.accidentDate) && <div className="mc-info-row"><span>📅</span><span>{c.incidentDate || c.accidentDate}</span></div>}
                {c.incidentLocation && <div className="mc-info-row"><span>📍</span><span>{c.incidentLocation}</span></div>}
              </div>
              {c.description && (
                <div className="mc-description-preview">
                  {c.description.length > 100 ? c.description.slice(0, 100) + "..." : c.description}
                </div>
              )}
              <div className="mc-submitted">
                🕐 {c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A"}
              </div>
              <div className="mc-card-actions">
                <button className="mc-view-btn" onClick={() => setViewingComplaint(c)}>
                  👁 View Details
                </button>
                {c.status !== "Solved" && (
                  <button className="edit-btn" onClick={() => startEdit(c)}>
                    ✏️ Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyComplaints;
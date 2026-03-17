import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_URL}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComplaints(res.data))
    .catch(err => { console.log(err); if (err.response?.status === 401 || err.response?.status === 403) { localStorage.clear(); window.location.href = "/"; } });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const markSolved = async (id) => {
    const token = localStorage.getItem("token");
    await axios.patch(`${API_URL}/complaints/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setComplaints(prev =>
      prev.map(c => c._id === id ? { ...c, status: "Solved" } : c)
    );
  };

  const pending = complaints.filter(c =>
    c.status === "Pending" &&
    (c.title?.toLowerCase().includes(search.toLowerCase()) ||
     c.category?.toLowerCase().includes(search.toLowerCase()))
  );

  const solved = complaints.filter(c =>
    c.status === "Solved" &&
    (c.title?.toLowerCase().includes(search.toLowerCase()) ||
     c.category?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard-page">
      <div className="admin-panel container-fluid">
        <div className="container mt-2">

          {/* ── Police Header ── */}
          <div className="police-header-bar">
            <div className="header-left">
              <FaUserShield className="police-icon" />
              <div>
                <h2 className="police-title">Rajampet Police</h2>
                <p className="dashboard-subtitle">Complaint Management Dashboard</p>
              </div>
            </div>
            <button className="btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* ── Emblem Strip ── */}
          <div className="emblem-strip">
            <span>⚖️</span>
            <span className="emblem-text">Rajampet Police Department — Serving & Protecting</span>
            <span>🛡️</span>
          </div>

          {/* ── Search ── */}
          <div className="search-container">
            <label className="search-label">Search Complaints</label>
            <input
              type="text"
              placeholder="Enter title or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-box"
            />
          </div>

          {/* ── Stats ── */}
          <div className="row g-3 text-center mb-3">
            <div className="col-4">
              <div className="card dashboard-card total-card">
                <div className="card-body p-3">
                  <h6 style={{ fontSize: "12px", marginBottom: "4px" }}>Total</h6>
                  <h3>{complaints.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card dashboard-card pending-card">
                <div className="card-body p-3">
                  <h6 style={{ fontSize: "12px", marginBottom: "4px" }}>Pending</h6>
                  <h3>{pending.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card dashboard-card solved-card">
                <div className="card-body p-3">
                  <h6 style={{ fontSize: "12px", marginBottom: "4px" }}>Solved</h6>
                  <h3>{solved.length}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* ── Pending ── */}
          <h3 className="section-title">Pending Complaints</h3>
          {pending.length === 0 && <p className="text-center">No pending complaints</p>}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mb-3">
            {pending.map(c => (
              <div key={c._id} className="col">
                <div className="card complaint-card h-100">
                  <div className="card-body">
                    <div className="complaint-title-box">{c.title || c.category}</div>
                    <p className="card-text">{c.description}</p>
                    <p><b>Category:</b> {c.category}</p>
                    <p><b>Submitted:</b> {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}</p>
                    <p>
                      <b>Status:</b>
                      <span className="badge bg-danger ms-2">Pending</span>
                    </p>
                    <button
                      className="btn btn-success solve-btn w-100"
                      onClick={() => markSolved(c._id)}
                    >
                      ✅ Mark as Solved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Solved ── */}
          <h3 className="section-title mt-2">Solved Complaints</h3>
          {solved.length === 0 && <p className="text-center">No solved complaints</p>}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mb-4">
            {solved.map(c => (
              <div key={c._id} className="col">
                <div className="card complaint-card solved h-100">
                  <div className="card-body">
                    <div className="complaint-title-box">{c.title || c.category}</div>
                    <p className="card-text">{c.description}</p>
                    <p><b>Category:</b> {c.category}</p>
                    <p><b>Submitted:</b> {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}</p>
                    <p>
                      <b>Status:</b>
                      <span className="badge bg-success ms-2">Solved</span>
                    </p>
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

export default AdminDashboard;
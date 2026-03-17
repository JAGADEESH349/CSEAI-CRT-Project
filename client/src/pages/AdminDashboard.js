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
    .catch(err => console.log(err));
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

  // FIX: Use optional chaining c.title?.toLowerCase() to prevent crash when title is undefined
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
        <div className="container mt-4">

          {/* ===== Police Header ===== */}
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

          {/* ===== Emblem Strip ===== */}
          <div className="emblem-strip">
            <span>⚖️</span>
            <span className="emblem-text">Rajampet Police Department — Serving & Protecting</span>
            <span>🛡️</span>
          </div>

          {/* ===== Search Section ===== */}
          <div className="search-container">
            <label className="search-label">Search for Complaints</label>
            <input
              type="text"
              placeholder="Enter complaint title or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-box"
            />
          </div>

          {/* ===== Statistics ===== */}
          <div className="row g-4 text-center mb-4">
            <div className="col-md-4">
              <div className="card dashboard-card total-card">
                <div className="card-body">
                  <h6>Total Complaints</h6>
                  <h3>{complaints.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card dashboard-card pending-card">
                <div className="card-body">
                  <h6>Pending Complaints</h6>
                  <h3>{pending.length}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card dashboard-card solved-card">
                <div className="card-body">
                  <h6>Solved Complaints</h6>
                  <h3>{solved.length}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* ===== Pending Complaints ===== */}
          <h3 className="section-title">Pending Complaints</h3>
          {pending.length === 0 && (
            <p className="text-center">No pending complaints</p>
          )}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
            {pending.map(c => (
              <div key={c._id} className="col">
                <div className="card complaint-card h-100">
                  <div className="card-body">
                    <div className="complaint-title-box">{c.title || c.category}</div>
                    <p className="card-text">{c.description}</p>
                    <p><b>Category:</b> {c.category}</p>
                    <p><b>Submitted:</b> {c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A"}</p>
                    <p>
                      <b>Status:</b>
                      <span className="badge bg-danger ms-2">Pending</span>
                    </p>
                    <button
                      className="btn btn-success solve-btn"
                      onClick={() => markSolved(c._id)}
                    >
                      Mark as Solved
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== Solved Complaints ===== */}
          <h3 className="section-title mt-3">Solved Complaints</h3>
          {solved.length === 0 && (
            <p className="text-center">No solved complaints</p>
          )}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
            {solved.map(c => (
              <div key={c._id} className="col">
                <div className="card complaint-card solved h-100">
                  <div className="card-body">
                    <div className="complaint-title-box">{c.title || c.category}</div>
                    <p className="card-text">{c.description}</p>
                    <p><b>Category:</b> {c.category}</p>
                    <p><b>Submitted:</b> {c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A"}</p>
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
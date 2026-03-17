import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield, FaClipboardList, FaClock, FaCheckCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch]         = useState("");
  const [loading, setLoading]       = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_URL}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => { setComplaints(res.data); setLoading(false); })
    .catch(err => {
      setLoading(false);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.clear(); window.location.href = "/";
      }
    });
  }, []);

  const markSolved = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`${API_URL}/complaints/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(prev => prev.map(c => c._id === id ? { ...c, status: "Solved" } : c));
    } catch (err) {
      console.log(err);
    }
  };

  const filtered = complaints.filter(c =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase()) ||
    c.studentName?.toLowerCase().includes(search.toLowerCase())
  );

  const pending = filtered.filter(c => c.status === "Pending");
  const solved  = filtered.filter(c => c.status === "Solved");
  const total   = complaints.length;

  return (
    <div className="adm-page">

      {/* ── Hero Header ── */}
      <div className="adm-hero">
        <div className="adm-hero-inner">
          <div className="adm-hero-left">
            <div className="adm-hero-icon-wrap">
              <FaUserShield className="adm-hero-icon" />
            </div>
            <div>
              <h1 className="adm-hero-title">Rajampet Police</h1>
              <p className="adm-hero-sub">Complaint Management Dashboard</p>
            </div>
          </div>
          <div className="adm-hero-badge">
            <span>⚖️</span>
            <span className="adm-hero-badge-text">Serving & Protecting</span>
          </div>
        </div>
      </div>

      <div className="adm-body">

        {/* ── Stats ── */}
        <div className="adm-stats">
          <div className="adm-stat-card adm-stat-blue">
            <div className="adm-stat-top">
              <FaClipboardList className="adm-stat-icon" />
              <span className="adm-stat-label">Total</span>
            </div>
            <div className="adm-stat-number">{loading ? "—" : total}</div>
          </div>
          <div className="adm-stat-card adm-stat-orange">
            <div className="adm-stat-top">
              <FaClock className="adm-stat-icon" />
              <span className="adm-stat-label">Pending</span>
            </div>
            <div className="adm-stat-number">{loading ? "—" : complaints.filter(c => c.status === "Pending").length}</div>
          </div>
          <div className="adm-stat-card adm-stat-green">
            <div className="adm-stat-top">
              <FaCheckCircle className="adm-stat-icon" />
              <span className="adm-stat-label">Solved</span>
            </div>
            <div className="adm-stat-number">{loading ? "—" : complaints.filter(c => c.status === "Solved").length}</div>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="adm-search-wrap">
          <FaSearch className="adm-search-icon" />
          <input
            className="adm-search-input"
            type="text"
            placeholder="Search by name, category, title…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* ── Quick Nav ── */}
        <div className="adm-quick-nav">
          <button className="adm-qnav-btn adm-qnav-blue"  onClick={() => navigate("/admin/complaints")}>📋 All Complaints</button>
          <button className="adm-qnav-btn adm-qnav-orange" onClick={() => navigate("/admin/complaints?status=pending")}>⏳ Pending</button>
          <button className="adm-qnav-btn adm-qnav-green"  onClick={() => navigate("/admin/complaints?status=solved")}>✅ Solved</button>
          <button className="adm-qnav-btn adm-qnav-purple" onClick={() => navigate("/admin/stats")}>📊 Stats</button>
        </div>

        {/* ── Pending Complaints ── */}
        <div className="adm-section-header">
          <div className="adm-section-dot adm-dot-orange" />
          <h2 className="adm-section-title">Pending Complaints</h2>
          <span className="adm-section-count">{pending.length}</span>
        </div>

        {loading && <div className="adm-loading">Loading…</div>}

        {!loading && pending.length === 0 && (
          <div className="adm-empty">
            <span>🎉</span>
            <p>No pending complaints!</p>
          </div>
        )}

        <div className="adm-cards-grid">
          {pending.map(c => (
            <div key={c._id} className="adm-card adm-card-pending">
              <div className="adm-card-top">
                <span className="adm-card-category">{c.category}</span>
                <span className="adm-card-badge adm-badge-pending">⏳ Pending</span>
              </div>
              <div className="adm-card-title">{c.title || c.category}</div>
              {c.studentName && (
                <div className="adm-card-meta">
                  <span>👤 {c.studentName}</span>
                  {c.rollNumber && <span>🎓 {c.rollNumber}</span>}
                </div>
              )}
              {c.description && (
                <p className="adm-card-desc">
                  {c.description.length > 100 ? c.description.slice(0, 100) + "…" : c.description}
                </p>
              )}
              <div className="adm-card-footer">
                <span className="adm-card-date">
                  🕐 {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}
                </span>
                <button className="adm-solve-btn" onClick={() => markSolved(c._id)}>
                  ✅ Mark Solved
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Solved Complaints ── */}
        <div className="adm-section-header" style={{ marginTop: "32px" }}>
          <div className="adm-section-dot adm-dot-green" />
          <h2 className="adm-section-title">Solved Complaints</h2>
          <span className="adm-section-count adm-count-green">{solved.length}</span>
        </div>

        {!loading && solved.length === 0 && (
          <div className="adm-empty">
            <span>📭</span>
            <p>No solved complaints yet.</p>
          </div>
        )}

        <div className="adm-cards-grid">
          {solved.map(c => (
            <div key={c._id} className="adm-card adm-card-solved">
              <div className="adm-card-top">
                <span className="adm-card-category adm-category-green">{c.category}</span>
                <span className="adm-card-badge adm-badge-solved">✅ Solved</span>
              </div>
              <div className="adm-card-title adm-title-green">{c.title || c.category}</div>
              {c.studentName && (
                <div className="adm-card-meta">
                  <span>👤 {c.studentName}</span>
                  {c.rollNumber && <span>🎓 {c.rollNumber}</span>}
                </div>
              )}
              {c.description && (
                <p className="adm-card-desc">
                  {c.description.length > 100 ? c.description.slice(0, 100) + "…" : c.description}
                </p>
              )}
              <div className="adm-card-footer">
                <span className="adm-card-date">
                  🕐 {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}
                </span>
                <button
                  className="adm-view-btn"
                  onClick={() => navigate("/admin/complaints?status=solved")}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
import API_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserShield, FaClipboardList, FaClock, FaCheckCircle } from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "../styles/dashboard.css";

function AdminStats() {
  const [complaints, setComplaints] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${API_URL}/complaints`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setComplaints(res.data))
    .catch(err => {
      console.log(err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.clear(); window.location.href = "/";
      }
    });
  }, []);

  const pending = complaints.filter(c => c.status === "Pending");
  const solved  = complaints.filter(c => c.status === "Solved");

  const barData = [
    { name: "Total",   "Total":   complaints.length },
    { name: "Pending", "Pending": pending.length },
    { name: "Solved",  "Solved":  solved.length },
  ];

  const pieData = [
    { name: "Pending", value: pending.length },
    { name: "Solved",  value: solved.length },
  ];
  const PIE_COLORS = ["#F59E0B", "#10B981"];

  const recentComplaints = [...complaints]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  const categoryMap = {};
  complaints.forEach(c => {
    categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
  });
  const categoryData = Object.entries(categoryMap).map(([name, count]) => ({ name, count }));

  return (
    <div className="adm-page">

      {/* ✅ Hero header — consistent with AdminDashboard */}
      <div className="adm-hero">
        <div className="adm-hero-inner">
          <div className="adm-hero-left">
            <div className="adm-hero-icon-wrap">
              <FaUserShield className="adm-hero-icon" />
            </div>
            <div>
              <h1 className="adm-hero-title">Dashboard Stats</h1>
              <p className="adm-hero-sub">Overview of all complaints</p>
            </div>
          </div>
          <div className="adm-hero-badge">
            <span>📊</span>
            <span className="adm-hero-badge-text">Analytics</span>
          </div>
        </div>
      </div>

      <div className="adm-body">

        {/* ✅ Stat cards — CSS grid, no Bootstrap col-4 */}
        <div className="adm-stats">
          <div className="adm-stat-card adm-stat-blue">
            <div className="adm-stat-top">
              <FaClipboardList className="adm-stat-icon" />
              <span className="adm-stat-label">Total</span>
            </div>
            <div className="adm-stat-number">{complaints.length}</div>
          </div>
          <div className="adm-stat-card adm-stat-orange">
            <div className="adm-stat-top">
              <FaClock className="adm-stat-icon" />
              <span className="adm-stat-label">Pending</span>
            </div>
            <div className="adm-stat-number">{pending.length}</div>
          </div>
          <div className="adm-stat-card adm-stat-green">
            <div className="adm-stat-top">
              <FaCheckCircle className="adm-stat-icon" />
              <span className="adm-stat-label">Solved</span>
            </div>
            <div className="adm-stat-number">{solved.length}</div>
          </div>
        </div>

        {/* Charts */}
        {isMobile ? (
          // Mobile: stacked charts
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px" }}>
            <div className="panel-card">
              <div className="panel-header">
                <span>📊</span>
                <h5>Complaint Statistics</h5>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="Total"   fill="#3B82F6" radius={[4,4,0,0]} />
                  <Bar dataKey="Pending" fill="#F59E0B" radius={[4,4,0,0]} />
                  <Bar dataKey="Solved"  fill="#10B981" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="panel-card">
              <div className="panel-header">
                <span>🥧</span>
                <h5>Status Ratio</h5>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={40} outerRadius={65}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={PIE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="panel-card">
              <div className="panel-header">
                <span>📂</span>
                <h5>By Category</h5>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 9 }} width={80} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366F1" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          // Desktop: side by side
          <div className="row g-4 mb-4">
            <div className="col-lg-5">
              <div className="panel-card">
                <div className="panel-header">
                  <span>📊</span>
                  <h5>Complaint Statistics</h5>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total"   fill="#3B82F6" radius={[4,4,0,0]} />
                    <Bar dataKey="Pending" fill="#F59E0B" radius={[4,4,0,0]} />
                    <Bar dataKey="Solved"  fill="#10B981" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="panel-card">
                <div className="panel-header">
                  <span>🥧</span>
                  <h5>Status Ratio</h5>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%" cy="50%"
                      innerRadius={50} outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={PIE_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="panel-card">
                <div className="panel-header">
                  <span>📂</span>
                  <h5>By Category</h5>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="4 4" stroke="#E2E8F0" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={65} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366F1" radius={[0,4,4,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Recent Complaints Table — scrollable on mobile */}
        <div className="panel-card mb-4">
          <div className="panel-header">
            <span>👤</span>
            <h5>Recent Complaints</h5>
          </div>
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table className="complaints-table" style={{ minWidth: "480px" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentComplaints.map((c, i) => (
                  <tr key={c._id}>
                    <td>{101 + i}</td>
                    <td>{c.title || "—"}</td>
                    <td>{c.category}</td>
                    <td>
                      <span className={`status-badge ${c.status === "Solved" ? "badge-solved" : "badge-pending"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminStats;
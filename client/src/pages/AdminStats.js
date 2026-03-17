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
    .catch(err => console.log(err));
  }, []);

  const pending = complaints.filter(c => c.status === "Pending");
  const solved  = complaints.filter(c => c.status === "Solved");

  const barData = [
    { name: "Total",   "Total": complaints.length },
    { name: "Pending", "Pending": pending.length },
    { name: "Solved",  "Solved": solved.length },
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
    <div className="dashboard-page">
      <div className="admin-panel container-fluid">
        <div className="container mt-2">

          {/* Header */}
          <div className="police-header-bar mb-3">
            <div className="header-left">
              <FaUserShield className="police-icon" />
              <div>
                <h2 className="police-title">Dashboard Stats</h2>
                <p className="dashboard-subtitle">Overview of all complaints</p>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="row g-3 mb-3">
            <div className="col-4">
              <div className="stat-card total-card">
                <div className="stat-left">
                  <FaClipboardList className="stat-icon" />
                  <span className="stat-label" style={{ fontSize: isMobile ? "11px" : "13px" }}>Total</span>
                </div>
                <span className="stat-number">{complaints.length}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="stat-card pending-card">
                <div className="stat-left">
                  <FaClock className="stat-icon" />
                  <span className="stat-label" style={{ fontSize: isMobile ? "11px" : "13px" }}>Pending</span>
                </div>
                <span className="stat-number">{pending.length}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="stat-card solved-card">
                <div className="stat-left">
                  <FaCheckCircle className="stat-icon" />
                  <span className="stat-label" style={{ fontSize: isMobile ? "11px" : "13px" }}>Solved</span>
                </div>
                <span className="stat-number">{solved.length}</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          {isMobile ? (
            // Mobile: stacked charts
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px" }}>
              {/* Bar chart */}
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

              {/* Pie chart */}
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

          {/* Recent Complaints Table */}
          <div className="panel-card mb-4">
            <div className="panel-header">
              <span>👤</span>
              <h5>Recent Complaints</h5>
            </div>
            <div className="table-responsive">
              <table className="complaints-table">
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
    </div>
  );
}

export default AdminStats;
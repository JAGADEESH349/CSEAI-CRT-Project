import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/dashboard.css";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
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
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase());
    if (statusFilter === "pending") return c.status === "Pending" && matchSearch;
    if (statusFilter === "solved") return c.status === "Solved" && matchSearch;
    return matchSearch;
  });

  const title = statusFilter === "pending"
    ? "Pending Complaints"
    : statusFilter === "solved"
    ? "Solved Complaints"
    : "All Complaints";

  return (
    <div className="dashboard-page">
      <div className="admin-panel container-fluid">
        <div className="container mt-4">

          <h3 className="section-title">{title}</h3>

          <div className="search-container">
            <label className="search-label">Search Complaints</label>
            <input
              type="text"
              placeholder="Enter complaint title or category..."
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
                    <div className="complaint-title-box">{c.title}</div>
                    <p className="card-text">{c.description}</p>
                    <p><b>Category:</b> {c.category}</p>
                    <p><b>Submitted:</b> {c.createdAt ? new Date(c.createdAt).toLocaleString() : "N/A"}</p>
                    <p>
                      <b>Status:</b>
                      <span className={`badge ms-2 ${c.status === "Solved" ? "bg-success" : "bg-danger"}`}>
                        {c.status}
                      </span>
                    </p>
                    {c.status === "Pending" && (
                      <button className="btn btn-success solve-btn" onClick={() => markSolved(c._id)}>
                        Mark as Solved
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
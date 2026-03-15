import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/myComplaints.css";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    axios.get(
      "http://localhost:5000/complaints",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      setComplaints(res.data);
    })
    .catch(err => {
      console.log(err);
    });

  }, [navigate]);



  const startEdit = (c) => {

    setEditingId(c._id);

    setEditTitle(c.title);
    setEditDescription(c.description);
    setEditCategory(c.category);

  };



  const saveEdit = async (id) => {

    const token = localStorage.getItem("token");

    try {

      const res = await axios.patch(
        `http://localhost:5000/complaints/${id}/update`,
        {
          title: editTitle,
          description: editDescription,
          category: editCategory
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComplaints(
        complaints.map(c =>
          c._id === id ? res.data : c
        )
      );

      setEditingId(null);

    } catch(err) {
      console.log(err);
    }

  };



  return (

    <div className="mycomplaints-container">

      <h2 className="mycomplaints-title">
        My Complaints
      </h2>



      {/* EDIT POPUP */}

      {editingId && (

        <div className="edit-overlay">

          <div className="edit-card">

            <h3>Edit Complaint</h3>

            <label className="edit-label">
              Complaint Title
            </label>

            <input
              className="edit-input"
              value={editTitle}
              onChange={(e)=>setEditTitle(e.target.value)}
            />

            <label className="edit-label">
              Category
            </label>

            <select
              className="edit-input"
              value={editCategory}
              onChange={(e)=>setEditCategory(e.target.value)}
            >
              <option value="Ragging">Ragging</option>
              <option value="Harassment">Harassment</option>
              <option value="Theft">Theft</option>
              <option value="Cybercrime">Cybercrime</option>
              <option value="Other">Other</option>
            </select>

            <label className="edit-label">
              Your Complaint
            </label>

            <textarea
              className="edit-textarea"
              value={editDescription}
              onChange={(e)=>setEditDescription(e.target.value)}
            />

            <div className="edit-buttons">

              <button
                className="save-btn"
                onClick={()=>saveEdit(editingId)}
              >
                Save Changes
              </button>

              <button
                className="cancel-btn"
                onClick={()=>setEditingId(null)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}



      {/* GRID */}

      <div className="mycomplaints-grid">

        {complaints.map((c) => (

          <div key={c._id} className="complaint-card">

            <div className="complaint-title">
              Complaint Title:
              <p className="text-danger">{c.title}</p>
            </div>

            <div className="complaint-meta">

              <span>
                <strong>Category:</strong>
                <p className="text-warning">{c.category}</p>
              </span>

              <span>
                <strong>Submitted:</strong>{" "}
                {c.createdAt
                  ? new Date(c.createdAt).toLocaleString()
                  : "N/A"}
              </span>

              <div className="complaint-status">

                <span className="status-label">
                  Status
                </span>

                <span
                  className={`status-badge ${
                    c.status === "Solved"
                      ? "status-solved"
                      : "status-pending"
                  }`}
                >
                  {c.status}
                </span>

              </div>

            </div>

            <div className="complaint-description">

              <strong>Your Complaint:</strong>

              <p>{c.description}</p>

            </div>

            {c.status !== "Solved" && (

              <button
                className="edit-btn"
                onClick={()=>startEdit(c)}
              >
                Edit Complaint
              </button>

            )}

          </div>

        ))}

      </div>

    </div>

  );

}

export default MyComplaints;
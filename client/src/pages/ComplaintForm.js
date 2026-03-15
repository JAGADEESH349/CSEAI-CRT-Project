import { useState } from "react";
import axios from "axios";
import "../styles/complaint.css";

function ComplaintForm() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/complaints",
      {
        title,
        description,
        category
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Complaint submitted successfully");

  } 
  catch (error) {

    console.error(error);
    alert("Failed to submit complaint");

  }

};

  return (

    <div className="complaint-container">

      <div className="complaint-card">

        <h2 className="complaint-title">
          Submit Complaint
        </h2>

        <input
          type="text"
          placeholder="Complaint Title"
          className="complaint-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="complaint-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Ragging">Ragging</option>
          <option value="Harassment">Harassment</option>
          <option value="Theft">Theft</option>
          <option value="Cybercrime">Cybercrime</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          rows="4"
          placeholder="Describe the issue"
          className="complaint-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="complaint-btn"
          onClick={handleSubmit}
        >
          Submit Complaint
        </button>

      </div>

    </div>

  );
}

export default ComplaintForm;
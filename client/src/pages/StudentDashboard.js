import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaSearch } from "react-icons/fa";
import "../styles/studentDashboard.css";

function StudentDashboard() {

  const navigate = useNavigate();

  return (

    <div className="student-container">

      <h2 className="student-title">
        Student Dashboard
      </h2>

      <div className="student-grid">

        {/* Submit Complaint */}

        <div
          className="student-card"
          onClick={() => navigate("/submit")}
        >

          <FaClipboardList className="student-icon"/>

          <h3>Submit Complaint</h3>

          <p>
            Report any safety issue or concern
            directly to campus police.
          </p>

        </div>

        {/* View Complaints */}

        <div
          className="student-card"
          onClick={() => navigate("/my-complaints")}
        >

          <FaSearch className="student-icon"/>

          <h3>My Complaints</h3>

          <p>
            Track the status of complaints
            you have submitted.
          </p>

        </div>

      </div>

    </div>

  );
}

export default StudentDashboard;
import { Link } from "react-router-dom";
import { FaUser, FaShieldAlt, FaClipboardList } from "react-icons/fa";

function Sidebar() {
  return (
    <div
      className="text-white p-3"
      style={{
        height: "100vh",
        width: "230px",
        background: "#0f172a"
      }}
    >
      <h4
        className="mb-4 text-center"
        style={{ color: "#fbbf24", fontWeight: "bold" }}
      >
        Campus Police
      </h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            style={{ display: "flex", alignItems: "center" }}
            to="/student"
          >
            <FaUser className="me-2" />
            Student Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            style={{ display: "flex", alignItems: "center" }}
            to="/complaint"
          >
            <FaClipboardList className="me-2" />
            Submit Complaint
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link
            className="nav-link text-white"
            style={{ display: "flex", alignItems: "center" }}
            to="/my-complaints"
          >
            <FaClipboardList className="me-2" />
            My Complaints
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link text-white"
            style={{ display: "flex", alignItems: "center" }}
            to="/admin"
          >
            <FaShieldAlt className="me-2" />
            Police Dashboard
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
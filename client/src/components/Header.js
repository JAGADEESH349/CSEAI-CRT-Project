import { FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between px-4"
      style={{
        height: "60px",
        background: "#1e3a8a",
        color: "white"
      }}
    >

      {/* Logo + Title */}

      <div className="d-flex align-items-center">

        <FaShieldAlt
          size={28}
          style={{ marginRight: "10px", color: "#fbbf24" }}
        />

        <h5 className="m-0">
          Campus Police Complaint Portal
        </h5>

      </div>

      {/* Right side */}

      <div className="d-flex align-items-center">

        <span style={{ fontSize: "14px", marginRight: "15px" }}>
          Rajampet Police Department
        </span>

        <button
          className="btn btn-warning btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Header;
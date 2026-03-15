import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container">

        <span className="navbar-brand">Campus Safety Portal</span>

        <div className="navbar-nav">

          <Link className="nav-link" to="/student">
            Student Dashboard
          </Link>

          <Link className="nav-link" to="/complaint">
            Submit Complaint
          </Link>

          <Link className="nav-link" to="/my-complaints">
            My Complaints
          </Link>

          <Link className="nav-link" to="/admin">
            Police Dashboard
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
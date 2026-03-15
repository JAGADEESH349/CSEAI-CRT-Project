import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import StudentNavbar from "./components/StudentNavbar";
import AdminNavbar from "./components/AdminNavbar";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ComplaintForm from "./pages/ComplaintForm";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminStats from "./pages/AdminStats";

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const renderNavbar = () => {
    if (path === "/") return null;
    if (path.startsWith("/admin")) return <AdminNavbar />;
    return <StudentNavbar />;
  };

  return (
    <>
      {renderNavbar()}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/submit" element={<ComplaintForm />} />
        <Route path="/my-complaints" element={<MyComplaints />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route path="/admin/stats" element={<AdminStats />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import StudentNavbar from "./components/StudentNavbar";
import AdminNavbar from "./components/AdminNavbar";
import StudentFooter from "./components/StudentFooter";
import AdminFooter from "./components/AdminFooter";
import Landing from "./pages/Landing";
import StudentLogin from "./pages/StudentLogin";
import PoliceLogin from "./pages/PoliceLogin";
import StudentDashboard from "./pages/StudentDashboard";
import ComplaintForm from "./pages/ComplaintForm";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminStats from "./pages/AdminStats";
import AboutUs from "./pages/AboutUs";
import StudentAboutUs from "./pages/StudentAboutUs";
import CategorySelect from "./pages/CategorySelect";

function ProtectedRoute({ allowedRole, children }) {
  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role");
  if (!token) return <Navigate to="/" replace />;
  if (role !== allowedRole) return <Navigate to="/" replace />;
  return children;
}

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const isPublic  = path === "/" || path === "/login/student" || path === "/login/police";
  const isAdmin   = path.startsWith("/admin");
  const isStudent = !isPublic && !isAdmin;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!isPublic && (isAdmin ? <AdminNavbar /> : <StudentNavbar />)}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/"               element={<Landing />} />
          <Route path="/login/student"  element={<StudentLogin />} />
          <Route path="/login/police"   element={<PoliceLogin />} />

          <Route path="/student"          element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/submit"           element={<ProtectedRoute allowedRole="student"><CategorySelect /></ProtectedRoute>} />
          <Route path="/submit/:category" element={<ProtectedRoute allowedRole="student"><ComplaintForm /></ProtectedRoute>} />
          <Route path="/my-complaints"    element={<ProtectedRoute allowedRole="student"><MyComplaints /></ProtectedRoute>} />
          <Route path="/about"            element={<ProtectedRoute allowedRole="student"><StudentAboutUs /></ProtectedRoute>} />

          <Route path="/admin"            element={<ProtectedRoute allowedRole="police"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/complaints" element={<ProtectedRoute allowedRole="police"><AdminComplaints /></ProtectedRoute>} />
          <Route path="/admin/stats"      element={<ProtectedRoute allowedRole="police"><AdminStats /></ProtectedRoute>} />
          <Route path="/admin/about"      element={<ProtectedRoute allowedRole="police"><AboutUs /></ProtectedRoute>} />
        </Routes>
      </div>
      {isAdmin   && <AdminFooter />}
      {isStudent && <StudentFooter />}
    </div>
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
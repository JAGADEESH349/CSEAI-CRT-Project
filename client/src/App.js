import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import StudentNavbar from "./components/StudentNavbar";
import AdminNavbar from "./components/AdminNavbar";
import StudentFooter from "./components/StudentFooter";
import AdminFooter from "./components/AdminFooter";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ComplaintForm from "./pages/ComplaintForm";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminStats from "./pages/AdminStats";
import AboutUs from "./pages/AboutUs";
import StudentAboutUs from "./pages/StudentAboutUs";
import CategorySelect from "./pages/CategorySelect";

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const isLogin  = path === "/";
  const isAdmin  = path.startsWith("/admin");
  const isStudent = !isLogin && !isAdmin;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      {/* Navbar */}
      {!isLogin && (isAdmin ? <AdminNavbar /> : <StudentNavbar />)}

      {/* Page content grows to fill available space */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Student Routes */}
          <Route path="/student"           element={<StudentDashboard />} />
          <Route path="/submit"            element={<CategorySelect />} />
          <Route path="/submit/:category"  element={<ComplaintForm />} />
          <Route path="/my-complaints"     element={<MyComplaints />} />
          <Route path="/about"             element={<StudentAboutUs />} />

          {/* Admin Routes */}
          <Route path="/admin"             element={<AdminDashboard />} />
          <Route path="/admin/complaints"  element={<AdminComplaints />} />
          <Route path="/admin/stats"       element={<AdminStats />} />
          <Route path="/admin/about"       element={<AboutUs />} />
        </Routes>
      </div>

      {/* Footer — only shown when logged in */}
      {isAdmin  && <AdminFooter />}
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
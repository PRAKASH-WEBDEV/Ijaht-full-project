import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ResetPassword from "./components/Login/ResetPassword";
import AdminDashboard from "./Pages/AdminDashboard";
import BoardMembers from "./Pages/BoardMembers";
import ReviewerContent from "./Pages/ReviewerContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/board-members" element={<BoardMembers />} />
      <Route path="/admin/reviewer-content" element={<ReviewerContent />} />
    </Routes>
  );
}

export default App;

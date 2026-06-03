import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ResetPassword from "./components/Login/ResetPassword";
import AdminDashboard from "./Pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Login />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;

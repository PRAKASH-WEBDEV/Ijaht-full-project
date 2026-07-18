import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaFileAlt,
  FaSignOutAlt,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Pages/AdminDashboard.css";
import "./AdminLayout.css";

const navItems = [
  { label: "Manuscripts", path: "/admin-dashboard", icon: <FaFileAlt /> },
  { label: "Board Members", path: "/admin/board-members", icon: <FaUsers /> },
  { label: "Reviewer Content", path: "/admin/reviewer-content", icon: <FaUserEdit /> },
];

/**
 * Shared shell (sidebar + topbar) for the CMS admin pages. Reuses the dashboard
 * styling so the new content-management screens stay visually consistent.
 */
const AdminLayout = ({ eyebrow, title, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Guard: send unauthenticated users back to the login screen.
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const go = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <div className="admin-shell">
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand-block">
          <div className="brand-mark">IJ</div>
          <div>
            <h1>IJAHT</h1>
            <p>Editorial Admin</p>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => go(item.path)}
              type="button"
            >
              <span>
                {item.icon}
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <button className="logout-button" onClick={logout} type="button">
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-title">
            <button
              className="menu-button"
              onClick={() => setSidebarOpen(true)}
              type="button"
              aria-label="Open admin menu"
            >
              <FaBars />
            </button>
            <div>
              <span>{eyebrow}</span>
              <h2>{title}</h2>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

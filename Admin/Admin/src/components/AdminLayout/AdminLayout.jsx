import React, { useEffect, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBars,
  FaFileAlt,
  FaSignOutAlt,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import "../../Pages/AdminDashboard.css";
import "./AdminLayout.css";
import useSidebarCollapse from "../../hooks/useSidebarCollapse";

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
  const { collapsed, toggleCollapsed } = useSidebarCollapse();

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
    <div className={`admin-shell ${collapsed ? "collapsed" : ""}`}>
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand-block">
          <div className="brand-mark">IJ</div>
          <div className="brand-text">
            <h1>IJAHT</h1>
            <p>Editorial Admin</p>
          </div>
        </div>

        <button
          className="sidebar-collapse-btn"
          onClick={toggleCollapsed}
          type="button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>

        <nav className="admin-nav" aria-label="Admin navigation">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => go(item.path)}
              type="button"
              title={item.label}
            >
              <span>
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </span>
            </button>
          ))}
        </nav>

        <button className="logout-button" onClick={logout} type="button" title="Logout">
          <FaSignOutAlt />
          <span className="nav-label">Logout</span>
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
              <nav className="admin-breadcrumb" aria-label="Breadcrumb">
                <span>IJAHT</span>
                {eyebrow && (
                  <>
                    <span className="sep">/</span>
                    <span>{eyebrow}</span>
                  </>
                )}
                <span className="sep">/</span>
                <span className="current">{title}</span>
              </nav>
              <h2>{title}</h2>
            </div>
          </div>

          <div className="topbar-actions">
            <div className="admin-profile">
              <span className="avatar">A</span>
              <div className="who">
                <strong>Administrator</strong>
                <span>IJAHT</span>
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

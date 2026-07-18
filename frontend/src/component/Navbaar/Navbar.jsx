import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import ProfileDropdown from "../../Pages/Profile/ProfileDropdown";
import "./Navbar.css";
import copyrightFormPdf from "../../assets/copyright-pdf.pdf";
import subscriptionFormPdf from "../../assets/Subscription -pdf.pdf";
import { assetUrl } from "../../config/api";

const menuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Us",
    submenu: [
      { title: "Mission & Vision", path: "/about/mission" },
      { title: "Why Publish With Us?", path: "/about/why-publish" },
      { title: "Abstracting & Indexing", path: "/about/indexing" },
      { title: "Publisher", path: "/about/publisher" },
      { title: "Licenses", path: "/about/licenses" },
      { title: "Journal Policies", path: "/about/policies" },
    ],
  },
  {
    title: "Editorial Board",
    path: "/editorial-board",
  },
  {
    title: "Collaborations",
    submenu: [
      { title: "IHFA", path: "/collaborations/ihfa" },
      { title: "Physio Elite", path: "/collaborations/physio-elite" },
    ],
  },
  {
    title: "Manuscript Submission",
    submenu: [
      {
        title: "Instructions for Authors",
        path: "/submission/instructions-for-authors",
      },
      { title: "Manuscript Procedures", path: "/submission/manuscript-procedures" },
      { title: "Manuscript Assistance", path: "/submission/manuscript-assistance" },
      {
        title: "Copyright Form",
        download: copyrightFormPdf,
        fileName: "IJAHT-Copyright-Form.pdf",
      },
      {
        title: "Subscription Form",
        download: subscriptionFormPdf,
        fileName: "IJAHT-Subscription-Form.pdf",
      },
    ],
  },
  {
    title: "Reviewer",
    submenu: [
      { title: "Apply As Reviewer", path: "/reviewer/apply" },
      { title: "Instructions For Reviewer", path: "/reviewer/instructions" },
      { title: "Reviewers Acknowledgement", path: "/reviewer/acknowledgement" },
    ],
  },
  {
    title: "Issues",
    submenu: [
      { title: "Current Issue", path: "/issues/current" },
      { title: "Archives", path: "/issues/archive" },
    ],
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${
    user?.firstName || "U"
  }&background=0056b3&color=fff`;

  const toggleDropdown = (index) => {
    setOpenDropdown((current) => (current === index ? null : index));
  };

  const closeMobileMenu = () => {
    setShowMenu(false);
    setOpenDropdown(null);
    // Drop focus so the desktop dropdown (shown via :hover/:focus-within)
    // doesn't stay open after navigating through a submenu link.
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const openLogin = () => {
    closeMobileMenu();
    onLoginClick();
  };

  const openRegister = () => {
    closeMobileMenu();
    onRegisterClick();
  };

  return (
    <nav className="main-nav">
      <div className="nav-left">
        <button
          className="hamburger"
          onClick={() => {
            setShowMenu((current) => !current);
            setOpenDropdown(null);
          }}
          type="button"
          aria-label={showMenu ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={showMenu}
        >
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`nav-links ${showMenu ? "active-menu" : ""}`}>
        {menuItems.map((item, index) => (
          <div className="nav-item" key={item.title}>
            {item.submenu ? (
              <>
                <button
                  className="nav-title"
                  onClick={() => toggleDropdown(index)}
                  type="button"
                  aria-expanded={openDropdown === index}
                >
                  {item.title}
                  <span className="arrow">
                    {openDropdown === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>

                <div
                  className={`dropdown-menu ${
                    openDropdown === index ? "mobile-open" : ""
                  }`}
                >
                  {item.submenu.map((sub) => (
                    sub.download ? (
                      <a
                        key={sub.title}
                        href={sub.download}
                        download={sub.fileName}
                        onClick={closeMobileMenu}
                      >
                        {sub.title}
                      </a>
                    ) : (
                      <NavLink key={sub.path} to={sub.path} onClick={closeMobileMenu}>
                        {sub.title}
                      </NavLink>
                    )
                  ))}
                </div>
              </>
            ) : (
              <NavLink to={item.path} onClick={closeMobileMenu}>
                {item.title}
              </NavLink>
            )}
          </div>
        ))}

        <div className="mobile-auth">
          {!user ? (
            <>
              <button className="login-btn" onClick={openLogin} type="button">
                Log In
              </button>

              <button className="register-btn" onClick={openRegister} type="button">
                Register
              </button>
            </>
          ) : (
            <div className="mobile-profile-panel">
              <img
                src={
                  user?.avatar
                    ? assetUrl(user.avatar)
                    : fallbackAvatar
                }
                alt=""
                className="profile-avatar-img"
              />

              <div className="mobile-profile-info">
                <strong>
                  {user?.firstName || "User"} {user?.lastName || ""}
                </strong>
                <span>{user?.email}</span>
              </div>

              <div className="mobile-profile-actions">
                <NavLink to="/profile" onClick={closeMobileMenu}>
                  Edit Profile
                </NavLink>
                <button type="button" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="auth-buttons">
        {!user ? (
          <>
            <button className="login-btn" onClick={onLoginClick} type="button">
              Log In
            </button>

            <button className="register-btn" onClick={onRegisterClick} type="button">
              Register
            </button>
          </>
        ) : (
          <div
            className="profile-wrapper"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <img
              src={
                user?.avatar
                  ? assetUrl(user.avatar)
                  : fallbackAvatar
              }
              alt=""
              className="profile-avatar-img"
            />

            {showProfile && <ProfileDropdown user={user} logout={logout} />}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

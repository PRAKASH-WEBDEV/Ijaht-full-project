import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileDropdown.css";

const ProfileDropdown = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Professional fallback: Generates an avatar based on the user's name
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${user?.firstName || 'U'}&background=0056b3&color=fff&size=128`;
  const avatarSrc = user?.avatar ? `http://localhost:3000/${user.avatar}` : fallbackAvatar;

  return (
    <div className="profile-dropdown-card">
      <div className="profile-avatar-wrapper">
        <img
          src={avatarSrc}
          alt="User Avatar"
          className="dropdown-avatar"
          onError={(e) => {
            // Failsafe: If the backend image URL is broken, switch to fallback
            e.target.onerror = null; 
            e.target.src = fallbackAvatar;
          }}
        />

        <label htmlFor="avatarUpload" className="avatar-edit-icon">
          ✎
        </label>
        <input
          id="avatarUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          // onChange={(e) => handleUploadLogicHere(e)}
        />
      </div>

      <h3 className="dropdown-name">{user?.firstName || "User"} {user?.lastName || ""}</h3>
      <p className="dropdown-email">{user?.email}</p>

      <div className="dropdown-actions">
        <button
          className="dropdown-btn edit-btn"
          onClick={() => navigate("/profile")}
        >
          Edit Profile
        </button>

        <button className="dropdown-btn logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
import React, { useState, useEffect } from "react";
import "./Profile.css";
import { api, assetUrl } from "../../config/api";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // Clear out the password from the fetched data so we don't show the hash
        const userData = { ...res.data, password: "" };
        setUser(userData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        setLoading(false);
      });
  }, []);

  // Handle Avatar Upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setUploading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/api/user/upload-avatar", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
        },
      });
      
      const updatedUser = { ...user, avatar: res.data.avatar };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Update local storage for Navbar
      alert("Avatar updated!");
    } catch (err) {
      console.error(err);
      alert("Upload failed. Make sure your backend route '/api/user/upload-avatar' is working.");
    } finally {
      setUploading(false);
      // Reset the input value so the same file can be selected again if needed
      e.target.value = null; 
    }
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    
    // Create a copy of the user object to send to the backend
    const dataToSend = { ...user };
    // If the user didn't type a new password, don't send an empty string
    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    try {
      const res = await api.put("/api/user/profile", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update local storage so Navbar name changes instantly
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile saved successfully!");
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  if (loading) return <div className="loader">Loading Profile...</div>;

  return (
    <div className="profile-page-wrapper">
      <div className="profile-glass-card">
        <div className="profile-header">
          <div className="avatar-section">
            <img 
              src={user.avatar ? assetUrl(user.avatar) : `https://ui-avatars.com/api/?name=${user.firstName || 'User'}&background=0056b3&color=fff`} 
              alt="Profile" 
              className={uploading ? "blur" : ""}
            />
            {/* FIX: Changed 'hidden' to inline display none and added accept image */}
            <label htmlFor="avatar-input" className="pencil-icon">✎</label>
            <input 
              id="avatar-input" 
              type="file" 
              accept="image/*"
              style={{ display: "none" }} 
              onChange={handleAvatarChange} 
            />
          </div>
          <h2>Account Settings</h2>
          <p>Manage your public profile and personal information</p>
        </div>

        <div className="profile-grid">
          
          <div className="input-box animated">
            <label>Email Address</label>
            <input value={user.email || ""} disabled className="disabled-field" />
          </div>

          <div className="input-box animated">
            <label>Login Name</label>
            <input 
              value={user.loginName || ""} 
              onChange={(e) => setUser({...user, loginName: e.target.value})}
              placeholder="Enter login name"
            />
          </div>

          <div className="input-box animated">
            <label>First Name</label>
            <input 
              value={user.firstName || ""} 
              onChange={(e) => setUser({...user, firstName: e.target.value})}
              placeholder="Enter first name"
            />
          </div>

          <div className="input-box animated">
            <label>Last Name</label>
            <input 
              value={user.lastName || ""} 
              onChange={(e) => setUser({...user, lastName: e.target.value})}
              placeholder="Enter last name"
            />
          </div>

          <div className="input-box animated">
            <label>Mobile Number</label>
            <input 
              value={user.mobile || ""} 
              onChange={(e) => setUser({...user, mobile: e.target.value})}
              placeholder="Enter mobile number"
            />
          </div>

          <div className="input-box animated">
            <label>Qualification</label>
            <input 
              value={user.qualification || ""} 
              onChange={(e) => setUser({...user, qualification: e.target.value})}
              placeholder="e.g., Ph.D, M.Sc"
            />
          </div>

          <div className="input-box animated full">
            <label>Speciality / Interest</label>
            <input 
              value={user.interest || ""} 
              onChange={(e) => setUser({...user, interest: e.target.value})}
              placeholder="Enter your fields of interest"
            />
          </div>

          <div className="input-box animated full">
            <label>Address</label>
            <input 
              value={user.address || ""} 
              onChange={(e) => setUser({...user, address: e.target.value})}
              placeholder="Enter street address"
            />
          </div>

          <div className="input-box animated">
            <label>City</label>
            <input 
              value={user.city || ""} 
              onChange={(e) => setUser({...user, city: e.target.value})}
              placeholder="Enter city"
            />
          </div>

          <div className="input-box animated">
            <label>State</label>
            <input 
              value={user.state || ""} 
              onChange={(e) => setUser({...user, state: e.target.value})}
              placeholder="Enter state"
            />
          </div>

          <div className="input-box animated">
            <label>Country</label>
            <input 
              value={user.country || ""} 
              onChange={(e) => setUser({...user, country: e.target.value})}
              placeholder="Enter country"
            />
          </div>

          <div className="input-box animated">
            <label>Pincode</label>
            <input 
              value={user.pinCode || ""} 
              onChange={(e) => setUser({...user, pinCode: e.target.value})}
              placeholder="Enter postal code"
            />
          </div>

          <div className="input-box animated full">
            <label>Change Password</label>
            <input 
              type="password"
              value={user.password || ""} 
              onChange={(e) => setUser({...user, password: e.target.value})}
              placeholder="Leave blank to keep current password"
            />
          </div>

        </div>

        <div className="form-actions">
          <button className="main-save-btn" onClick={updateProfile}>
            Update Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

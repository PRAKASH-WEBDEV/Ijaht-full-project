import React, { useState } from "react";
import "../Login/Login.css";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../../config/api";

const RegisterPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/api/auth/register", formData);
      setLoading(false);
      onClose(); // close after success
      toast.success("Registration successful. Please login.");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>

        <div className="login-header">
          <span className="blue-bar-small"></span>
          <h2>Create Account</h2>
          <p>Join our journal platform</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              name="name"
              required
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-field">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="login-submit-btn" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPopup;

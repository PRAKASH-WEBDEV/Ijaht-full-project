import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom"; // Redirect ke liye import karein
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../../config/api";

const LoginPopup = ({ isOpen, onClose, onRegisterClick, onForgotPasswordClick }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // navigate function initialize karein

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setLoading(false);
      onClose();
      toast.success("Login successful. Welcome back!");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="login-header">
          <span className="blue-bar-small"></span>
          <h2>Sign In</h2>
          <p>Access your journal dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
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

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a
              href="#"
              className="forgot-pass"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                onForgotPasswordClick();
              }}
            >
              Forgot Password?
            </a>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login Now"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span
              className="register-link"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
                onRegisterClick();
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;

import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Login/Login.css";
import "./ResetPassword.css";
import { api } from "../../config/api";

const getResetErrorMessage = (message = "") => {
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("expired")) {
    return "Reset link expired. Request a new reset email.";
  }

  if (normalizedMessage.includes("invalid") || normalizedMessage.includes("token")) {
    return "Reset link invalid. Request a new reset email.";
  }

  return "Server error. Please try again.";
};

const ResetPassword = () => {
  const { token: routeToken } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryToken = searchParams.get("token");
  const token = queryToken || routeToken || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      setError("");
      setSuccess("");
      setTokenValid(false);
      setValidating(true);

      if (!token) {
        const message = "Reset link invalid. Request a new reset email.";
        setError(message);
        toast.error("Invalid token");
        setValidating(false);
        return;
      }

      try {
        await api.post("/api/auth/validate-reset-token", { token });
        setTokenValid(true);
      } catch (err) {
        const message = getResetErrorMessage(err.response?.data?.message);
        setError(message);
        toast.error(message.includes("expired") ? "Expired token" : "Invalid token");
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token || !tokenValid) {
      const message = "Reset link invalid. Request a new reset email.";
      setError(message);
      toast.error("Invalid token");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      toast.error("Password is required.");
      return;
    }

    if (password !== confirmPassword) {
      const message = "Password mismatch. Confirm password must match the new password.";
      setError(message);
      toast.error("Password mismatch");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/auth/reset-password", {
        token,
        password,
      });

      const message = res.data?.message || "Password updated successfully";
      setSuccess(`${message} Redirecting to login...`);
      toast.success("Password updated successfully");

      setTimeout(() => {
        navigate("/", { replace: true, state: { openLogin: true } });
      }, 1400);
    } catch (err) {
      const message = getResetErrorMessage(err.response?.data?.message);
      setError(message);
      toast.error(message.includes("expired") ? "Expired token" : message.includes("invalid") ? "Invalid token" : "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="reset-password-page">
      <section className="reset-password-panel">
        <div className="login-header">
          <span className="blue-bar-small"></span>
          <h2>Reset Password</h2>
          <p>Create a new password for your IJAHT account</p>
        </div>

        {validating && <p className="success-text">Validating reset link...</p>}

        {!validating && !tokenValid && (
          <div className="reset-password-message">
            {error && <p className="error-text">{error}</p>}
          </div>
        )}

        {!validating && tokenValid && (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="new-password">New Password</label>
              <div className="password-field">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  disabled={loading || Boolean(success)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading || Boolean(success)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="password-field">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={loading || Boolean(success)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  disabled={loading || Boolean(success)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading || Boolean(success)}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default ResetPassword;

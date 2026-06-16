import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { api } from "../../config/api";

const getTokenError = (err) => {
  const message = err?.response?.data?.message || "";

  if (message.toLowerCase().includes("expired")) {
    return "Expired token";
  }

  return "Invalid token";
};

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [validating, setValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validatedToken = useRef("");

  useEffect(() => {
    const validateToken = async () => {
      if (validatedToken.current === token) return;
      validatedToken.current = token;
      setError("");
      setIsTokenValid(false);
      setValidating(true);

      if (!token) {
        setError("Invalid token");
        toast.error("Invalid token");
        setValidating(false);
        return;
      }

      try {
        await api.post("/api/admin/validate-reset-token", { token });
        setIsTokenValid(true);
      } catch (err) {
        const message = getTokenError(err);
        setError(message);
        toast.error(message);
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!token || !isTokenValid) {
      setError("Invalid token");
      toast.error("Invalid token");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password mismatch");
      toast.error("Password mismatch");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/admin/reset-password", { token, password });
      toast.success("Password reset successfully.");
      navigate("/admin");
    } catch (err) {
      const message = getTokenError(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Reset Password</h1>
            <p>Create a new IJAHT admin dashboard password</p>
          </div>

          {validating && <div className="login-success">Validating reset link...</div>}

          {!validating && error && <div className="login-error">{error}</div>}

          {!validating && isTokenValid && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    minLength="6"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <div className="password-field">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    minLength="6"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {error && <div className="login-error">{error}</div>}

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

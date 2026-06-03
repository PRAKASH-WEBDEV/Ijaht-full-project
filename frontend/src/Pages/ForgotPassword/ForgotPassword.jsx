import React, { useState } from "react";
import "../Login/Login.css";
import { api } from "../../config/api";

const ForgotPasswordPopup = ({ isOpen, onClose, onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const requestResetLink = async () => {
    try {
      setLoading(true);
      setError("");
      await api.post("/api/auth/forgot-password", {
        email,
      });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const closeAndReset = () => {
    onClose();
    setStep(1);
    setEmail("");
    setError("");
  };

  const backToLogin = () => {
    closeAndReset();
    onBackToLogin?.();
  };

  return (
    <div className="modal-overlay" onClick={closeAndReset}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeAndReset}>
          &times;
        </button>

        <div className="login-header">
          <span className="blue-bar-small"></span>
          <h2>
            {step === 1 && "Forgot Password"}
            {step === 2 && "Check Your Email"}
          </h2>
          <p>
            {step === 1 && "Enter your registered email"}
            {step === 2 && "A password reset link has been sent if the email is valid."}
          </p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              className="login-input"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="login-submit-btn"
              onClick={requestResetLink}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="success-text">
              Please open the reset link from your email to create a new password.
            </p>
            <button
              className="login-submit-btn"
              onClick={backToLogin}
            >
              Back to Login
            </button>
          </>
        )}

        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;

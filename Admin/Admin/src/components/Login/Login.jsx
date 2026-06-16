import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { api } from "../../config/api";

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [message,setMessage] = useState("");
  const [mode,setMode] = useState("login");
  const [loading,setLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try{

      const res = await api.post("/api/admin/login", { email,password });

      if(res.data.token){

        localStorage.setItem("adminToken",res.data.token);

        navigate("/admin-dashboard");

      }

    }catch{

      setError("Invalid Email or Password. Access Denied.");

    }finally{

      setLoading(false);

    }

  }

  const handleForgotPassword = async (e)=>{
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try{

      const res = await api.post("/api/admin/forgot-password", { email });

      setMessage(res.data.message || "Password reset link sent if the email exists.");

    }catch(err){

      setError(err.response?.data?.message || "Unable to send reset link.");

    }finally{

      setLoading(false);

    }

  }

  return (

    <div className="login-bg">

      <div className="login-container">

        <div className="login-card">

          <div className="login-header">

            <h1>IJAHT Admin</h1>
            <p>Research Journal Control Panel</p>

          </div>

          <form onSubmit={mode === "login" ? handleLogin : handleForgotPassword}>

            <div className="form-group">

              <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              />

            </div>

            {mode === "login" && <div className="form-group">

              <div className="password-field">
                <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
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

            </div>}

            {error && <div className="login-error">{error}</div>}
            {message && <div className="login-success">{message}</div>}

            <button type="submit" className="login-btn">
              {loading
                ? "Please wait..."
                : mode === "login"
                  ? "Login to Dashboard"
                  : "Send Reset Link"}
            </button>

          </form>

          <div className="login-footer">

            <button
              type="button"
              onClick={() => {
                setError("");
                setMessage("");
                setMode(mode === "login" ? "forgot" : "login");
              }}
            >
              {mode === "login" ? "Forgot Password?" : "Back to Login"}
            </button>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Login;

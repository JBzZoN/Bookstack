import React, { useState } from "react";
import "./Login.css";

/* ==========================================================================
   Assets & Components
   ========================================================================== */
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

/**
 * Login Component
 * ==========================================================================
 * Handles user authentication and session creation.
 * 
 * Core Functionality:
 * P1. Captures user credentials (username/email and password).
 * 2. Authenticates against the backend API.
 * 3. Stores JWT token and user info in localStorage.
 * 4. Redirects based on user role (Member, Admin, Librarian).
 *
 * @component
 * @returns {JSX.Element} The login form page.
 */
function Login() {
  /* ==========================================================================
     State Management
     ========================================================================== */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /* ==========================================================================
     Event Handlers
     ========================================================================== */

  /**
   * Submits credentials to the backend for verification.
   * Handles API errors and role-based redirect logic.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    const normalizedUsername = email.trim();
    let response;

    try {
      // NOTE: Using direct axios call here as per original implementation.
      // Ideally, this should use the centralized API client found in other files.
      // Keeping consistent with existing logic for now to prevent regressions.
      response = await axios.post("http://localhost:7070/auth/login", {
        "username": normalizedUsername,
        "password": password
      });
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Invalid credentials. Please check your username and password.");
      return;
    }

    /* --- Session Handling --- */
    const data = response.data;
    console.log("Login Success:", data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", JSON.stringify(data));

    /* --- Role-Based Redirect --- */
    if (data.role === "Member") {
      navigate("/member/home");
    }
    else if (data.role === "Admin") {
      navigate("/admin/books");
    }
    else if (data.role === "Librarian") {
      navigate("/staff/books");
    }
    else {
      toast.error("Unknown user role. Please contact support.");
    }
  };

  /* ==========================================================================
     UI Render
     ========================================================================== */
  return (
    <main className="auth-wrapper">
      <div className="login-card">
        <div className="row g-0">

          {/* 
            ----------------------------------------------------------------
            Left Panel: Branding / Imagery
            Visible only on large screens.
            ---------------------------------------------------------------- 
          */}
          <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between img-panel">
            <div className="p-4 mt-5 d-flex flex-column mt-5 align-items-centre gap-2">
              <h2 className="font-montserrat">
                "A book is a dream that you hold in your hand."
              </h2>
              <p className="lead mt-3">– Neil Gaiman</p>
            </div>

            <div className="mt-5 m-5 mb-2 d-flex align-items-center gap-2">
              <img className="logo-img brand-logo" src={logo} alt="BookStack Logo" />
              <div className="logo-title brand-name">
                <span style={{ color: "#0a0d9f" }}>Book</span>
                <span style={{ color: "#111827" }}>Stack</span>
              </div>
            </div>
          </div>

          {/* 
            ----------------------------------------------------------------
            Right Panel: Login Form
            ---------------------------------------------------------------- 
          */}
          <div className="col-lg-6 form-panel">
            <h1 className="font-montserrat">Welcome Back!</h1>
            <p className="text-secondary mb-4">
              Please enter your details to sign in.
            </p>

            <form onSubmit={handleLogin}>

              {/* Username Input */}
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit Button */}
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-outline btn-lg">
                  Sign In
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Login;
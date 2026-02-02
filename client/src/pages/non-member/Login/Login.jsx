import React, { useState } from "react";
import "./Login.css";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // ⛔ VERY IMPORTANT

    const normalizedUsername = email.trim();
    let response;
    try {
          response = await axios.post("http://localhost:7070/auth/login", {"username": normalizedUsername, "password": password})
    }catch(e) {
      alert("Invalid credentials")
    }

    const data = response.data
    console.log(data)

    localStorage.setItem("token", data.token);
    localStorage.setItem("currentUser", JSON.stringify(data))

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
      
      alert("Invalid email");
    }
  };

  return (
    <main className="auth-wrapper">
      <div className="login-card">
        <div className="row g-0">

          {/* LEFT PANEL */}
          <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-between img-panel">
            <div className="p-4 mt-5 d-flex flex-column mt-5 align-items-centre gap-2">
              <h2 className="font-montserrat">
                "A book is a dream that you hold in your hand."
              </h2>
              <p className="lead mt-3">– Neil Gaiman</p>
            </div>
            <div className="mt-5 m-5 mb-2 d-flex align-items-center gap-2">
              <img className="logo-img" src={logo} alt="logo"/>
              <div className="logo-title">
                <span style={{ color: "#0a0d9f" }}>Book</span>
                <span style={{ color: "#111827" }}>Stack</span>
              </div>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div className="col-lg-6 form-panel">
            <h1 className="font-montserrat">Welcome Back!</h1>
            <p className="text-secondary mb-4">
              Please enter your details to sign in.
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

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
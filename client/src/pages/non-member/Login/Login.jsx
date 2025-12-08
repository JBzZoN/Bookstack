import { useState } from "react";
// import "./App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    if (email === "member@email.com") {
      navigate("/member/home");
    } 
    else if (email === "admin@email.com") {
      navigate("/admin/books");
    } 
    else if (email === "staff@email.com") {
      navigate("/staff/books");
    } 
    else {
      alert("Invalid email");
    }
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
  width: "100vw",            // full width
  minHeight: "90vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",   // correct scaling
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat"
}}

    >
      {/* Login Card */}
      <div
        className="card p-4 shadow"
        style={{
          width: "380px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="text-center mb-3">
          <h4 className="mt-2 fw-bold">Login</h4>
        </div>

        {/* Email input */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-light">
            <i className="bi bi-envelope"></i>
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            style={{ borderLeft: "none" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="mb-3 input-group">
          <span className="input-group-text bg-light">
            <i className="bi bi-lock"></i>
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            style={{ borderLeft: "none" }}
          />
        </div>

        {/* Remember + Forgot */}
        <div className="d-flex justify-content-between mb-3 small">
          <div>
            <input type="checkbox" id="remember" className="me-1" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="text-decoration-none">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button className="btn btn-primary w-100" onClick={handleLogin}>Login Now</button>

        {/* Buy Membership */}
       <a href="/membership" className="text-decoration-none text-center pt-3">
            Buy Membership
          </a>
      </div>
    </div>
  );
}

export default Login;

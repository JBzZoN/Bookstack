import React, { useState } from "react";
import "./Register.css";
import { useNavigate,Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 Payment should be triggered here (Razorpay backend order)
    console.log("Form data ready for payment & registration:", formData);

    // TEMP: simulate success
    navigate("/payment-success");
  };

  return (
    <div className="body1">
    <div className="registration-page container d-flex align-items-center">
      <div className="row justify-content-center w-100">
        <div className="col-lg-10 col-md-12">
          <div className="mt-5 mb-5 content-card p-4">
            <h3 className="font-montserrat mb-4">
              Membership Registration & Payment
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control form-control-lg"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control form-control-lg"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Address</label>
                <textarea
                  name="address"
                  rows="2"
                  className="form-control form-control-lg"
                  required
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control form-control-lg"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control form-control-lg"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="d-grid mt-4">
                <Link to='/login' type="submit" className="btn btn-outline">
                  Pay & Register
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;

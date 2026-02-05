import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export default function EditStaff() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const staffFromState = location.state?.staff;

  const themeGradient = "linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))";

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    username: "",
    password: "",
    roleType: "",
    salary: "",
    status: "active",
  });

  useEffect(() => {
    if (staffFromState) {
      setFormData({
        userId: staffFromState.userId,
        name: staffFromState.name,
        email: staffFromState.email,
        phone: staffFromState.phone,
        address: staffFromState.address,
        dob: staffFromState.dob,
        username: staffFromState.username,
        password: formData.password.trim() === "" ? null : formData.password, // leave blank for security
        roleType: staffFromState.roleType,
        salary: staffFromState.salary,
        status: staffFromState.status,
      });
    }
  }, [staffFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

      const res = await fetch("http://localhost:7070/admin/editstaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Staff updated successfully!");
        navigate("/admin/staff");
      } else {
        alert("Failed to update staff.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating staff. See console for details.");
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ minHeight: "100vh", backgroundColor: "#f4f2f8", paddingBottom: "50px" }}
    >
      <div className="card shadow-lg border-0">
        {/* Gradient Header */}
        <div
          className="card-header text-white text-center py-4"
          style={{
            background: themeGradient,
            borderRadius: "10px 10px 0 0",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 className="mb-0 fw-bold">Edit Staff Member</h3>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* User ID (readonly) */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">User ID</label>
                <input
                  className="form-control shadow-sm"
                  value={formData.userId}
                  readOnly
                />
              </div>


              {/* Name */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Name</label>
                <input
                  className="form-control shadow-sm"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control shadow-sm"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  className="form-control shadow-sm"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Address</label>
                <input
                  className="form-control shadow-sm"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              {/* DOB */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  className="form-control shadow-sm"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              {/* Username */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Username</label>
                <input
                  className="form-control shadow-sm"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control shadow-sm"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Salary */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Salary</label>
                <input
                  type="number"
                  className="form-control shadow-sm"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Status</label>
                <select
                  className="form-select shadow-sm"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 text-end">
              <button
                className="btn px-4 fw-bold"
                type="submit"
                style={{
                  background: themeGradient,
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                Update Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
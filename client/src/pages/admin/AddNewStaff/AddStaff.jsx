import React, { useState } from "react";

export default function AddStaff() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    username: "",
    password: "",
    roleType: "",
    salary: "",
    dateHired: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      // Get token from localStorage
      const token = JSON.parse(localStorage.getItem("currentUser"))?.token;

      // POST request with form data
      const res = await fetch("http://localhost:7070/admin/addmember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // auth header
        },
        body: JSON.stringify(formData), // form data from state
      });

      if (res.ok) {
        alert("Staff added successfully!");
        // Reset form after success
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          username: "",
          password: "",
          roleType: "",
          salary: "",
          dateHired: "",
          status: "active",
        });
      } else {
        alert("Failed to add staff. Check server or token.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending staff data. See console for details.");
    }
  };

  const themeGradient = "linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))";

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
          <h3 className="mb-0 fw-bold">Add New Staff Member</h3>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
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
              <div className="col-md-4">
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
              <div className="col-md-4">
                <label className="form-label fw-semibold">Username</label>
                <input
                  className="form-control shadow-sm"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control shadow-sm"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Role Type */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Role Type</label>
                <input
                  className="form-control shadow-sm"
                  name="roleType"
                  placeholder="Librarian / Admin"
                  value={formData.roleType}
                  onChange={handleChange}
                />
              </div>

              {/* Salary */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Salary</label>
                <input
                  type="number"
                  className="form-control shadow-sm"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              {/* Date Hired */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Date Hired</label>
                <input
                  type="date"
                  className="form-control shadow-sm"
                  name="dateHired"
                  value={formData.dateHired}
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
                  <option value="suspended">Suspended</option>
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
                Save Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
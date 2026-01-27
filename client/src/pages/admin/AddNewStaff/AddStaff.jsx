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
    status: "active"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    await fetch("http://localhost:8080/admin/staff/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add Staff Member</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">

              {/* Name */}
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  onChange={handleChange}
                />
              </div>

              {/* Address */}
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  className="form-control"
                  name="address"
                  onChange={handleChange}
                />
              </div>

              {/* DOB */}
              <div className="col-md-4">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  onChange={handleChange}
                />
              </div>

              {/* Username */}
              <div className="col-md-4">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  name="username"
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="col-md-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                />
              </div>

              {/* Role */}
              <div className="col-md-4">
                <label className="form-label">Role Type</label>
                <input
                  className="form-control"
                  name="roleType"
                  placeholder="Librarian / Admin"
                  onChange={handleChange}
                />
              </div>

              {/* Salary */}
              <div className="col-md-4">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  onChange={handleChange}
                />
              </div>

              {/* Date Hired */}
              <div className="col-md-4">
                <label className="form-label">Date Hired</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateHired"
                  onChange={handleChange}
                />
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
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

            <div className="mt-4 text-end">
              <button className="btn btn-success px-4" type="submit">
                Save Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

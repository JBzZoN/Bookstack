// StaffManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("currentUser")).token;
        const res = await axios.get("http://localhost:7070/admin/allstaff", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStaffList(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch staff. Check the server and token.");
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  const themeColors = {
    gradient: "linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))",
    addBtn: "#28a745",
    editBtn: "#007bff", // updated to match theme blue
  };

  if (loading) return <p className="text-center mt-5 text-secondary">Loading staff...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4f2f8", paddingBottom: "50px" }}>
      {/* Heading container */}
      <div
        className="text-center py-4 mb-4"
        style={{
          width: "100%",
          background: themeColors.gradient,
          borderRadius: "0 0 15px 15px",
          color: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 className="display-5 fw-bold mb-0">Staff Management</h1>
      </div>

      <div className="container">
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-success"
            style={{ backgroundColor: themeColors.addBtn, border: "none" }}
            onClick={() => navigate("/admin/addstaff")}
          >
            + Add New Staff
          </button>
        </div>

        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle bg-white">
            <thead className="table-dark">
              <tr>
                <th>UserID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>DOB</th>
                <th>Username</th>
                <th>Salary</th>
                <th>Date Hired</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.userId}>
                  <td>{staff.userId}</td>
                  <td>{staff.name}</td>
                  <td>{staff.email}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.address}</td>
                  <td>{new Date(staff.dob).toLocaleDateString()}</td>
                  <td>{staff.username}</td>
                  <td>₹{staff.salary}</td>
                  <td>{new Date(staff.dateHired).toLocaleDateString()}</td>
                  <td>{staff.status}</td>
                  <td>
                    <button
                        className="btn btn-sm"
                            style={{
                            backgroundColor: themeColors.editBtn,
                            color: "#fff",
                            border: "none",
                             }}
                            onClick={() => 
                            navigate(`/admin/editstaff`, { state: { staff } })
                                }>
                             Edit
                            </button>
                  </td>
                </tr>
              ))}
              {staffList.length === 0 && (
                <tr>
                  <td colSpan="11" className="text-center text-secondary">
                    No staff available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Staff;

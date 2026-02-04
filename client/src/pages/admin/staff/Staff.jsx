// StaffManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from '../../../components/admin/Title/Title';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("currentUser")).token;
        const res = await axios.get("http://localhost:30080/admin/allstaff", {
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
  <div className="container mt-3 mb-5">
    
    {/* Page Title */}
    <Title string={"Staffs"} />

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

      <div className="members-card">
        <table className="table members-table">
          <thead>
            <tr>
              <th>UserID</th>
              <th className="d-none d-md-table-cell">Name</th>
              <th>Email</th>
              <th className="d-none d-md-table-cell">Phone</th>
              <th>Address</th>
              <th>DOB</th>
              <th>Username</th>
              <th>Salary</th>
              <th className="d-none d-md-table-cell">Hired-on</th>
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
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      
                      navigate('/admin/editstaff', { state: { staff} })
                    }}
                  >
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
}

export default Staff;

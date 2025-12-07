import React, { useState } from "react";
import { Staff_data } from "../../../dummy-data/staff-data";
import { useNavigate } from "react-router-dom";
import "./Staff.css";

export default function Staff() {
    const navigate = useNavigate();
    const [staff, setStaff] = useState(Staff_data);

    const handleRemove = (id) => {
        setStaff(staff.filter((s) => s.id !== id));
    };

    return (
        <div className="staff-container">
            <div className="staff-header">
                <h2>Staff Management</h2>
                <button 
                    className="add-btn" 
                    onClick={() => navigate("/admin/addstaff")}
                >
                    + Add New Staff
                </button>
            </div>

            <table className="staff-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((s) => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>₹{s.salary}</td>
                            <td>{s.status}</td>
                            <td>{s.paymentStatus}</td>
                            <td>
                                <button 
                                    className="edit-btn"
                                    onClick={() => navigate("/admin/editstaff")}
                                >Edit</button>
                                <button 
                                    className="remove-btn" 
                                    onClick={() => handleRemove(s.id)}
                                >Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
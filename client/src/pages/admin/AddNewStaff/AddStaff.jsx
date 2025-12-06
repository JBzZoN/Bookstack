import React, { useState } from "react";
import "./AddStaff.css";


export default function AddStaff() {
    const [form, setForm] = useState({
        name: "",
        salary: "",
        status: "active",
        paymentStatus: "pending",
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Staff Added:", form);
        alert("Staff added successfully!");
    };


return (
<div className="add-staff-container">
<h2>Add New Staff</h2>


<form className="staff-form" onSubmit={handleSubmit}>
    <label>Name</label>
    <input
    type="text"
    name="name"
    value={form.name}
    onChange={handleChange}
    required
    />


    <label>Salary</label>
    <input
    type="number"
    name="salary"
    value={form.salary}
    onChange={handleChange}
    required
    />


    <label>Status</label>
    <select name="status" value={form.status} onChange={handleChange}>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
    </select>


    <label>Payment Status</label>
    <select
    name="paymentStatus"
    value={form.paymentStatus}
    onChange={handleChange}
    >
    <option value="paid">Paid</option>
    <option value="pending">Pending</option>
    </select>


    <button type="submit" className="submit-btn">Add Staff</button>
    </form>
    </div>
    );
    }
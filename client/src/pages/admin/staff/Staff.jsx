import React, { useEffect, useState } from "react";
import { Staff_data } from "../../../dummy-data/staff-data";
import { useNavigate } from "react-router-dom";
import "./Staff.css";
import { getstaffs } from "../Service/connection";

export default function Staff() {
    const navigate = useNavigate();
    const [staff, setStaff] = useState(Staff_data);

    const handleRemove = (id) => {
        setStaff(staff.filter((s) => s.id !== id));
    };

     const [properties, setProperties] = useState([])
    
       const getPropertiesList = async () => {
        const response = await getstaffs()
        console.log(response)
        setProperties(response)
       // console.log(response['data'])
        if (response['status'] == 'success') {
          // set the properties and re-render the component UI
          setProperties(response)
          
        }
      }
    
      useEffect(() => {
        // load the properties automatically when this component is launched
        getPropertiesList()
        console.log(properties);
      }, [])
    

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
                        <th>phone</th>
                        <th>status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((s) => (
                        <tr key={s.user_if}>
                            <td>{s.user_id}</td>
                            <td>{s.name}</td>
                            <td>₹{s.salary}</td>
                            <td>{s.phone}</td>
                            <td>{s.status}</td>
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
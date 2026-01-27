import React, { useEffect, useState } from "react";
import { members as membersData } from "../../../dummy-data/member-data";
import "./Members.css";
import { getmembers } from "../Service/connection";

export default function Members() {
  const [members, setMembers] = useState(membersData);

  const handleRemove = (email) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter((m) => m.email !== email));
    }
  };

  const handleFineManagement = (member) => {
    alert(`Fine management for ${member.name} (${member.username})`);
  };


  const [properties, setProperties] = useState([])
      
         const getPropertiesList = async () => {
          const response = await getmembers()
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
    <div className="members-container">
      <h2>Library Members</h2>
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>DOB</th>
            <th>Username</th>
             <th>Membership Type</th>
            <th>Membership Start</th>
            <th>Membership End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((m) => (
            <tr key={m.email}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{m.address}</td>
              <td>{m.dob}</td>
              <td>{m.username}</td>
              <td>{m.membershipType}</td>
              <td>{m.memberStart}</td>
              <td>{m.memberEnd}</td>
              <td>
                <button
                  className="fine-btn"
                  onClick={() => handleFineManagement(m)}
                >
                  Fine Management
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(m.email)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

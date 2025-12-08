import React, { useState } from "react";
import { members as membersData } from "../../../dummy-data/member-data";
import "./Members.css";

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
            <th>Membership Type</th>
            <th>Username</th>
            <th>Membership Start</th>
            <th>Membership End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.email}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.phone}</td>
              <td>{m.address}</td>
              <td>{m.date_of_birth}</td>
              <td>{m.membership_type}</td>
              <td>{m.username}</td>
              <td>{m.membership_start}</td>
              <td>{m.membership_end}</td>
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

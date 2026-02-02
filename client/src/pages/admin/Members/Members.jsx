import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../../../components/admin/Title/Title'
import axios from 'axios'
import './Members.css'
import { toast } from "react-toastify";

function ViewMembers() {

  const navigate = useNavigate()
  const [members, setMembers] = useState([])

  const handleSendToAllDefaulters = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;

    await axios.post(
      "http://localhost:7070/admin/sendfinetoall",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success("Emails sent to all defaulters!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to send emails to defaulters");
  }
};

  async function getAllMembers() {
    const response = await axios.get(
      "http://localhost:7070/admin/allmember",
      {
        headers: {
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`
        }
      }
    )
    
    setMembers(response.data)
  }
  useEffect(() => {
    getAllMembers()
  }, [])

  return (
    <div className="container mt-3 mb-5">

      <Title string={"Members"} />
      
      <div className="d-flex justify-content-end mb-3">
  <button
    className="btn btn-success"
    onClick={handleSendToAllDefaulters}
  >
    📧 Send Email to All Defaulters
  </button>
</div>
      
    
      <div className="members-card">
        <table className="table members-table">
          <thead>
            <tr>
              <th>Name</th>
              <th className="d-none d-md-table-cell">Email</th>
              <th>Phone</th>
              <th className="d-none d-md-table-cell">Address</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.map((e) => (
              <tr key={e.userId}>
                <td className="fw-semibold">{e.name}</td>
                <td className="d-none d-md-table-cell">{e.email}</td>
                <td>{e.phone}</td>
                <td className="d-none d-md-table-cell text-truncate" style={{ maxWidth: "220px" }}>
                  {e.address}
                </td>
                <td>{e.dob}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      console.log(e)
                      navigate('/admin/memberprofile', { state: { member: e } })
                    }}
                  >
                    View more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default ViewMembers
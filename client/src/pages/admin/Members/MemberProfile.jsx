import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./MemberProfile.css"
import profileImage from "../../../assets/default_profile_image.png"

function MemberProfile() {

  const location = useLocation()
  const member = location.state.member
   const navigate = useNavigate()

  const [fine, setFine] = useState(null)
  const [loadingFine, setLoadingFine] = useState(true)
  const [error, setError] = useState("")

 useEffect(() => {
  const fetchFine = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("currentUser")).token;

      const res = await axios.post(
        "http://localhost:7070/admin/calculatefine",
        {
          userId: member.userId  
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      setFine(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load fine");
    } finally {
      setLoadingFine(false);
    }
  };

  if (member?.userId) {
    fetchFine();
  }
}, [member]);


   

  const handleSendEmail = () => {
    const subject = encodeURIComponent("Regarding your pending fine")
    const body = encodeURIComponent(
      `Hello ${member.name},\n\nYour current pending fine is: ${fine?.amount ?? fine}.\n\nPlease clear it at the earliest.\n\nThanks.`
    )

    window.location.href = `mailto:${member.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="container profile-container mb-5">

      <div className="card profile-card position-relative">

        {/* Gradient header */}
        <div className="profile-header"></div>

        {/* Profile image */}
        <img
          src={profileImage}
          className="profile-image"
          alt="profile"
        />

        <div className="card-body profile-body">

          <table className="table profile-table">
            <tbody>
              <tr><td>Name</td><td>{member.name}</td></tr>
              <tr><td>Email</td><td>{member.email}</td></tr>
              <tr><td>Phone</td><td>{member.phone}</td></tr>
              <tr><td>Address</td><td>{member.address}</td></tr>
              <tr><td>Date of birth</td><td>{member.dob}</td></tr>
              <tr><td>Membership type</td><td>{member.membershipType}</td></tr>
              <tr><td>Username</td><td>{member.username}</td></tr>
              <tr><td>Membership start</td><td>{member.memberStart}</td></tr>
              <tr><td>Membership end</td><td>{member.memberEnd}</td></tr>

              <tr>
                <td>Fine</td>
                <td>
                  {loadingFine && "Loading..."}
                  {error && <span className="text-danger">{error}</span>}
                  {!loadingFine && !error && (
                    <strong>₹ {fine?.amount ?? fine ?? 0}</strong>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="d-flex gap-2">
            <Link to="/admin/members" className="btn btn-primary go-back">
              ← Go Back
            </Link>


                 
            <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      navigate('/admin/emailsending', {
                      state: {
                       member: member,
                      fine: fine
                     }
                    });
                    }}
                  >
                    Send Email
                  </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default MemberProfile

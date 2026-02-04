import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import "./member-profile.css"
import profileImage from "../../../assets/images/staff/default_profile_image.png"

function MemberStaffProfile() {

  const location = useLocation()
  const member = location.state.member
  console.log(member)

  return (
    <div className="container s-profile-container mb-5">

      <div className="card s-profile-card position-relative">

        {/* Gradient header */}
        <div className="s-profile-header"></div>

        {/* Profile image */}
        <img
          src={profileImage}
          className="s-profile-image"
          alt="profile"
        />

        <div className="card-body s-profile-body">

          <table className="table s-profile-table">
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
            </tbody>
          </table>

          <Link to="/staff/members" className="btn btn-primary s-go-back">
            ← Go Back
          </Link>

        </div>
      </div>

    </div>
  )
}

export default MemberStaffProfile

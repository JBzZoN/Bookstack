import React from 'react'
import { useLocation } from 'react-router-dom'
import "./member-profile.css";
import profileImage from "../../../assets/staff/default_profile_image.png"
import { Link } from 'react-router-dom';

function MemberProfile() {
  
  const location = useLocation();
  const member = location.state.member;

  return (
    <div className='container profile-container mb-5'>
        <div class="card profile position-relative">
            <div className="position-absolute top-0 start-50 translate-middle whitener"></div>
            <img src={profileImage} className='position-absolute top-0 start-50 translate-middle profile-image' alt="" />
            <div class="card-body mt-5">
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{member.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{member.email}</td>
                        </tr>
                        
                        <tr>
                            <td>Phone no</td>
                            <td>{member.phone}</td>
                        </tr>
                        
                        <tr>
                            <td>Address</td>
                            <td>{member.address}</td>
                        </tr>
                        
                        <tr>
                            <td>Date of birth</td>
                            <td>{member.dob}</td>
                        </tr>
                        <tr>
                            <td>Membership type</td>
                            <td>{member.membershipType}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>{member.username}</td>
                        </tr>
                        
                        <tr>
                            <td>Membership start</td>
                            <td>{member.memberStart}</td>
                        </tr>
                        
                        <tr>
                            <td>Membership end</td>
                            <td>{member.memberEnd}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/staff/members" class="btn btn-primary go-back">Go Back</Link>
            </div>
            </div>
    </div>
  )
}

export default MemberProfile

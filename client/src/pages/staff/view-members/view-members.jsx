import React from 'react'
import { members } from './../../../dummy-data/member-data';
import { useNavigate } from 'react-router-dom';

function ViewMembers() {

  const navigate = useNavigate();
  return (
    <div className='container mt-5 mb-5'>
      <table className='table table-striped table-warning border  border-dark'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>DOB</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {members.map((e) => <tr key={e.username}>
            <td>{e.name}</td>
            <td>{e.email}</td>
            <td>{e.phone}</td>
            <td>{e.address}</td>
            <td>{e.date_of_birth}</td>
            <td><button className='btn btn-success' onClick={
              () => {
                navigate('/staff/members/profile', {state:{member:e}})
              }
            }>View more</button></td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ViewMembers

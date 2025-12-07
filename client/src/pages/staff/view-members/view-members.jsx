import React from 'react'
import { members } from './../../../dummy-data/member-data';
import { useNavigate } from 'react-router-dom';

function ViewMembers() {

  const navigate = useNavigate();
  return (
    <div className='container mt-5 mb-5'>
      <table className='table table-striped table-danger'>
        <thead>
          <tr>
            <th>Name</th>
            <th className='d-none d-md-table-cell'>Email</th>
            <th>Phone</th>
            <th className='d-none d-md-table-cell'>Address</th>
            <th>DOB</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {members.map((e) => <tr key={e.username}>
            <td>{e.name}</td>
            <td className='d-none d-md-table-cell'>{e.email}</td>
            <td>{e.phone}</td>
            <td className='d-none d-md-table-cell'>{e.address}</td>
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

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/staff/title/title';
import axios from 'axios';

function ViewMembers() {

  const navigate = useNavigate();

  const [members, setMembers] = useState([])

  async function getAllMembers() {
      const response = await axios.get("http://localhost:7070/staff/members", {headers: {"Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`}});
      const data = response.data
      setMembers(data)
  }
  console.log(members)
  useEffect(() => {
      getAllMembers()
  }, [])

  return (
    <div className='container mt-3 mb-5'>
      <Title string={"Members"}/>
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
          {members.map((e) => <tr key={e.user.userId}>
            <td>{e.user.name}</td>
            <td className='d-none d-md-table-cell'>{e.user.email}</td>
            <td>{e.user.phone}</td>
            <td className='d-none d-md-table-cell'>{e.user.address}</td>
            <td>{e.user.dob}</td>
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

import React from 'react'
import { Outlet } from 'react-router-dom'
import StaffNavbar from './../../../components/staff/navbar/navbar';

function StaffHome() {
  return (
    <div>
      <StaffNavbar/>
      <Outlet/>
    </div>
  )
}

export default StaffHome

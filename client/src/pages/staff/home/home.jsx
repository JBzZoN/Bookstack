import React from 'react'
import { Outlet } from 'react-router-dom'

function StaffHome() {
  return (
    <div>
      <div>Josh Biju</div>
      <div>Staff naman</div>
      <div>Naman added</div>
      <div>asking for request</div>
      <Outlet/>
    </div>
  )
}

export default StaffHome

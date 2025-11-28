import React from 'react'
import { Outlet } from 'react-router-dom'

function StaffHome() {
  return (
    <div>
      <div>Staff Home</div>
      <Outlet/>
    </div>
  )
}

export default StaffHome

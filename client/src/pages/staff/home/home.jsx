import React from 'react'
import { Outlet } from 'react-router-dom'

function StaffHome() {
  return (
    <div>
      <div>Staff Home</div>
      <div>Naman added</div>
      <Outlet/>
    </div>
  )
}

export default StaffHome

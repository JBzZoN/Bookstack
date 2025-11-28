import React from 'react'
import { Outlet } from 'react-router-dom';

function AdminHome() {
  return (
    <div>
      <div>Admin</div>
      <Outlet/>
    </div>
  )
}

export default AdminHome

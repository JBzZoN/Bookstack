import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../../../components/admin/Navbar/navbar';

function AdminHome() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default AdminHome

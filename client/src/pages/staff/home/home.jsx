import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import StaffNavbar from './../../../components/staff/navbar/navbar';
import Title from '../../../components/staff/title/title';

function StaffHome() {
  return (
    <div className="staff-layout">
      <StaffNavbar />
      <main className="staff-content">
        <Outlet />
      </main>
    </div>
  )
}

export default StaffHome

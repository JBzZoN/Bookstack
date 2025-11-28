import React from 'react'
import { Outlet } from 'react-router-dom';

function MemberHome() {
  return (
    <div>
      <div>Member-Mayur</div>
      <Outlet/>
    </div>
  )
}

export default MemberHome

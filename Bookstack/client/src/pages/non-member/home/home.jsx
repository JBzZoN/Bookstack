import React from 'react'
import { Outlet } from 'react-router-dom'

function NonMemberHome() {
  return (
    <div>
      <div>Non member</div>
      <Outlet/>
    </div>
  )
}

export default NonMemberHome

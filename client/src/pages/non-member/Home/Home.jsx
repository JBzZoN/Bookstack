import React from 'react'
import Navbar from '../../../components/Member/Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../../../components/Member/Footer/Footer.jsx'

function Home() {
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Home

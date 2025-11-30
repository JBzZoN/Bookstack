import React from 'react'
import Navbar from '../../../components/Member/Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../../../components/Member/Footer/Footer.jsx'

function Home() {
  return (
    <div style={{background: 'linear-gradient(180deg, #f4f7ff 0%, #fff1f2 100%)'}}>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Home

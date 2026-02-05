import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/Member/Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../../../components/Member/Footer/Footer.jsx'
import MembershipExpired from '../../../components/Member/MembershipExpired/MembershipExpired.jsx'

function Home() {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const checkExpiry = () => {
      try {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        // Check for common expiry field names or specific logic
        // Assuming 'endDate' or 'expiryDate' is present in the user object
        // If not present, we default to false (not expired) until we know the exact field
        if (user) {
          const expiryDate = user.endDate || user.expiryDate;
          if (expiryDate && new Date(expiryDate) < new Date()) {
            setIsExpired(true);
          }
        }
      } catch (err) {
        console.error("Error checking membership status", err);
      }
    };

    checkExpiry();
  }, []);

  return (
    <div style={{ background: 'linear-gradient(180deg, #f4f7ff 0%, #fff1f2 100%)', position: 'relative', minHeight: '100vh' }}>
      {isExpired && <MembershipExpired />}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home

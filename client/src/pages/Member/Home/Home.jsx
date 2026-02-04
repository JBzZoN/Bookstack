import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Home.css';

/* ==========================================================================
   Assets & Components
   ========================================================================== */
import Navbar from '../../../components/Member/Navbar/Navbar.jsx';
import Footer from '../../../components/Member/Footer/Footer.jsx';
import SessionExpiry from '../../../components/global/SessionExpiry/SessionExpiry.jsx';
import expiredImage from '../../../assets/images/membership-expired.png';

/**
 * Member Home Layout Component
 * ==========================================================================
 * Main layout wrapper for authenticated members.
 * 
 * Responsibilities:
 * 1. Layout Structure: Wraps content with Navbar, Outlet (nested routes), and Footer.
 * 2. Expiry Management: 
 *    - Session (Global): Uses the common <SessionExpiry /> component for JWT timeouts.
 *    - Membership (Local): Handles member-specific plan expiration with a custom overlay.
 */
function Home() {
  const navigate = useNavigate();

  /* ==========================================================================
     State Management
     ========================================================================== */
  const [isMembershipExpired, setIsMembershipExpired] = useState(false);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  /* ==========================================================================
     Effects
     ========================================================================== */

  /**
   * Dual Expiry Check
   * --------------------------------------------------------------------------
   * Runs on mount to validate:
   * 1. Membership: Client-side check against 'currentUser' endDate.
   * 2. Session: Decoded JWT payload 'exp' claim check.
   */
  useEffect(() => {
    const checkExpiry = () => {
      try {
        const user = JSON.parse(localStorage.getItem('currentUser'));

        if (user) {
          // 1. Check Membership Expiry (Local Plan Status)
          const expiryDate = user.endDate || user.expiryDate;
          if (expiryDate && new Date(expiryDate) < new Date()) {
            setIsMembershipExpired(true);
          }

          // 2. Check Session Expiry (Global JWT Check)
          const token = localStorage.getItem('token');
          if (token) {
            try {
              const payloadBase64 = token.split('.')[1];
              const decodedPayload = JSON.parse(atob(payloadBase64));

              if (decodedPayload.exp) {
                const currentTime = Date.now() / 1000;
                if (decodedPayload.exp < currentTime) {
                  setIsSessionExpired(true);
                }
              }
            } catch (e) {
              console.error("Failed to decode token", e);
            }
          }
        }
      } catch (err) {
        console.error("Error checking status", err);
      }
    };

    checkExpiry();
  }, []);

  /* ==========================================================================
     Render
     ========================================================================== */
  return (
    <div className="member-home-wrapper">

      {/* Global Session Expiry Component (Common across all roles) */}
      <SessionExpiry isVisible={isSessionExpired} />

      {/* Local Membership Expiry Overlay (Specific to Members) */}
      {isMembershipExpired && !isSessionExpired && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
          onClick={() => navigate('/membership')}
          style={{
            zIndex: 2000,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(5px)',
            cursor: 'pointer'
          }}
          title="Membership Expired. Click to renew."
        >
          <img
            src={expiredImage}
            alt="Membership Expired"
            className="img-fluid"
            style={{
              maxWidth: '70%',
              width: '70%'
            }}
          />
        </div>
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Dynamic Content Area (Nested Routes) */}
      <div className="flex-grow-1">
        <Outlet />
      </div>

      {/* Global Page Footer */}
      <Footer />
    </div>
  );
}

export default Home;

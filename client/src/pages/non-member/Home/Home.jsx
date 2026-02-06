import React from 'react';
import { Outlet } from 'react-router-dom';

// Note: Navbar and Footer imports are currently unused but kept for future layout expansion checks.
// import Navbar from '../../../components/Member/Navbar/Navbar.jsx';
// import Footer from '../../../components/Member/Footer/Footer.jsx';

/**
 * Home Layout Component (Non-Member)
 * ==========================================================================
 * Serves as the base layout wrapper for public/non-member routes.
 * 
 * Functionality:
 * - Renders child routes via the `<Outlet />` component.
 * - Acts as a placeholder for potential global layouts (headers/footers) 
 *   specific to this module.
 *
 * @layout
 * @returns {JSX.Element} The layout wrapper.
 */
function Home() {
  return (
    <div>
      {/* 
        Child Route Rendering 
        ----------------------
        Dynamically loads the component matching the current route URL.
      */}
      <Outlet />
    </div>
  );
}

export default Home;

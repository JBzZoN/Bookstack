import React, { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import StaffNavbar from './../../../components/staff/navbar/navbar';

/**
 * StaffHome Component
 * ==========================================================================
 * Main layout wrapper for the Staff interface.
 * 
 * Functionality:
 * 1. Integrates the Staff-specific Navbar.
 * 2. Provides a content area (main) for rendering nested routes via `<Outlet />`.
 * 3. Sets the base layout structure for all librarian and admin-related views.
 *
 * @layout
 * @returns {JSX.Element} The layout wrapper including Navbar and child content.
 */
function StaffHome() {
  return (
    <div className="staff-layout">
      {/* 
        Navigation
        -----------
        Staff-side navbar with search and management links. 
      */}
      <StaffNavbar />

      {/* 
        Main Content Area
        ------------------
        Renders the specific staff page (e.g., Books, Members, Rentals).
      */}
      <main className="staff-content">
        <Outlet />
      </main>
    </div>
  )
}

export default StaffHome
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

/**
 * StaffNavbar Component
 * ==========================================================================
 * Vertical sidebar navigation tailored for library staff and administrators.
 * 
 * Features:
 * - Expandable Sections: Toggleable sub-menus for categorized actions (e.g., Books).
 * - Sticky Positioning: Remains visible during vertical scrolling for quick access.
 * - Branding & Logout: Clear entry and exit points for the staff session.
 * - Responsive Design: Adapts to system-wide sidebar layout requirements.
 *
 * @component
 * @returns {JSX.Element} The side navigation bar for staff.
 */
function StaffNavbar() {

  const [booksOpen, setBooksOpen] = useState(false)

  return (
    <aside className="staff-sidebar">

      <div className="sidebar-brand">
        <Link to="/staff/books" className="brand-link">
          BookStack
        </Link>
      </div>

      <ul className="sidebar-nav">

        {/* Books expandable section */}
        <li className="sidebar-item">
          <div
            className="sidebar-link sidebar-toggle"
            onClick={() => setBooksOpen(!booksOpen)}
          >
            Books
            <span className={`chevron ${booksOpen ? 'open' : ''}`}>▾</span>
          </div>

          {booksOpen && (
            <ul className="sidebar-subnav">
              <li>
                <Link className="sidebar-sublink" to="/staff/books/add">
                  Add New
                </Link>
              </li>
              <li>
                <Link className="sidebar-sublink" to="/staff/books">
                  View All
                </Link>
              </li>
              <li>
                <Link className="sidebar-sublink" to="/staff/transaction">
                  Rent, renew or return
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Other links */}
        <li className="sidebar-item">
          <Link className="sidebar-link" to="/staff/members">
            Members
          </Link>
        </li>

        <li className="sidebar-item">
          <Link className="sidebar-link" to="/staff/newsletter">
            Send Newsletter
          </Link>
        </li>

      </ul>

      {/* 
        Session Integrity
        ------------------
        Logout link to terminate current session.
      */}
      <div className="sidebar-footer">
        <Link to="/login" className="sidebar-logout">
          Log out
        </Link>
      </div>

    </aside>
  )
}

export default StaffNavbar

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

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

      <div className="sidebar-footer">
        <Link to="/login" className="sidebar-logout">
          Log out
        </Link>
      </div>

    </aside>
  )
}

export default StaffNavbar

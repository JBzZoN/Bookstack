import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function StaffNavbar() {
  return (
    <aside className="staff-sidebar">
      <div className="sidebar-brand">
        <Link to="/staff/books" className="brand-link">
          BookStack
        </Link>
      </div>

      <ul className="sidebar-nav">
        <li className="sidebar-item dropdown">
          <span
            className="sidebar-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Books
          </span>

          <ul className="dropdown-menu staff-dropdown">
            <li>
              <Link className="dropdown-item" to="/staff/books/add">
                Add New
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/staff/books">
                View All
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <Link className="dropdown-item" to="/staff/transaction">
                Rent, renew or return
              </Link>
            </li>
          </ul>
        </li>

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
        <Link to="/aboutus" className="sidebar-logout">
          Log out
        </Link>
      </div>
    </aside>
  );
}

export default StaffNavbar;
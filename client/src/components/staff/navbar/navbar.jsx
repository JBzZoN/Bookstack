import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

function StaffNavbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-secondary red-gradient-nav">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/staff/books">BookStack</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <Link className="nav-link text-light dropdown-toggle" to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Books
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/staff/books/add">Add New</Link></li>
                            <li><Link className="dropdown-item" to="/staff/books">View All</Link></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><Link className="dropdown-item" to="/staff/transaction">Rent, renew or return</Link></li>
                        </ul>
                        </li>
                    <li className="nav-item">
                    <Link className="nav-link text-light" to="/staff/members">Members</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link text-light" to="/staff/newsletter">Send Newsletter</Link>
                    </li>
                </ul>
                <form className="d-flex" role="search"> 
                    <Link to="/aboutus" className='nav-link text-light' style={{margin:"0 10px 0 0"}}>Log out</Link>
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default StaffNavbar

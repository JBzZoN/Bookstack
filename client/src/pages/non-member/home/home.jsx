import React from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom';

function AdminHome() {

  const navigate = useNavigate()
   const onLogin = () => {
   

    // redirect to Login page
    navigate('/login')
  }
  return (

    <div style={{backgroundColor:"black"}}>
      <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg" data-bs-theme="dark">
          <div className="container-fluid">
    {/* <a className="navbar-brand" href="#">Bookstack</a> */}
    <Link
                className='navbar-brand'
                // aria-current='page'
                to='/aboutus'
              >
                Bookstack
          </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
           {/* <Link
                className='nav-link'
                aria-current='page'
                to='/aboutus'
              >
                Home
          </Link> */}
        </li>
        <li className="nav-item">
           <Link
                className='nav-link'
                aria-current='page'
                to='/membership'
                style={{color:"white"}}
              >
                Membership
          </Link>
        </li>
        <li className="nav-item">
          <Link
                className='nav-link'
                aria-current='page'
                to='/books'
                style={{color:"white"}}
              >
                Books
          </Link>
        </li>
      </ul>
    </div>
    <button onClick={onLogin}className="btn btn-outline-success me-5" type="submit">Login</button>
  </div>
     
        
    </nav>
         
      
      <Outlet/>
    </div>
  )
}

export default AdminHome

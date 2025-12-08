import React from "react";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div>

      {/* ===== HERO SECTION ===== */}
      <div className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Our Library</h1>
          <p className="lead mt-3">
            Rent your favorite books anytime, anywhere.
          </p>
          <Link to="/books" className="btn btn-primary btn-lg mt-3">
            Explore Books
          </Link>
        </div>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <div className="container py-5">
        <div className="row align-items-center">
          
          <div className="col-md-6">
            
            <h2
        className=" mb-4"
        style={{ color: "#fff4cbff" }}>
             Why Choose Our Library?
        </h2 >

           <p className="mt-3" style={{ color: "#e1cd86" }}>
  Our Book Rental System allows you to easily browse, rent and return books online.
  Enjoy a smooth and fast experience with thousands of books available.
</p>
          </div>

          <div className="col-md-6 text-center">
            <img 
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
              alt="Library"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "300px" }}
            />
          </div>

        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Our Features</h2>

          <div className="row text-center">
            <div className="col-md-4">
              <div className="card p-4 shadow-sm">
                <h5>📚 Huge Collection</h5>
                <p>Access thousands of books across all.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 shadow-sm">
                <h5>⏱ Fast Renting</h5>
                <p>Quick and easy book rental system.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 shadow-sm">
                <h5>🔒 Secure System</h5>
                <p>Safe and secure user accounts.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===== BOOK PREVIEW ===== */}
      <div className="container py-5">
        
       <h2
        className="text-center mb-4"
        style={{ color: "#fff4cbff" }}
        >
         Popular Books
        </h2>



        <div className="row g-4">
          {[1,2,3,4].map((item) => (
            <div className="col-md-3" key={item}>
              <div className="card shadow-sm h-100">
                <img 
                  src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt="Book"
                />
                <div className="card-body text-center">
                  <h6 className="card-title">Sample Book</h6>
                  <p className="text-muted">Available for rent</p>
                  <Link to="/books" className="btn btn-outline-primary btn-sm">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row">

            <div className="col-md-4">
              <h5>Library System</h5>
              <p className="text-muted">
                A smart book rental management system for everyone.
              </p>
            </div>

            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/books" className="text-white text-decoration-none">Books</Link></li>
                <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5>Contact</h5>
              <p className=" mb-1">📧 support@library.com</p>
              <p className="mb-1">📞 +91 9876543210</p>
            </div>

          </div>

          <hr className="bg-light" />
          <p className="text-center mb-0">
            © 2025 Library Management System
          </p>
        </div>
      </footer>

    </div>
  );
}

export default AboutUs;

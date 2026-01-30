import React from "react";
import "./OrderSummary.css";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";

/*
  OrderSummary Component
  ----------------------
  Displays selected plan details before registration.
  Acts as a confirmation step in the membership flow.
*/
function OrderSummary() {
  return (
    <div className="body1">

      {/* MAIN CONTENT */}
      <main className="order-page container d-flex flex-column align-items-center justify-content-center">

        {/* Brand header */}
        <div className="d-flex align-items-center gap-2 text-decoration-none">
          <img className="logo-img" src={logo} alt="logo" />

          <div className="logo-title">
            <span style={{ color: "#0a0d9f" }}>Book</span>
            <span style={{ color: "#111827" }}>Stack</span>
          </div>
        </div>

        {/* Card layout */}
        <div className="row w-100 justify-content-center padding">
          <div className="col-lg-6 col-md-8">

            <div className="content-card text-center">
              <h3 className="font-montserrat mb-4">
                Order Summary
              </h3>

              <p className="h5">Premium Plan</p>
              <p className="h5 fw-bold">₹3000</p>

              <p className="text-secondary small">
                Billed annually. Full access, 7 book borrow limit, no late fees.
              </p>

              <hr />

              <div className="d-grid mt-4">
                <Link to="/register" className="btn-outline w-100">
                  Next: Register
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSummary;

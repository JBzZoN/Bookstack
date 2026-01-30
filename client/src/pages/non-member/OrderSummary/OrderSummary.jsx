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
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));

  const startPayment = async (plan) => {

    const token = localStorage.getItem("token"); // JWT after login/register

    // 1️⃣ Call backend to create order
    const res = await fetch(
      `/membership/start-payment?membershipType=${plan.type}`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const data = await res.json();

    // 2️⃣ Razorpay checkout
    const options = {
      key: data.key,
      amount: data.amount * 100,
      currency: "INR",
      name: "BookStack",
      description: `${plan.type} Membership`,
      order_id: data.orderId,

      handler: async function (response) {

        // 3️⃣ Notify backend on success
        await fetch("/membership/payment-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            membershipType: plan.type
          })
        });

        alert("Membership Activated!");
        window.location.href = "/login"; // or dashboard
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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

              <p className="h5">{plan.type} Plan</p>
              <p className="h5 fw-bold">₹{plan.amount}</p>

              <p className="text-secondary small">
                Billed {plan.billing}. Membership benefits apply.
              </p>

              <p className="text-secondary small">
                Billed annually. Full access, 7 book borrow limit, no late fees.
              </p>

              <hr />

              <div className="d-grid mt-4">
                <button
                  className="btn-outline w-100"
                  onClick={() => startPayment(plan)}
                >
                  Pay & Continue
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderSummary;
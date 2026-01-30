import React from "react";
import "./OrderSummary.css";
import logo from "../../../assets/logo.png";

function OrderSummary() {

  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  const registerData = JSON.parse(localStorage.getItem("registerData"));

  // 🔒 Safety check
  if (!plan || !registerData) {
    alert("Invalid flow. Please choose plan and register again.");
    window.location.href = "/membership";
    return null;
  }

  const startPayment = async () => {

    // 1️⃣ CREATE ORDER (PUBLIC API – NO TOKEN)
    const res = await fetch(
      `http://localhost:7070/member/membership/start-payment?membershipType=${plan.type}`,
      { method: "POST" }
    );

    if (!res.ok) {
      const text = await res.text();
      alert(text);
      return;
    }

    const data = await res.json();

    // 2️⃣ OPEN RAZORPAY
    const options = {
      key: data.key,
      amount: data.amount * 100,
      currency: "INR",
      name: "BookStack",
      description: `${plan.type} Membership`,
      order_id: data.orderId,

      handler: async function (response) {

        // 3️⃣ PAYMENT SUCCESS → SEND ALL DATA TO BACKEND
        const successRes = await fetch(
          "http://localhost:7070/member/membership/payment-success",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...registerData,            // fullName, email, phone, address, dob, username, password
              membershipType: plan.type,
              billing: plan.billing,
              amount: plan.amount,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          }
        );

        if (!successRes.ok) {
          const text = await successRes.text();
          alert(text);
          return;
        }

        // 4️⃣ CLEAN TEMP DATA
        localStorage.removeItem("selectedPlan");
        localStorage.removeItem("registerData");

        alert("Payment successful! Please login.");
        window.location.href = "/login";
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="body1">
      <main className="order-page container d-flex flex-column align-items-center justify-content-center">

        <div className="d-flex align-items-center gap-2">
          <img className="logo-img" src={logo} alt="logo" />
          <div className="logo-title">
            <span style={{ color: "#0a0d9f" }}>Book</span>
            <span style={{ color: "#111827" }}>Stack</span>
          </div>
        </div>

        <div className="row w-100 justify-content-center padding">
          <div className="col-lg-6 col-md-8">
            <div className="content-card text-center">
              <h3>Order Summary</h3>
              <p>{plan.type} Plan</p>
              <p>₹{plan.amount}</p>
              <p className="text-secondary">Billed {plan.billing}</p>

              <button
                className="btn-outline w-100"
                onClick={startPayment}
              >
                Pay & Continue
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default OrderSummary;

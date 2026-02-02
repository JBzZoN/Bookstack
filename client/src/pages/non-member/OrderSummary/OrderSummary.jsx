import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Member/Footer/Footer";
import logo from "../../../assets/logo.png";
import api from "../../../api/api"; // plain axios instance

function OrderSummary() {
  const navigate = useNavigate();

  /* =======================
     STATE
     ======================= */
  const [amount, setAmount] = useState(null);
  const [rzpConfig, setRzpConfig] = useState(null);
  const [error, setError] = useState("");

  /* =======================
     READ LOCAL STORAGE
     ======================= */
  const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
  const registerData = JSON.parse(localStorage.getItem("registerData"));

  // 🔑 SINGLE SOURCE OF TRUTH
  const membershipType =
    selectedPlan?.membershipType || selectedPlan?.type;

  /* =======================
     SAFETY CHECK
     ======================= */
  useEffect(() => {
    if (!selectedPlan || !registerData || !membershipType) {
      navigate("/membership");
    }
  }, [navigate, selectedPlan, registerData, membershipType]);

  /* =======================
     FETCH RAZORPAY CONFIG
     ======================= */
  useEffect(() => {
    api
      .get("/payment/config")
      .then(res => setRzpConfig(res.data))
      .catch(() =>
        setError("Unable to load payment configuration.")
      );
  }, []);

  /* =======================
     FETCH FINAL AMOUNT
     ======================= */
  useEffect(() => {
    if (!membershipType) return;

    api
      .post("/payment/preview", {
        purpose: "BUY_MEMBERSHIP",
        membershipType: membershipType,
        billing: selectedPlan.billing
      })
      .then(res => setAmount(res.data.amount))
      .catch(() =>
        setError("Unable to fetch payment amount.")
      );
  }, [membershipType, selectedPlan]);

  /* =======================
     START PAYMENT
     ======================= */
  const startPayment = async () => {
    setError("");

    try {
      const res = await api.post("/payment/create-order", {
        purpose: "BUY_MEMBERSHIP",
        membershipType: membershipType,
        billing: selectedPlan.billing
      });

      openRazorpay(res.data.orderId, res.data.amount);
    } catch {
      setError("Unable to initiate payment.");
    }
  };

  /* =======================
     RAZORPAY CHECKOUT
     ======================= */
  const openRazorpay = (orderId, amount) => {
    if (!rzpConfig) return;

    const options = {
      key: rzpConfig.keyId,
      amount: amount * 100,
      currency: rzpConfig.currency,
      name: rzpConfig.company,
      description: "BookStack Membership",
      order_id: orderId,

      handler: handlePaymentSuccess,

      modal: {
        ondismiss: () =>
          setError("Payment cancelled by user.")
      },

      prefill: {
        name: registerData.fullName,
        email: registerData.email,
        contact: registerData.phone
      },

      theme: { color: "#004A55" }
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", () => {
      setError("Payment failed. Please try again.");
    });

    rzp.open();
  };

  /* =======================
     PAYMENT SUCCESS
     ======================= */
  const handlePaymentSuccess = async (response) => {
  const membershipType =
    selectedPlan.membershipType ||
    selectedPlan.planType ||
    selectedPlan.type;

  const payload = {
    razorpayPaymentId: response.razorpay_payment_id,
    razorpayOrderId: response.razorpay_order_id,
    razorpaySignature: response.razorpay_signature,
    membershipType,             
    billing: selectedPlan.billing,
    registerData
  };

  console.log("✅ PAYMENT SUCCESS PAYLOAD", payload);

  try {
      await api.post("/payment/success", payload);
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("❌ PAYMENT SUCCESS ERROR", err.response?.data || err);
      setError("Payment successful but membership activation failed.");
    }
  };


  /* =======================
     UI
     ======================= */
  return (
    <div className="body1 d-flex flex-column min-vh-100">

      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container">

          {/* LOGO */}
          <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
            <img className="logo-img" src={logo} alt="logo" />
            <div className="logo-title">
              <span style={{ color: "#0a0d9f" }}>Book</span>
              <span style={{ color: "#111827" }}>Stack</span>
            </div>
          </div>

          {/* CARD */}
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-10">
              <div className="content-card text-center">

                <h3>Order Summary</h3>
                <p>{membershipType} Plan</p>
                <p className="fw-bold fs-4">₹{amount}</p>
                <p className="text-secondary">
                  Billed {selectedPlan.billing}
                </p>

                {error && (
                  <p className="text-danger mt-2">{error}</p>
                )}

                <button
                  className="btn-outline w-100 mt-3"
                  onClick={startPayment}
                  disabled={!amount || !rzpConfig}
                >
                  Pay & Continue
                </button>

              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default OrderSummary;

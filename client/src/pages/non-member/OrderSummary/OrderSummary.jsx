import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Member/Footer/Footer";

function OrderSummary() {
  const navigate = useNavigate();

  /* =======================
     STATE (LOGIC ONLY)
     ======================= */
  const [amount, setAmount] = useState(null);
  const [rzpConfig, setRzpConfig] = useState(null);
  const [error, setError] = useState("");

  /* =======================
     READ EXISTING DATA
     ======================= */
  const selectedPlan = JSON.parse(localStorage.getItem("selectedPlan"));
  const registerData = JSON.parse(localStorage.getItem("registerData"));

  /* =======================
     SAFETY CHECK
     ======================= */
  useEffect(() => {
    if (!selectedPlan || !registerData) {
      navigate("/membership");
    }
  }, [navigate, selectedPlan, registerData]);

  /* =======================
     FETCH RAZORPAY CONFIG
     (key from application.properties)
     ======================= */
  useEffect(() => {
    axios
      .get("/payment/config")
      .then(res => setRzpConfig(res.data))
      .catch(() =>
        setError("Unable to load payment configuration.")
      );
  }, []);

  /* =======================
     FETCH FINAL AMOUNT
     (backend decides)
     ======================= */
  useEffect(() => {
    if (!selectedPlan) return;

    axios
      .post("/payment/preview", {
        purpose: "BUY_MEMBERSHIP",
        membershipType: selectedPlan.membershipType,
        billing: selectedPlan.billing
      })
      .then(res => setAmount(res.data.amount))
      .catch(() =>
        setError("Unable to fetch payment details.")
      );
  }, [selectedPlan]);

  /* =======================
     START PAYMENT
     ======================= */
  const startPayment = async () => {
    setError("");

    try {
      const res = await axios.post("/payment/create-order", {
        purpose: "BUY_MEMBERSHIP",
        membershipType: selectedPlan.membershipType,
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
    if (!rzpConfig) {
      setError("Payment configuration missing.");
      return;
    }

    const options = {
      key: rzpConfig.keyId,
      amount: amount * 100,
      currency: rzpConfig.currency,
      name: rzpConfig.company,
      description: "BookStack Membership",
      order_id: orderId,

      handler: function (response) {
        handlePaymentSuccess(response);
      },

      modal: {
        ondismiss: function () {
          setError("Payment cancelled by user.");
        }
      },

      prefill: {
        name: registerData.fullName,
        email: registerData.email,
        contact: registerData.phone
      },

      theme: {
        color: "#004A55"
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      setError("Payment failed. Please try again.");
    });

    rzp.open();
  };

  /* =======================
     PAYMENT SUCCESS
     ======================= */
  const handlePaymentSuccess = async (response) => {
    try {
      await axios.post("/payment/success", {
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,

        purpose: "BUY_MEMBERSHIP",
        membershipType: selectedPlan.membershipType,
        billing: selectedPlan.billing,
        registerData: registerData
      });

      localStorage.removeItem("selectedPlan");
      localStorage.removeItem("registerData");

      navigate("/payment-success");
    } catch {
      setError(
        "Payment successful but membership activation failed."
      );
    }
  };

  /* =======================
     UI (UNCHANGED)
     ======================= */
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

import React, { useEffect, useState, useMemo } from "react";
import "./OrderSummary.css";

/* ==========================================================================
   Assets & Components
   ========================================================================== */
import logo from "../../../assets/images/logo.png";
import Footer from "../../../components/Member/Footer/Footer";
import api from "../../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/**
 * OrderSummary Component
 * ==========================================================================
 * Final checkout step before payment processing.
 * Displays a summary of the selected plan and user registration details.
 *
 * Core Features:
 * - Order Review: Shows selected plan, billing cycle, and calculated total.
 * - User Verification: Displays Name/Email/Phone for final check.
 * - Payment Integration: Initiates Razorpay checkout flow.
 * - Error Handling: Manages network or configuration errors gracefully.
 *
 * @component
 * @returns {JSX.Element} The checkout summary page.
 */
function OrderSummary() {
  const navigate = useNavigate();

  /* ==========================================================================
     State Management
     ========================================================================== */
  const [amount, setAmount] = useState(null);
  const [rzpConfig, setRzpConfig] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /* ==========================================================================
     Data Retrieval (Local Storage)
     ========================================================================== */
  // Safely retrieve and parse data
  const getStoredData = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  // Memoize data to prevent infinite re-renders in useEffect
  const selectedPlan = useMemo(() => getStoredData("selectedPlan"), []);
  const registerData = useMemo(() => getStoredData("registerData"), []);

  // Normalized membership type (handles inconsistent naming across app versions if any)
  const membershipType = useMemo(() => selectedPlan?.membershipType || selectedPlan?.type, [selectedPlan]);

  /* ==========================================================================
     Lifecycle Hooks
     ========================================================================== */

  /**
   * Validation Check.
   * Redirects back to start if critical data is missing.
   */
  useEffect(() => {
    if (!selectedPlan || !registerData || !membershipType) {
      toast.error("Session expired or invalid data. Please restart.");
      navigate("/membership");
    }
  }, [navigate, selectedPlan, registerData, membershipType]);

  /**
   * Fetch Configuration and Price.
   * Runs in parallel to minimize wait time.
   */
  useEffect(() => {
    if (!membershipType) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. Get Razorpay Config
        const configRes = await api.get("/payment/config");
        setRzpConfig(configRes.data);

        // 2. Calculate Final Amount
        const amountRes = await api.post("/payment/preview", {
          purpose: "BUY_MEMBERSHIP",
          membershipType: membershipType,
          billing: selectedPlan.billing
        });
        setAmount(amountRes.data.amount);

      } catch (err) {
        console.error("OrderSummary Init Error:", err);
        setError("Unable to initialize checkout. Please check your connection.");
        toast.error("Failed to load checkout details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [membershipType, selectedPlan]);

  /* ==========================================================================
     Payment Handlers
     ========================================================================== */

  /**
   * Initiates the Razorpay order creation on the server.
   */
  const startPayment = async () => {
    setError("");
    const toastId = toast.loading("Initializing payment gateway...");

    try {
      const res = await api.post("/payment/create-order", {
        purpose: "BUY_MEMBERSHIP",
        membershipType: membershipType,
        billing: selectedPlan.billing
      });

      toast.dismiss(toastId);
      openRazorpay(res.data.orderId, res.data.amount);

    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Unable to create order. Please try again.");
      console.error(err);
    }
  };

  /**
   * Opens the Razorpay Checkout Modal.
   * @param {string} orderId - Server-generated Order ID.
   * @param {number} amount - Amount in standard units (e.g., INR).
   */
  const openRazorpay = (orderId, amount) => {
    if (!rzpConfig) return;

    const options = {
      key: rzpConfig.keyId,
      amount: amount * 100, // Razorpay expects paise
      currency: rzpConfig.currency,
      name: rzpConfig.company || "BookStack",
      description: `${membershipType} Plan (${selectedPlan.billing})`,
      order_id: orderId,

      handler: handlePaymentSuccess,

      modal: {
        ondismiss: () => toast.info("Payment cancelled.")
      },

      prefill: {
        name: registerData?.fullName,
        email: registerData?.email,
        contact: registerData?.phone
      },

      theme: { color: "#6366f1" } // Brand Indigo
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", (response) => {
      console.error("Payment Failed:", response.error);
      toast.error(response.error.description || "Payment failed.");
    });

    rzp.open();
  };

  /**
   * Handles successful payment callback from Razorpay.
   * Verifies signature on backend and activates membership.
   */
  const handlePaymentSuccess = async (response) => {
    const loadingToast = toast.loading("Verifying payment...");

    const payload = {
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      membershipType,
      billing: selectedPlan.billing,
      registerData
    };

    try {
      await api.post("/payment/success", payload);

      // Cleanup sensitive/temp data
      localStorage.removeItem("selectedPlan");
      localStorage.removeItem("registerData");

      toast.update(loadingToast, {
        render: "Membership Activated! Redirecting...",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.error("Verification Error:", err);
      toast.update(loadingToast, {
        render: "Payment received but activation failed. Contact support.",
        type: "error",
        isLoading: false
      });
    }
  };

  if (!selectedPlan || !registerData || isLoading) {
    return (
      <div className="body1 d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-secondary">Preparing checkout...</p>
      </div>
    );
  }

  /* ==========================================================================
     UI Render
     ========================================================================== */
  return (
    <div className="body1 d-flex flex-column min-vh-100">

      <main className="flex-grow-1 d-flex align-items-center justify-content-center order-page">
        <div className="container">

          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-7 col-sm-10">

              {/* Brand Header */}
              <div className="text-center mb-4">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <img className="logo-img" src={logo} alt="BookStack" />
                  <div className="logo-title">
                    <span style={{ color: "#0a0d9f" }}>Book</span>
                    <span style={{ color: "#111827" }}>Stack</span>
                  </div>
                </div>
              </div>

              {/* Order Summary Card */}
              <div className="content-card">
                <h3 className="font-montserrat text-center mb-4">Order Summary</h3>

                {/* Section: Registration Details */}
                <div className="mb-4">
                  <h6 className="text-uppercase text-secondary small fw-bold mb-3">
                    Registration Details
                  </h6>
                  <div className="summary-row">
                    <span className="summary-label">Name</span>
                    <span className="summary-value">{registerData.fullName}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Email</span>
                    <span className="summary-value text-truncate" style={{ maxWidth: '180px' }}>
                      {registerData.email}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Phone</span>
                    <span className="summary-value">{registerData.phone}</span>
                  </div>
                </div>

                {/* Section: Plan Details */}
                <div className="mb-4">
                  <h6 className="text-uppercase text-secondary small fw-bold mb-3">
                    Plan Details
                  </h6>
                  <div className="summary-row">
                    <span className="summary-label">Plan</span>
                    <span className="summary-value text-primary">{membershipType}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Billing Cycle</span>
                    <span className="summary-value text-capitalize">{selectedPlan.billing}</span>
                  </div>
                  <div className="summary-row border-0">
                    <span className="summary-label fs-5 text-dark fw-bold">Total</span>
                    <span className="summary-value fs-4 text-dark fw-bolder">
                      ₹{amount}
                    </span>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="alert alert-danger py-2 small text-center" role="alert">
                    {error}
                  </div>
                )}

                {/* Action Buttons */}
                <button
                  className="btn-outline"
                  onClick={startPayment}
                  disabled={!amount || !rzpConfig || isLoading}
                >
                  {isLoading ? 'Processing...' : `Pay ₹${amount} & Join`}
                </button>

                <div className="text-center mt-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-link-muted"
                  >
                    Cancel & Go Back
                  </button>
                </div>

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

import React, { useState } from "react";
import "./Membership.css";
import logo from "../../../assets/images/logo.png";
import Footer from "../../../components/Member/Footer/Footer";
import { Link } from "react-router-dom";

/**
 * Membership Component
 * ==========================================================================
 * Displays available membership tiers and pricing options.
 * Allows users to toggle between monthly/yearly billing and currency (INR/USD).
 *
 * Core Features:
 * - Dynamic Pricing: Updates based on selected billing cycle and currency.
 * - Plan Selection: Highlights the active plan for visual emphasis.
 * - FAQ Section: Addresses common user queries.
 *
 * @component
 * @example
 * return <Membership />
 */
function Membership() {
  /* ==========================================================================
     State Management
     ========================================================================== */
  const [billing, setBilling] = useState("monthly"); // 'monthly' | 'yearly'
  const [currency, setCurrency] = useState("INR");   // 'INR' | 'USD'
  const [activePlan, setActivePlan] = useState("premium");

  /**
   * Converts the price based on the selected currency.
   * Assumes a fixed conversion rate of 1 USD = 80 INR.
   *
   * @param {number} amount - The amount in INR.
   * @returns {string} Formatted price string (e.g., "$5" or "₹400").
   */
  const convert = (amount) => {
    if (currency === "USD") {
      return `$${Math.round(amount / 80)}`;
    }
    return `₹${amount}`;
  };

  /* ==========================================================================
     Data Configuration
     ========================================================================== */
  const plans = [
    {
      key: "basic",
      title: "Basic",
      desc: "For casual readers",
      monthly: 50,
      yearly: 500,
      features: [
        "3 Book Rent Limit",
        "7 Day Borrow Period",
        "1 Book Renewal Limit",
        "No New Book Access",
      ],
    },
    {
      key: "premium",
      title: "Premium",
      desc: "For power users",
      monthly: 300,
      yearly: 3000,
      features: [
        "7 Book Rent Limit",
        "14 Day Borrow Period",
        "2 Book Renewal Limit",
        "Full Access To New Books",
      ],
    },
    {
      key: "standard",
      title: "Standard",
      desc: "For avid readers",
      monthly: 150,
      yearly: 1500,
      features: [
        "5 Book Rent Limit",
        "10 Day Borrow Period",
        "2 Book Renewal Limit",
        "No New Book Access"
      ],
    },
  ];

  return (
    <div className="body1">
      <main className="container py-4">

        {/* 
          ----------------------------------------------------------------
          Hero Section
          Page title and value proposition.
          ---------------------------------------------------------------- 
        */}
        <div className="page-hero pt-2">
          <h1 className="font-montserrat display-4">
            Find Your Perfect Plan
          </h1>
          <p className="lead mb-4">
            Unlock a world of reading with our flexible membership options.
          </p>

          {/* Configuration Toggles */}
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">

            {/* Billing Cycle Toggle */}
            <div className="billing-toggle">
              <button
                className={`btn ${billing === "monthly" ? "active" : ""}`}
                onClick={() => setBilling("monthly")}
              >
                Monthly
              </button>
              <button
                className={`btn ${billing === "yearly" ? "active" : ""}`}
                onClick={() => setBilling("yearly")}
              >
                Yearly (Save 20%)
              </button>
            </div>

            {/* Currency Toggle */}
            <div className="billing-toggle">
              <button
                className={`btn ${currency === "INR" ? "active" : ""}`}
                onClick={() => setCurrency("INR")}
              >
                ₹
              </button>
              <button
                className={`btn ${currency === "USD" ? "active" : ""}`}
                onClick={() => setCurrency("USD")}
              >
                $
              </button>
            </div>
          </div>
        </div>

        {/* 
          ----------------------------------------------------------------
          Plans Grid
          Responsive grid displaying available membership tiers.
          ---------------------------------------------------------------- 
        */}
        <div className="row g-4 g-lg-5">
          {plans.map((plan) => {
            const price =
              billing === "monthly"
                ? convert(plan.monthly)
                : convert(plan.yearly);

            const isActive = activePlan === plan.key;

            return (
              <div className="col-lg-4" key={plan.key}>
                <div
                  className={`plan-card ${isActive ? "active" : ""}`}
                  onClick={() => setActivePlan(plan.key)}
                >
                  <h2 className={`font-montserrat ${isActive ? "text-white" : "text-black"}`}>
                    {plan.title}
                  </h2>

                  <p className={`text-secondary ${isActive ? "text-white" : "text-black"}`}>
                    {plan.desc}
                  </p>

                  <div className="my-4">
                    <span className={`display-4 fw-bold ${isActive ? "text-white" : "text-black"}`}>
                      {price}
                    </span>
                    <span className={`text-secondary ${isActive ? "text-white" : "text-black"}`}>
                      /{billing}
                    </span>
                  </div>

                  <ul className={`list-unstyled text-start mb-4 ${isActive ? "text-white" : "text-black"}`}>
                    {plan.features.map((f, i) => (
                      <li key={i} className="mb-2">
                        <i
                          className={`bi ${f.startsWith("No")
                            ? "bi-x-circle-fill"
                            : "bi-check-circle-fill"
                            } me-2`}
                        ></i>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="d-grid">
                    <button
                      className={isActive ? "btn btn-lg" : "btn btn-gradient-outline"}
                      onClick={() => {
                        localStorage.setItem("selectedPlan", JSON.stringify({
                          type: plan.title,          // Basic / Premium / Standard
                          billing: billing,          // monthly / yearly
                        }));
                        window.location.href = "/register";
                      }}
                    >
                      Choose Plan
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 
          ----------------------------------------------------------------
          FAQ Section
          Accordion displaying frequently asked questions.
          ---------------------------------------------------------------- 
        */}
        <div className="mt-5 pt-3 text-center">
          <h2 className="font-montserrat">Frequently Asked Questions</h2>
          <div className="accordion accordion-flush mt-3 mb-3 mx-auto faq-accordion" style={{ maxWidth: "800px" }} id="faqAccordion">

            {/* FAQ 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-1">Can I change my plan later?</button>
              </h2>
              <div id="faq-1" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-start">
                  Yes, you can upgrade or downgrade your plan anytime. Changes will be prorated and applied to the next billing cycle.
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-2">What happens if I have an overdue book?</button>
              </h2>
              <div id="faq-2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-start">
                  A fine of ₹5 per day applies for each overdue book. Borrowing privileges are suspended until the fine is cleared. Premium members are exempt.
                </div>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-3">Is there a physical library I can visit?</button>
              </h2>
              <div id="faq-3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body text-start">
                  BookStack is primarily an online management system. You can manage your account with your local library digitally. Please check with your library for physical locations and hours.
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer>
        <p>© 2025 BookStack. All Rights Reserved.</p>
      </Footer>
    </div>
  );
}

export default Membership;
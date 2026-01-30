import React, { useState } from "react";
import "./Membership.css";
import logo from "../../../assets/logo.png";
import Footer from "../../../components/Member/Footer/Footer";
import { Link } from "react-router-dom";

/*
  Membership Component
  --------------------
  Displays membership plans with:
  - Monthly / Yearly toggle
  - Currency toggle
  - Active plan highlighting
  - FAQ section
*/
function Membership() {
  const [billing, setBilling] = useState("monthly");
  const [currency, setCurrency] = useState("INR");
  const [activePlan, setActivePlan] = useState("premium");

  // Currency conversion helper
  const convert = (amount) => {
    if (currency === "USD") {
      return `$${Math.round(amount / 80)}`;
    }
    return `₹${amount}`;
  };

  const plans = [
    {
      key: "basic",
      title: "Basic",
      desc: "For casual readers",
      monthly: 50,
      yearly: 500,
      features: [
        "3 Book borrow limit",
        "7 Day borrow period",
        "No new book access",
      ],
    },
    {
      key: "premium",
      title: "Premium",
      desc: "For power users",
      monthly: 300,
      yearly: 3000,
      features: [
        "7 Book borrow limit",
        "14 Day borrow period",
        "3 Book reservations",
        "Full access to new books",
      ],
    },
    {
      key: "standard",
      title: "Standard",
      desc: "For avid readers",
      monthly: 150,
      yearly: 1500,
      features: [
        "5 Book borrow limit",
        "10 Day borrow period",
        "2 Book reservations",
      ],
    },
  ];

  return (
    <div className="body1">
      <main className="container py-4">

        {/* HERO */}
        <div className="page-hero mb-5">
          <h1 className="font-montserrat display-4">
            Find Your Perfect Plan
          </h1>
          <p className="lead">
            Unlock a world of reading with our flexible membership options.
          </p>

          {/* TOGGLES */}
          <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
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

        {/* PLANS */}
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
                          className={`bi ${
                            f.startsWith("No")
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
                          amount: billing === "monthly" ? plan.monthly : plan.yearly
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

        {/* FAQ */}
        <div className="mt-5 mb-3 pt-5 text-center">
          <h2 className="font-montserrat text-bold">
            Frequently Asked Questions
          </h2>

          <div
            className="accordion accordion-flush mt-4 mx-auto faq-accordion"
            style={{ maxWidth: "800px" }}
          >
            {/* FAQ items unchanged */}
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
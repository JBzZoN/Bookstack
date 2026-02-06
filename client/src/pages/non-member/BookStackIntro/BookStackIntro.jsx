import React from "react";
import "./BookStackIntro.css";

/* ==========================================================================
   Assets
   ========================================================================== */
import logo from "./../../../assets/images/logo.png";
import main1 from "./../../../assets/images/non-member/main1.png";
import main2 from "./../../../assets/images/non-member/main2.png";
import main3 from "./../../../assets/images/non-member/main3.png";
import main4 from "./../../../assets/images/non-member/main4.png";
import main5 from "./../../../assets/images/non-member/main5.png";
import main6 from "./../../../assets/images/non-member/main6.png";

/* ==========================================================================
   Routing Utilities
   ========================================================================== */
import { useNavigate, Link, Outlet } from "react-router-dom";

/**
 * BookStackIntro Component
 * 
 * The main landing and introduction page for non-authenticated users.
 * This component serves as the entry point to the application, highlighting
 * core features and value propositions before prompting the user to
 * sign up or log in.
 * 
 * Key Sections:
 * - Hero/Welcome Area: Brand introduction.
 * - Feature Showcase: Alternating rows detailing capabilities.
 * - Call to Actions (CTAs): Navigation to browsing or membership plans.
 * 
 * @component
 * @returns {JSX.Element} The rendered BookStack landing page.
 */
function BookStackIntro() {
  const navigate = useNavigate();

  /**
   * Handles navigation to the login page.
   * @deprecated logic currently unused; kept for potential future CTA binding.
   */
  const onLogin = () => {
    navigate("/login");
  };

  return (
    <div className="outer-body">
      <main className="container">

        {/* 
          ----------------------------------------------------------------
          Guest Access Call-to-Action
          Top banner encouraging immediate exploration without an account.
          ---------------------------------------------------------------- 
        */}
        <div className="cta-section1">
          <span className="top-text bold">
            Welcome to the BookStack Library
          </span>

          <span className="top-text ms-4">
            Browse our curated book collection freely. Login to borrow books.
          </span>

          <Link to="/books" className="btn-guest ms-3">
            <i className="bi bi-book"></i> Browse Collection
          </Link>
        </div>

        {/* 
          ----------------------------------------------------------------
          Hero Section
          Main value proposition and feature highlights.
          ---------------------------------------------------------------- 
        */}
        <section className="hero-section">
          <div className="hero-logo-container mb-5">
            <img src={logo} alt="BookStack Logo" className="hero-logo" />
            <div className="logo-text bold">
              <span className="book-part">Book</span>
              <span className="stack-part">Stack</span>
            </div>
          </div>

          <h1 className="font-montserrat">Dive Into Endless Knowledge</h1>

          <p>
            Discover, read offline, and track your reading journey.
            BookStack organizes your library experience with structured
            plans, smart recommendations, and member-friendly features.
          </p>

          <div className="hero-features">
            <div className="hero-feature">
              <i className="bi bi-book"></i> Offline Access
            </div>
            <div className="hero-feature">
              <i className="bi bi-star-fill me-2"></i>
              <i className="bi bi-chat-dots-fill me-2"></i>
              Ratings & Reviews
            </div>
            <div className="hero-feature">
              <i className="bi bi-bell"></i> Book Availability Alerts
            </div>
            <div className="hero-feature">
              <i className="bi bi-arrow-repeat"></i> Easy Renewal System
            </div>
            <div className="hero-feature">
              <i className="bi bi-search"></i> Smart Search
            </div>
          </div>
        </section>

        {/* 
          ----------------------------------------------------------------
          Feature Showcase
          Alternating layout rows displaying specific application features.
          ---------------------------------------------------------------- 
        */}
        <section className="feature-section mt-4">

          {/* Feature 1: Structured Plans */}
          <div className="feature-row">
            <img src={main1} className="feature-frame" alt="Structured Library Plans" />
            <div className="feature-text">
              <h2 className="feature-title bold">Structured Library Plans</h2>
              <p className="feature-desc">
                Organize books into categories and follow personalized plans.
              </p>
            </div>
          </div>

          {/* Feature 2: Offline Access (Reversed Layout) */}
          <div className="feature-row reverse">
            <img src={main2} className="feature-frame" alt="Offline Access" />
            <div className="feature-text">
              <h2 className="feature-title bold">Offline Access</h2>
              <p className="feature-desc">
                Access your collection anytime without interruptions.
              </p>
            </div>
          </div>

          {/* Feature 3: Ratings */}
          <div className="feature-row">
            <img src={main3} className="feature-frame" alt="Ratings and Feedback" />
            <div className="feature-text">
              <h2 className="feature-title bold">Ratings & Feedback</h2>
              <p className="feature-desc">
                Discover popular books through community feedback.
              </p>
            </div>
          </div>

          {/* Feature 4: Borrowing (Text Left) */}
          <div className="feature-row">
            <div className="feature-text">
              <h2 className="feature-title bold">
                Easy Borrowing & Smart Renewal
              </h2>
              <p className="feature-desc">
                Borrow and renew books seamlessly.
              </p>
            </div>
            <img src={main5} className="feature-frame" alt="Borrowing System" />
          </div>

          {/* Feature 5: Recommendations (Reversed) */}
          <div className="feature-row reverse">
            <div className="feature-text">
              <h2 className="feature-title bold">Smart Recommendations</h2>
              <p className="feature-desc">
                Personalized suggestions based on reading habits.
              </p>
            </div>
            <img src={main4} className="feature-frame" alt="Recommendations" />
          </div>

          {/* Feature 6: Alerts (Reversed) */}
          <div className="feature-row reverse">
            <img src={main6} className="feature-frame" alt="Availability Alerts" />
            <div className="feature-text">
              <h2 className="feature-title bold">Book Availability Alerts</h2>
              <p className="feature-desc">
                Get notified by email when an unavailable book becomes available.
              </p>
            </div>
          </div>

        </section>

        {/* 
          ----------------------------------------------------------------
          Final Call-to-Action
          Membership conversion prompt.
          ---------------------------------------------------------------- 
        */}
        <section className="cta-section2">
          <h2 className="bold">Start Your Structured Reading Journey Today</h2>
          <p id="para">
            Join readers who trust BookStack for an offline-friendly
            library experience.
          </p>

          <Link to="/membership" className="btn-subscribe me-5">
            <i className="bi bi-currency-dollar"></i> View Subscription Plans
          </Link>
        </section>

        {/* Footer */}
        <p className="footer">© 2025 BookStack. All Rights Reserved.</p>
      </main>

      <Outlet />
    </div>
  );
}

export default BookStackIntro;

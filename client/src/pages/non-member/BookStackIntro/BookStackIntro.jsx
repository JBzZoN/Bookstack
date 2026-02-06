import React from "react";
import "./BookStackIntro.css";

/* Assets */
import logo from "./../../../assets/logo.png";
import main1 from "./../../../assets/images/non-member/main1.png";
import main2 from "./../../../assets/images/non-member/main2.png";
import main3 from "./../../../assets/images/non-member/main3.png";
import main4 from "./../../../assets/images/non-member/main4.png";
import main5 from "./../../../assets/images/non-member/main5.png";

/* Routing utilities */
import { useNavigate, Link, Outlet } from "react-router-dom";

/*
  BookStackIntro Component
  -----------------------
  Landing page for non-members.
  Introduces BookStack features and provides navigation
  to Guest Mode, Login, and Membership plans.
*/
function BookStackIntro() {
  const navigate = useNavigate();

  // Reserved for future login navigation usage
  const onLogin = () => {
    navigate("/login");
  };

  return (
    <div className="outer-body">
      <main className="container">

        {/* Guest CTA */}
        <div className="cta-section1">
          <span className="top-text bold">
            Your Personalized Offline Library Experience
          </span>

          <span className="top-text ms-4 bold">
            Want to try the library?
          </span>

          <Link to="/guest" className="btn-guest ms-3">
            <i className="bi bi-person-bounding-box"></i> Guest Mode
          </Link>
        </div>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-logo-container mb-3">
            <img src={logo} alt="BookStack Logo" className="hero-logo" />
            <div className="logo-text bold">
              <span className="book-part">Mayur</span>
              <span className="stack-part">Josh</span>
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
              <i className="bi bi-kanban-fill"></i> Structured Plans
            </div>
            <div className="hero-feature">
              <i className="bi bi-arrow-repeat"></i> Easy Renewal System
            </div>
            <div className="hero-feature">
              <i className="bi bi-search"></i> Smart Search
            </div>
          </div>
        </section>

        {/* Feature Showcase */}
        <section className="feature-section">
          <div className="feature-row">
            <img src={main1} className="feature-frame" />
            <div className="feature-text">
              <h2 className="feature-title bold">Structured Library Plans</h2>
              <p className="feature-desc">
                Organize books into categories and follow personalized plans.
              </p>
            </div>
          </div>

          <div className="feature-row reverse">
            <img src={main2} className="feature-frame" />
            <div className="feature-text">
              <h2 className="feature-title bold">Offline Access</h2>
              <p className="feature-desc">
                Access your collection anytime without interruptions.
              </p>
            </div>
          </div>

          <div className="feature-row">
            <img src={main3} className="feature-frame" />
            <div className="feature-text">
              <h2 className="feature-title bold">Ratings & Feedback</h2>
              <p className="feature-desc">
                Discover popular books through community feedback.
              </p>
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-text">
              <h2 className="feature-title bold">
                Easy Borrowing & Smart Renewal
              </h2>
              <p className="feature-desc">
                Borrow and renew books seamlessly.
              </p>
            </div>
            <img src={main5} className="feature-frame" />
          </div>

          <div className="feature-row reverse">
            <div className="feature-text">
              <h2 className="feature-title bold">Smart Recommendations</h2>
              <p className="feature-desc">
                Personalized suggestions based on reading habits.
              </p>
            </div>
            <img src={main4} className="feature-frame" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section2">
          <h2 className="bold">Start Your Structured Reading Journey Today</h2>
          <p>
            Join readers who trust BookStack for an offline-friendly
            library experience.
          </p>

          <Link to="/membership" className="btn-subscribe me-3">
            <i className="bi bi-currency-dollar"></i> View Subscription Plans
          </Link>

          <Link to="/login" className="btn-subscribe me-3">
            Login
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

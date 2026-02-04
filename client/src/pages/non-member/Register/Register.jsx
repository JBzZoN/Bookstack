import React, { useState } from "react";
import "./Register.css";

/* ==========================================================================
   Routing & Utilities
   ========================================================================== */
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

/**
 * Register Component
 * ==========================================================================
 * Handles user registration for new accounts.
 * Collects personal information including Name, Email, DOB, and Credentials.
 * 
 * Key Features:
 * - Real-time state management for form inputs.
 * - Comprehensive client-side validation (Age, Phone format, Length limits).
 * - Temporary local storage persistence for multi-step checkout flows.
 *
 * @component
 * @returns {JSX.Element} The registration form.
 */
function Register() {
  const navigate = useNavigate();

  /* ==========================================================================
     State Management
     ========================================================================== */
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    username: "",
    password: ""
  });

  /* ==========================================================================
     Lifecycle Hooks (Persistence)
     ========================================================================== */

  /**
   * Load saved draft from localStorage on component mount.
   * This allows users to resume their registration if they return to the page.
   */
  React.useEffect(() => {
    const savedData = localStorage.getItem("registerData");
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Failed to parse saved registration data:", error);
      }
    }
  }, []);

  /**
   * Auto-save form data to localStorage whenever it changes.
   * Acts as a draft mechanism.
   */
  React.useEffect(() => {
    localStorage.setItem("registerData", JSON.stringify(formData));
  }, [formData]);

  /* ==========================================================================
     Event Handlers
     ========================================================================== */

  /**
   * Updates state on input change.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Validate Date of Birth.
   * Rules:
   * 1. Date cannot be in the future.
   * 2. User must be at least 13 years old.
   * 
   * @param {string} dobString - YYYY-MM-DD format
   * @returns {boolean} True if valid, false otherwise (triggers toast).
   */
  const validateDOB = (dobString) => {
    const inputDate = new Date(dobString);
    const today = new Date();

    // Reset time for accurate date comparison
    today.setHours(0, 0, 0, 0);

    // Check 1: Future Date
    if (inputDate > today) {
      toast.error("Date of Birth cannot be in the future");
      return false;
    }

    // Check 2: Minimum Age (13)
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 13);

    if (inputDate > minAgeDate) {
      toast.error("You must be at least 13 years old to register");
      return false;
    }

    return true;
  };

  /**
   * Form Submission Handler.
   * Validates all inputs before persisting data and navigating.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    /* --- Validation Start --- */

    // Phone Validation (Exact 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    // Length Constraints
    if (formData.fullName.length > 30) {
      toast.error("Full Name cannot exceed 30 characters");
      return;
    }

    if (formData.email.length > 30) {
      toast.error("Email cannot exceed 30 characters");
      return;
    }

    if (formData.username.length > 15) {
      toast.error("Username cannot exceed 15 characters");
      return;
    }

    // Date of Birth Validation
    if (!validateDOB(formData.dob)) {
      return;
    }

    /* --- Validation End --- */

    // Store register data temporarily for the next checkout step
    localStorage.setItem(
      "registerData",
      JSON.stringify(formData)
    );

    // Navigate to Order Summary
    toast.success("Registration details saved. Proceeding to payment...");
    navigate("/order-summary");
  };

  return (
    <div className="body1">
      <div className="registration-page container d-flex align-items-center">
        <div className="row justify-content-center w-100">
          <div className="col-lg-10 col-md-12">

            {/* Content Card */}
            <div className="mt-5 mb-5 content-card p-4">
              <h3 className="font-montserrat mb-4">
                Membership Registration & Payment
              </h3>

              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control form-control-lg"
                    required
                    maxLength={30}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    required
                    maxLength={30}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control form-control-lg"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10 digit mobile number"
                  />
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Address</label>
                  <textarea
                    name="address"
                    rows="2"
                    className="form-control form-control-lg"
                    required
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                {/* Date of Birth */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control form-control-lg"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>

                {/* Username */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control form-control-lg"
                    required
                    maxLength={15}
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Action */}
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-outline">
                    Continue to Payment
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

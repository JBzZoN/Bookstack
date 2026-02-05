import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ReviewSection.css";
import avatar from "./../../../assets/images/member/avatar.png";
import EmptyState from "../EmptyState/EmptyState";

const API = "http://localhost:7070";

/**
 * ReviewsSection Component
 * ==========================================================================
 * Manages the display and submission of book reviews.
 * 
 * Features:
 * - Fetches and displays a list of reviews for a specific book.
 * - Allows authenticated users to submit a new review (rating + comment).
 * - Implements a toggleable review form.
 * - Handles user identity via localStorage and custom headers.
 * 
 * @param {Object} props
 * @param {string|number} props.bookId - Unique identifier of the book.
 */
function ReviewsSection({ bookId }) {
  /* ==========================================================================
     State Management
     ========================================================================== */
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Authentication Context
  const token = localStorage.getItem("token");

  /* ==========================================================================
     Data Fetching (Effects & Handlers)
     ========================================================================== */

  /**
   * Fetch Reviews from Backend
   * --------------------------------------------------------------------------
   * Retrieves the list of reviews for the current book. 
   * Includes X-User-Id header for personalized context if available.
   */
  const loadReviews = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const userId = currentUser ? currentUser.userId : null;

      const res = await axios.get(
        `${API}/member/books/${bookId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Id": userId
          }
        }
      );
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to load reviews", err);
    }
  };

  /**
   * Reload reviews whenever the bookId changes.
   */
  useEffect(() => {
    if (bookId) loadReviews();
  }, [bookId]);

  /* ==========================================================================
     Event Handlers
     ========================================================================== */

  /**
   * Submit New Review
   * --------------------------------------------------------------------------
   * Validates input, checks authentication, and posts the review to the backend.
   * Reloads the review list on successful submission.
   */
  const handleSubmit = async () => {
    if (!comment.trim() || rating < 1 || rating > 5) {
      alert("Please add rating (1–5) and comment");
      return;
    }

    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const userId = currentUser ? currentUser.userId : null;

      if (!userId) {
        alert("Please log in to submit a review");
        return;
      }

      await axios.post(
        `${API}/member/books/${bookId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-User-Id": userId
          }
        }
      );

      await loadReviews();

      setComment("");
      setRating(0);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to submit review", err);
      alert(err.response?.data?.message || "Error submitting review");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="reviews-container my-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="reviews-title">Reviews</h2>
        <button
          className="btn btn-gradient-outline btn-sm"
          onClick={() => setShowForm(!showForm)}
        >
          Write a review
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="card mb-4">
          <div className="card-body">

            {/* Star Rating */}
            <div className="mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <i
                  key={star}
                  className={`bi ${star <= rating ? "bi-star-fill text-warning" : "bi-star"
                    } review-star`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Write your review..."
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <button className="btn btn-outline" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      )}


      {/* SCROLLABLE REVIEWS */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">

            {/* SCROLL CONTAINER */}
            <div className="review-scroll-box">

              {reviews && reviews.length > 0 ? (
                reviews.map((review, i) => (
                  <div key={i} className="review-card mb-3">

                    <table className="w-100">
                      <tbody>
                        <tr>
                          {/* COLUMN 1: AVATAR */}
                          <td className="align-top" style={{ width: "48px" }}>
                            <img
                              src={avatar}
                              alt="avatar"
                              className="review-avatar"
                            />
                          </td>

                          {/* COLUMN 2: CONTENT */}
                          <td className="ps-2">

                            {/* ROW 1: USERNAME + RATING */}
                            <div className="d-flex align-items-center mb-1">
                              <strong className="me-auto margintoleft">
                                {review.userName || `User #${review.userId}`}
                              </strong>

                              <div className="text-warning">
                                {[...Array(review.rating)].map((_, j) => (
                                  <i key={j} className="bi bi-star-fill"></i>
                                ))}
                              </div>
                            </div>

                            {/* ROW 2: COMMENT */}
                            <p className="mb-0 review-comment">
                              {review.comment}
                            </p>

                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                ))
              ) : (
                <EmptyState message="No reviews yet. Be the first to share your thoughts!" />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsSection;

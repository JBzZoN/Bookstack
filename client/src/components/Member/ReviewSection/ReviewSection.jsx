import React, { useEffect, useState } from "react";
import axios from "axios";

function ReviewsSection({ bookId }) {
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  /* ---------------- FETCH REVIEWS ---------------- */

  useEffect(() => {
    axios
      .get(`http://localhost:7070/member/books/${bookId}/reviews`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [bookId]);

  /* ---------------- SUBMIT REVIEW ---------------- */

  const handleSubmit = async () => {
    if (!comment || rating === 0) {
      alert("Please add rating and comment");
      return;
    }

    await axios.post(
      `http://localhost:7070/member/books/${bookId}/reviews`,
      { comment, rating }
    );

    // reload reviews
    const res = await axios.get(
      `http://localhost:7070/member/books/${bookId}/reviews`
    );
    setReviews(res.data);

    setComment("");
    setRating(0);
    setShowForm(false);
  };

  /* ---------------- UI ---------------- */

  const hasScroll = reviews.length > 3;

  return (
    <div className="my-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="font-montserrat">Reviews</h2>
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
                  className={`bi ${
                    star <= rating ? "bi-star-fill text-warning" : "bi-star"
                  } me-1`}
                  style={{ cursor: "pointer", fontSize: "1.3rem" }}
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

      {/* Reviews List */}
      <div
        className="review-list"
        style={{
          maxHeight: hasScroll ? "320px" : "auto",
          overflowY: hasScroll ? "auto" : "visible"
        }}
      >
        {reviews.slice(0).map((review, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">

              <div className="d-flex align-items-center mb-2">
                <img
                  src={review.userAvatar || "https://placehold.co/40"}
                  className="rounded-circle me-2"
                  alt="Avatar"
                />

                <strong>{review.userName}</strong>

                <div className="text-warning ms-auto">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill"></i>
                  ))}
                </div>
              </div>

              <p className="mb-0">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ReviewsSection;

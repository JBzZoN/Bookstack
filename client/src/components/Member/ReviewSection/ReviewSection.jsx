import React, { useState } from "react";

function ReviewsSection() {
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    if (!comment || rating === 0) {
      alert("Please add rating and comment");
      return;
    }

    // later: API call here
    console.log({ comment, rating });

    setComment("");
    setRating(0);
    setShowForm(false);
  };

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
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi ${
                    star <= rating ? "bi-star-fill text-warning" : "bi-star"
                  } me-1`}
                  style={{ cursor: "pointer", fontSize: "1.3rem" }}
                  onClick={() => setRating(star)}
                ></i>
              ))}
            </div>

            {/* Comment Input */}
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button className="btn btn-outline" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Existing Review */}
      <div className="card">
        <div className="card-body">

          <div className="d-flex align-items-center mb-2">
            <img
              src="https://placehold.co/40x40/e0e7ff/4338ca?text=J"
              className="rounded-circle me-2"
              alt="Avatar"
            />

            <strong>Jane Doe</strong>

            <div className="text-warning ms-auto">
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
          </div>

          <p className="mb-0">
            An absolutely captivating read! The concept is so unique and
            thought-provoking. I couldn't put it down and finished it in just two
            days. Highly recommended!
          </p>

        </div>
      </div>

    </div>
  );
}

export default ReviewsSection;

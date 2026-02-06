import React from "react";
import "./BookCard.css";

/* ==========================================================================
   Assets & Logic
   ========================================================================== */
import heartFilled from "./../../../assets/images/heart-filled.png";
import heartOutline from "./../../../assets/images/heart-outline.png";
import star from "./../../../assets/images/member/star.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, syncLikeWithBackend } from "../../../redux/slices/likeSlice";

/**
 * BookCard Component
 * ==========================================================================
 * Displays a single book's preview information and interaction controls.
 * 
 * Features:
 * - Visual: Shows book cover, title, author, and rating.
 * - Interaction: 
 *   - Clicking the card navigates to the book link.
 *   - Clicking the heart icon toggles the "Like" status (Redux + Backend).
 * - Optimization: Uses proper Redux selectors for efficient re-renders.
 *
 * @param {Object} props
 * @param {number|string} props.bookId - Unique identifier for the book.
 * @param {string} props.title - Book title.
 * @param {string} props.author - Author name.
 * @param {string} props.image - URL for the book cover image.
 * @param {number} props.rating - Average rating score.
 * @param {string} props.link - Navigation URL for the book details.
 * @returns {JSX.Element} A card component representing a book.
 */
function BookCard({ bookId, title, author, image, rating, link }) {
  const dispatch = useDispatch();

  /* ==========================================================================
     State (Redux)
     ========================================================================== */
  const liked = useSelector(
    (state) => state.likes.byBookId[bookId] ?? false
  );

  /* ==========================================================================
     Event Handlers
     ========================================================================== */

  /**
   * Toggles the like status of the book.
   * Uses optimistic UI updates for immediate feedback, then syncs with backend.
   * 
   * @param {React.MouseEvent} e - The click event.
   */
  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent card navigation when clicking like

    // 1. Optimistic UI Update
    dispatch(toggleLike(bookId));

    // 2. Backend Synchronization
    dispatch(syncLikeWithBackend(bookId));
  };

  /* ==========================================================================
     Render
     ========================================================================== */
  return (
    <div className="book-card" onClick={() => (window.location = link)}>

      {/* Book Cover */}
      <img className="book-cover" src={image} alt={title} />

      {/* Book Details */}
      <table className="card-table">
        <tbody>
          <tr>
            {/* Left Col: Info */}
            <td className="info-cell">
              <h6>{title}</h6>
              <div className="author">{author}</div>

              <div className="rating">
                <h3 className="rating-value">{typeof rating === 'number' ? rating.toFixed(1) : rating}</h3>
                <img
                  className="rating-star"
                  src={star}
                  alt="rating star"
                />
              </div>
            </td>

            {/* Right Col: Like Button */}
            <td className="like-cell">
              <span className="heart-wrapper" onClick={handleLikeClick}>
                <img
                  src={liked ? heartFilled : heartOutline}
                  alt={liked ? "Unlike" : "Like"}
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookCard;

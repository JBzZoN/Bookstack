import React, { useState } from 'react';
import './BookCard.css';
import heartFilled from './../../../assets/heart-filled.png/';
import heartOutline from './../../../assets/heart-outline.png';
import star from './../../../assets/images/member/star.png';

function BookCard({ title, author, image, rating, like, link }) {
  const [liked, setLiked] = useState(like);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setLiked(prev => !prev);
  };

  return (
    <div className="book-card" onClick={() => window.location = link}>

      <img src={image} alt={title} />

      <table className="card-table">
        <tbody>
          <tr>
            <td className="info-cell">
              <h6>{title}</h6>
              <div className="author">{author}</div>

              <div className='rating'>
                <h3 className="rating-value">{rating}</h3>
                <img id="star" src={star} alt="rating star" />
              </div>
            </td>

            <td className="like-cell">
            <span
              className={`heart-wrapper ${liked ? 'liked' : ''}`}
              onClick={handleLikeClick}
            >
              <img
                src={liked ? heartFilled : heartOutline}
                alt="like"
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

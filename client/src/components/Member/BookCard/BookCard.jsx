import React from 'react'
import './BookCard.css'

function BookCard({ title, author, image, link }) {
  return (
    <div className="book-card" onClick={() => window.location = link}>
      <img src={image} alt={title}/>

      <div className="card-body">
        <h6>{title}</h6>
        <div className="small">{author}</div>
      </div>
    </div>
  )
}

export default BookCard

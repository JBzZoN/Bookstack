import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import "./book-profile.css"

function BookProfile() {

  const location = useLocation()

  const genreColorMap = {
      "Fantasy": "text-bg-primary",
      "Science Fiction": "text-bg-info",
      "Fiction": "text-bg-secondary",
      "Non-Fiction": "text-bg-dark",
      "History": "text-bg-warning",
      "Biography & Memoir": "text-bg-success",
      "Business & Economics": "text-bg-success",
      "Philosophy": "text-bg-light",
      "Psychology": "text-bg-info",
      "Programming & Technology": "text-bg-warning",
      "Science": "text-bg-primary",
      "Self-Help": "text-bg-warning"
  }

  const book = location.state.book

  return (
    <div className="container s-book-container-lol mb-5">

      <div className="card s-book-card-lol">

        {/* Gradient header */}
        <div className="s-book-header"></div>

        {/* Image INSIDE the card */}
        <div className="s-book-image-wrapper">
          <img
            src={book.bookImage.startsWith("http")
              ? book.bookImage
              : `http://localhost:30080/book/image/${book.bookImage}`}
            className="s-book-image-lol"
            alt="book"
          />
        </div>

        <div className="card-body s-book-body">
          <table className="table s-book-table">
            <tbody>
              <tr>
                <td>Title</td>
                <td>{book.title}</td>
              </tr>

              <tr>
                <td>Author</td>
                <td>{book.author}</td>
              </tr>

              <tr>
                <td>Genres</td>
                <td>
                  {book.genreList?.map((a, index) => (
                    <span
                      key={index}
                      className={`badge rounded-pill me-1 ${genreColorMap[a] || "text-bg-secondary"}`}
                    >
                      {a}
                    </span>
                  ))}
                </td>
              </tr>

              <tr>
                <td>Summary</td>
                <td className="s-book-summary">{book.description}</td>
              </tr>
            </tbody>
          </table>

          <Link to="/staff/books" className="btn btn-primary s-go-back">
            ← Go Back
          </Link>
        </div>

      </div>
    </div>
  )
}

export default BookProfile

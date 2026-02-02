import React from "react";

const BookDetail = ({ book, onClose }) => {
  const themeColors = {
    primary: "#4f0bc5",
    secondary: "#ec5e75",
    cardBackground: "#ffffff",
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1000, padding: "20px" }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: themeColors.cardBackground,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cross button */}
        <button
          onClick={onClose}
          className="btn position-absolute"
          style={{
            top: "10px",
            right: "10px",
            backgroundColor: themeColors.secondary,
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            fontSize: "18px",
            fontWeight: "bold",
            lineHeight: "1",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          &times;
        </button>

        {/* Image */}
        <div style={{ backgroundColor: "#f8f9fa", height: "350px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src={book.book_image}
            alt={book.title}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Details */}
        <div className="p-3">
          <h3 style={{ color: themeColors.primary }}>{book.title}</h3>
          <p style={{ color: themeColors.secondary }}>
            <strong>Author:</strong> {book.author}
          </p>
          <p style={{ color: themeColors.secondary }}>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p style={{ color: themeColors.secondary }}>
            <strong>Copies:</strong> {book.number_of_copies} | <strong>Remaining:</strong>{" "}
            {book.number_of_copies_remaining}
          </p>
          <p>
            <span
              className="badge"
              style={{
                backgroundColor:
                  book.action === "CREATED" ? themeColors.primary : themeColors.secondary,
                color: "#fff",
              }}
            >
              {book.action}
            </span>
          </p>
          <p className="text-muted">
            Created: {new Date(book.created_at).toLocaleString()}
          </p>
          <p className="text-muted">
            Updated: {new Date(book.updated_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

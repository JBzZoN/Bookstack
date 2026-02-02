import React, { useEffect, useState } from "react";
import axios from "axios";
import BookDetail from "./BookDetail";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
        const res = await axios.get("http://localhost:7070/admin/allbooks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch books. Check the server and token.");
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading)
    return <p className="text-center mt-5 text-secondary">Loading books...</p>;
  if (error)
    return <p className="text-center mt-5 text-danger">{error}</p>;

  const themeColors = {
    primary: "#4f0bc5",
    secondary: "#ec5e75",
    background: "linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))",
    cardBackground: "#f3f2f7",
  };

  return (
    <div
      className="container my-5 p-4 rounded shadow"
      style={{ backgroundColor: "#f4f2f8" }}
    >
      {/* Heading */}
      <h1
        className="text-center mb-5 display-4 fw-bold"
        style={{
          background: themeColors.background,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Books Dashboard
      </h1>

      {/* Books Grid */}
      <div className="row g-4">
        {books.map((book) => (
          <div key={book.book_id} className="col-sm-12 col-md-6 col-lg-4">
            <div
              className="card shadow-sm h-100 border-0"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                backgroundColor: themeColors.cardBackground,
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
              }}
            >
              {/* Image Container */}
              <div
                style={{
                  height: "220px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <img
                  src={book.book_image || "/placeholder.png"} // fallback image
                  alt={book.title}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s",
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title fw-bold mb-2"
                  style={{ color: themeColors.primary }}
                >
                  {book.title}
                </h5>
                <p
                  className="card-text mb-3"
                  style={{ color: themeColors.secondary }}
                >
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <button
                  className="btn mt-auto"
                  style={{
                    background: themeColors.background,
                    color: "#fff",
                    border: "none",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    transition: "transform 0.2s",
                  }}
                  onClick={() => setSelectedBook(book)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
};

export default Books;

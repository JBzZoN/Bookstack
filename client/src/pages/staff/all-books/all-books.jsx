import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './all-books.css'
import axios from "axios"
import { toast } from 'react-toastify'
import Title from '../../../components/staff/title/title'

/**
 * AllStaffBooks Component
 * ==========================================================================
 * Displays a grid of all books in the library for staff management.
 * 
 * Features:
 * - Visual Feedback: Maps genres to specific Bootstrap badge colors.
 * - Dynamic Data: Fetches all books and then iteratively retrieves genres for each.
 * - Management Actions: Provides "More info" navigation and a "Remove" placeholder.
 * - Responsive Grid: Uses a CSS Grid for flexible layout.
 *
 * @component
 * @returns {JSX.Element} The books management grid.
 */
function AllStaffBooks() {

    /* ==========================================================================
       Configuration & Helpers
       ========================================================================== */

    /**
     * Color mapping for specific genres.
     */
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

    const onRemove = () => {
        toast.info("Removal request sent")
    }

    /* ==========================================================================
       Data Fetching (Effects & Handlers)
       ========================================================================== */

    const navigate = useNavigate()
    const [bookData, setBookData] = useState([])

    /**
     * Fetches all books and their respective genres.
     * Logic:
     * 1. GET /book/all to get basic book data.
     * 2. Iteratively GET /staff/book/{id} to append genre lists.
     */
    async function getAllBooks() {
        const response = await axios.get(
            "http://localhost:7070/book/all",
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } }
        )
        const data = response.data

        for (let i = 0; i < data.length; i++) {
            const response = await axios.get(
                "http://localhost:7070/staff/book/" + data[i].bookId,
                { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } }
            )
            data[i].genreList = response.data
        }
        setBookData(data)
    }

    useEffect(() => {
        getAllBooks()
    }, [])

    return (
        <div className="container mb-5 all-books-page">

            <Title string={"All books"} />

            {/* ✅ CSS GRID WRAPPER */}
            <div className="books-grid">
                {bookData.map((e) => (
                    <div className="card book-card" key={e.bookId}>

                        <img
                            src={e.bookImage.startsWith("http") ? e.bookImage : `http://localhost:7070/book/image/${e.bookImage}`}
                            className="card-img-top book-image"
                            alt="book"
                            style={{ height: "250px" }}
                        />

                        <div className="card-body">
                            <h6 className="card-title small-text book-title">
                                {e.title}
                            </h6>

                            <div className="book-genres">
                                {e.genreList?.slice(0, 2).map((a, index) => (
                                    <span
                                        key={index}
                                        className={`badge rounded-pill me-1 ${genreColorMap[a] || "text-bg-secondary"}`}
                                    >
                                        {a}
                                    </span>
                                ))}
                                {e.genreList.length > 2 && (
                                    <span className="badge rounded-pill text-bg-info">
                                        +{e.genreList.length - 2}
                                    </span>
                                )}

                            </div>
                        </div>

                        <div className="card-footer book-footer">
                            <button
                                className="btn btn-outline-primary smaller-text frame-btn"
                                onClick={() => {
                                    navigate("/staff/books/profile", { state: { book: e } })
                                }}
                            >
                                More info
                            </button>

                            <button
                                className="btn btn-outline-danger smaller-text frame-btn"
                                onClick={onRemove}
                            >
                                Remove
                            </button>

                        </div>

                    </div>
                ))}
            </div>

        </div>
    )
}

export default AllStaffBooks

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './all-books.css'
import axios from "axios"
import { toast } from 'react-toastify'
import Title from '../../../components/staff/title/title'

function AllStaffBooks() {

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

    const navigate = useNavigate()
    const [bookData, setBookData] = useState([])

    async function getAllBooks() {
        const response = await axios.get(
            "http://localhost:30080/book/all",
            { headers: { "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}` } }
        )
        const data = response.data

        console.log(data)
        for (let i = 0; i < data.length; i++) {
            const response = await axios.get(
                "http://localhost:30080/staff/book/" + data[i].bookId,
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
                            src={e.bookImage.startsWith("http") ? e.bookImage : `http://localhost:30080/book/image/${e.bookImage}`}
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

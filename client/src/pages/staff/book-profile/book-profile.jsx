import React from 'react'
import { useLocation } from 'react-router-dom'
import "./book-profile.css";
import { Link } from 'react-router-dom';
import Title from './../../../components/staff/title/title';

function BookProfile() {
  
  const location = useLocation();
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
        "Programming & Technology": "text-bg-danger",
        "Science": "text-bg-primary",
        "Self-Help": "text-bg-warning"
    };

  const book = location.state.book;
  return (
    <div>
    <div className='container book-container mb-5'>
        <div className="card book position-relative">
            <div className="position-absolute top-0 start-50 translate-middle whitener"></div>
            <img src={book.image.startsWith("http") ? book.image : `http://localhost:7070/staff/image/${book.image}`} className='position-absolute top-0 start-50 translate-middle book-image' alt="" />
            <div className="card-body mt-5">
                <table className='table table-striped mt-4'>
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
                            <td>Author</td>
                            <td>
                        {book.genreList?.map((a, index) => (
                            <span
                            key={index}
                            className={`badge rounded-pill me-1 ${genreColorMap[a] || "text-bg-secondary"}`}
                            >
                            {a}
                            </span>
                        ))}</td>
                        </tr>
                        
                        <tr>
                            <td>Summary</td>
                            <td>{book.description}</td>
                        </tr>
                        
                    </tbody>
                </table>
                <Link to="/staff/books" className="btn btn-primary go-back">Go Back</Link>
            </div>
            </div>
    </div>
    </div>
  )
}

export default BookProfile

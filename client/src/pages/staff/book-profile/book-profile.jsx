import React from 'react'
import { useLocation } from 'react-router-dom'
import "./book-profile.css";
import { Link } from 'react-router-dom';
import Title from './../../../components/staff/title/title';

function BookProfile() {
  
  const location = useLocation();
  const book = location.state.book;
  return (
    <div>
    <div className='container book-container mb-5'>
        <div className="card book position-relative">
            <div className="position-absolute top-0 start-50 translate-middle whitener"></div>
            <img src={book.image} className='position-absolute top-0 start-50 translate-middle book-image' alt="" />
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

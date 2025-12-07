import React from 'react'
import { useLocation } from 'react-router-dom'
import "./book-profile.css";
import { Link } from 'react-router-dom';
import Title from './../../../components/staff/title/title';

function BookProfile() {
  
  const location = useLocation();
  const book = location.state.book;
  console.log(book)
  return (
    <div>
    <div className='container book-container mb-5'>
        <div className="card book position-relative">
            <div className="position-absolute top-0 start-50 translate-middle whitener"></div>
            <img src={book.formats['image/jpeg']} className='position-absolute top-0 start-50 translate-middle book-image' alt="" />
            <div class="card-body mt-5">
                <table className='table table-striped mt-4'>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>{book.title}</td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td>{book.authors[0].name}</td>
                        </tr>
                        
                        <tr>
                            <td>Summary</td>
                            <td>{book.summaries[0]}</td>
                        </tr>
                        
                    </tbody>
                </table>
                <Link to="/staff/books" class="btn btn-primary go-back">Go Back</Link>
            </div>
            </div>
    </div>
    </div>
  )
}

export default BookProfile

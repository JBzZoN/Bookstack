import React from 'react'
import '../MemberHome/MemberHome.css'
import { recommendedBooks } from '../../../dummy-data/recommended-books.js';
import { Link } from 'react-router-dom';  
import { newArrivals } from '../../../dummy-data/new-arrivals.js';
import { trendingBooks } from '../../../dummy-data/trending-books.js';
import BookCard from '../../../components/Member/BookCard/BookCard.jsx';

function MemberHome() {
  return (
    <div>
      <div className='container mt-5 py-5'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators paragraph-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/banner1.png" className="d-block w-100" alt="slide1" />
            </div>
            <div className="carousel-item">
              <img src="/images/banner2.png" className="d-block w-100" alt="slide2" />
            </div>
            <div className="carousel-item">
              <img src="/images/banner3.png" className="d-block w-100" alt="slide3" />
            </div>
            <div className="carousel-item">
              <img src="/images/banner4.png" className="d-block w-100" alt="slide4" />
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        
        <div>
          {/* Recommended Books */}
          <div className='container d-flex justify-content-between align-items-center'>
            <h1 className='home-h1 mt-4'>Recommended Books</h1> 
            <Link to="/member/view"><h3 className='home-h3 mt-4'>View All</h3></Link>    
          </div>

          <div className="horizontal-scroll">
            { 
              recommendedBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  link={`/member/book/${book.id}`}
                />
              ))
            }
          </div>
        </div>
        
        {/* Trending Books */}
        <div>
          <div className='container d-flex justify-content-between align-items-center'>
            <h1 className='home-h1 mt-4'>Trending Books</h1> 
            <Link to="/member/view"><h3 className='home-h3 mt-4'>View All</h3></Link>    
          </div>

          <div className="horizontal-scroll">
            { 
              trendingBooks.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  link={`/member/book/${book.id}`}
                />
              ))
            }
          </div>
        </div>

        {/* Quote Section */}
        <div className="quote-section">
          <h2 className="font-montserrat">Today's Quote</h2>
          <blockquote className="blockquote fs-4 fst-italic mt-3">
            "A reader lives a thousand lives before he dies . . . The man who never reads lives only one."
          </blockquote>
          <figcaption className="blockquote-footer text-white-50 mt-2 fs-6">
            George R.R. Martin
          </figcaption>
        </div>

        {/* New Arrivals */}
        <div>
          <div className="container d-flex align-items-center justify-content-between">
            <div className="d-flex gap-2">
              <h1 className="home-h1 mt-4">New Arrivals</h1>
              <h2 className="home-h2 mt-4">(Premium)</h2>
            </div>

            <Link to="/member/view"><h3 className="home-h3 mt-4">View All</h3></Link>
          </div>

          <div className="horizontal-scroll">
            { 
              newArrivals.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  link={`/member/book/${book.id}`}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberHome

import React from 'react'
import '../MemberHome/MemberHome.css'
import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { loadLikesFromBackend } from "../../../redux/slices/likeSlice.js";
import BookCard from '../../../components/Member/BookCard/BookCard.jsx';
import banner1 from '../../../assets/images/member/banner1.png';
import banner2 from '../../../assets/images/member/banner2.png';
import banner3 from '../../../assets/images/member/banner3.png';
import banner4 from '../../../assets/images/member/banner4.png';
import banner5 from '../../../assets/images/member/banner5.png';
import banner6 from '../../../assets/images/member/banner6.png';
import banner7 from '../../../assets/images/member/banner7.png';
import api from '../../../api/api'
import { toast } from 'react-toastify';

function MemberHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 🔥 Load likes once when page opens
    dispatch(loadLikesFromBackend());
  }, [dispatch]);

  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [newArrivedBooks, setNewArrivedBooks] = useState([]);
  const [todaysQuote, setTodaysQuote] = useState({
    quote: "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.",
    author: "George R.R. Martin"
  });

  useEffect(() => {
    // Fetch daily quote
    fetch('https://dummyjson.com/quotes/random')
      .then(res => res.json())
      .then(data => {
        setTodaysQuote({
          quote: data.quote,
          author: data.author
        });
      })
      .catch(err => {
        console.error("Failed to fetch quote", err);
        // Fallback to default quote is handled by initial state
      });
  }, []);

  useEffect(() => {
    api.get("/member/recommended-books")
      .then(res => {
        setRecommendedBooks(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Failed to fetch books", err);
        toast.error("Failed to load recommended books");
        setRecommendedBooks([]);
      });

    api.get("/member/trending-books")
      .then(res => {
        setTrendingBooks(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => { // Corrected the trending books catch block
        console.error("Failed to fetch books", err);
        toast.error("Failed to load trending books");
        setTrendingBooks([]);
      });

    api.get("/member/new-arrived-books")
      .then(res => {
        setNewArrivedBooks(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Failed to fetch books", err);
        toast.error("Failed to load new arrived books"); // Added toast.error for new arrived books
        setNewArrivedBooks([]);
      });
  }, []);

  return (
    <div className='p-2'>
      <div className='container mt-5 py-5'>
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators paragraph-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="6" aria-label="Slide 7"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={banner1} className="d-block w-100" alt="slide1" />
            </div>
            <div className="carousel-item">
              <img src={banner2} className="d-block w-100" alt="slide2" />
            </div>
            <div className="carousel-item">
              <img src={banner3} className="d-block w-100" alt="slide3" />
            </div>
            <div className="carousel-item">
              <img src={banner4} className="d-block w-100" alt="slide4" />
            </div>
            <div className="carousel-item">
              <img src={banner5} className="d-block w-100" alt="slide5" />
            </div>
            <div className="carousel-item">
              <img src={banner6} className="d-block w-100" alt="slide6" />
            </div>
            <div className="carousel-item">
              <img src={banner7} className="d-block w-100" alt="slide7" />
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

        <Outlet />

        <div>
          {/* Recommended Books */}
          <div className='container d-flex justify-content-between align-items-center'>
            <h1 className='home-h1 mt-4'>Recommended Books</h1>
            <Link to="/member/recommended-books"><h3 id='view-all' className='btn home-h3 mt-4'>View All</h3></Link>
          </div>

          <div className="horizontal-scroll">
            {
              recommendedBooks.map((book) => (
                <BookCard
                  key={book.bookId}
                  bookId={book.bookId}
                  title={book.title}
                  author={book.author}
                  image={book.bookImage}
                  rating={book.averageRatings}
                  like={book.likedByCurrentUser}
                  link={`/member/book/${book.bookId}`}
                />
              ))
            }
          </div>
        </div>

        {/* Trending Books */}
        <div>
          <div className='container d-flex justify-content-between align-items-center'>
            <h1 className='home-h1 mt-4'>Trending Books</h1>
            <Link to="/member/trending-books"><h3 id='view-all' className='btn home-h3 mt-4'>View All</h3></Link>
          </div>

          <div className="horizontal-scroll">
            {
              trendingBooks.map((book) => (
                <BookCard
                  key={book.bookId}
                  bookId={book.bookId}
                  title={book.title}
                  author={book.author}
                  image={book.bookImage}
                  rating={book.averageRatings}
                  like={book.likedByCurrentUser}
                  link={`/member/book/${book.bookId}`}
                />
              ))
            }
          </div>
        </div>

        {/* Quote Section */}
        <div className="quote-section mt-4 mb-4">
          <h2 className="font-montserrat">Today's Quote</h2>
          <blockquote className="blockquote fs-4 fst-italic mt-3">
            "{todaysQuote.quote}"
          </blockquote>
          <figcaption className="blockquote-footer text-white-50 mt-2 fs-6">
            {todaysQuote.author}
          </figcaption>
        </div>

        {/* New Arrivals */}
        <div className='mb-0'>
          <div className="container d-flex align-items-center justify-content-between">
            <div className="d-flex gap-2">
              <h1 className="home-h1 mt-4">New Arrivals</h1>
              <h2 className="home-h2 mt-4">(Premium)</h2>
            </div>

            <Link to="/member/new-arrivals"><h3 id='view-all' className="btn home-h3 mt-4">View All</h3></Link>
          </div>

          <div className="horizontal-scroll">
            {
              newArrivedBooks.map((book) => (
                <BookCard
                  key={book.bookId}
                  bookId={book.bookId}
                  title={book.title}
                  author={book.author}
                  image={book.bookImage}
                  rating={book.averageRatings}
                  like={book.likedByCurrentUser}
                  link={`/member/book/${book.bookId}`}
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

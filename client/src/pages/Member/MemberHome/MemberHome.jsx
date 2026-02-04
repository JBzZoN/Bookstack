import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

/* ==========================================================================
   Styles
   ========================================================================== */
import '../MemberHome/MemberHome.css';

/* ==========================================================================
   Assets
   ========================================================================== */
import banner1 from '../../../assets/images/member/banner1.png';
import banner2 from '../../../assets/images/member/banner2.png';
import banner3 from '../../../assets/images/member/banner3.png';
import banner4 from '../../../assets/images/member/banner4.png';
import banner5 from '../../../assets/images/member/banner5.png';
import banner6 from '../../../assets/images/member/banner6.png';
import banner7 from '../../../assets/images/member/banner7.png';

/* ==========================================================================
   Components & Logic
   ========================================================================== */
import BookCard from '../../../components/Member/BookCard/BookCard.jsx';
import EmptyState from '../../../components/Member/EmptyState/EmptyState';
import api from '../../../api/api';
import { loadLikesFromBackend } from "../../../redux/slices/likeSlice.js";

/**
 * MemberHome Component
 * ==========================================================================
 * The main dashboard for authenticated members.
 * 
 * Features:
 * - Hero Carousel: Rotating banners for promotions/featured content.
 * - Book Lists: Recommended, Trending, and New Arrivals sections.
 * - Daily Quote: Fetches and displays a random quote.
 * - Responsive Layout: Horizontal scrolling lists with empty states.
 * 
 * @returns {JSX.Element} The Member Dashboard page.
 */
function MemberHome() {
  const dispatch = useDispatch();

  /* ==========================================================================
     State Management
     ========================================================================== */
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [newArrivedBooks, setNewArrivedBooks] = useState([]);
  const [todaysQuote, setTodaysQuote] = useState({
    quote: "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.",
    author: "George R.R. Martin"
  });

  /* ==========================================================================
     Effects
     ========================================================================== */

  /**
   * Initialize user data on mount.
   * Loads liked books from backend to sync Redux state.
   */
  useEffect(() => {
    dispatch(loadLikesFromBackend());
  }, [dispatch]);

  /**
   * Fetch Daily Quote.
   * Pulls a random quote from dummyjson API.
   */
  useEffect(() => {
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
        // Fallback to initial state quote
      });
  }, []);

  /**
   * Fetch Book Lists.
   * Loads Recommended, Trending, and New Arrival books.
   */
  useEffect(() => {
    // 1. Recommended Books
    api.get("/member/recommended-books")
      .then(res => setRecommendedBooks(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Failed to fetch recommended books", err);
        setRecommendedBooks([]);
      });

    // 2. Trending Books
    api.get("/member/trending-books")
      .then(res => setTrendingBooks(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Failed to fetch trending books", err);
        setTrendingBooks([]);
      });

    // 3. New Arrived Books
    api.get("/member/new-arrived-books")
      .then(res => setNewArrivedBooks(Array.isArray(res.data) ? res.data : []))
      .catch(err => {
        console.error("Failed to fetch new arrived books", err);
        setNewArrivedBooks([]);
      });
  }, []);

  /* ==========================================================================
     Render
     ========================================================================== */
  return (
    <div className='p-2'>
      <div className='container mt-5 py-5'>

        {/* 1. Hero Carousel */}
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators paragraph-indicators">
            {[...Array(7)].map((_, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0 ? "true" : "false"}
                aria-label={`Slide ${i + 1}`}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {[banner1, banner2, banner3, banner4, banner5, banner6, banner7].map((banner, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={banner} className="d-block w-100" alt={`slide${index + 1}`} />
              </div>
            ))}
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

        {/* 2. Recommended Books */}
        <div>
          <div className='container d-flex justify-content-between align-items-center'>
            <h1 className='home-h1 mt-4'>Recommended Books</h1>
            <Link to="/member/view-all/recommended">
              <h3 id='view-all' className='btn home-h3 mt-4'>View All</h3>
            </Link>
          </div>

          <div className="horizontal-scroll">
            {recommendedBooks.length === 0 ? (
              <div className="d-flex justify-content-center empty-state">
                <div style={{ width: '100%', maxWidth: '400px', height: '100%' }}>
                  <EmptyState message="We're curating personalized recommendations for you!" />
                </div>
              </div>
            ) : (
              recommendedBooks.map((book) => (
                <BookCard
                  key={book.bookId}
                  bookId={book.bookId}
                  title={book.title}
                  author={book.author}
                  image={book.bookImage}
                  rating={book.averageRatings}
                  link={`/member/book/${book.bookId}`}
                />
              ))
            )}
          </div>
        </div>

        {/* 3. Trending Books */}
        <div>
          <div className='container d-flex justify-content-between align-items-center'>
            <h1 className='home-h1 mt-4'>Trending Books</h1>
            <Link to="/member/view-all/trending">
              <h3 id='view-all' className='btn home-h3 mt-4'>View All</h3>
            </Link>
          </div>

          <div className="horizontal-scroll">
            {trendingBooks.length === 0 ? (
              <div className="d-flex justify-content-center empty-state">
                <div style={{ width: '100%', maxWidth: '400px', height: '100%' }}>
                  <EmptyState message="Wait for it... Trends take time to catch fire!" />
                </div>
              </div>
            ) : (
              trendingBooks.map((book) => (
                <BookCard
                  key={book.bookId}
                  bookId={book.bookId}
                  title={book.title}
                  author={book.author}
                  image={book.bookImage}
                  rating={book.averageRatings}
                  link={`/member/book/${book.bookId}`}
                />
              ))
            )}
          </div>
        </div>

        {/* 4. Quote Section */}
        <div className="quote-section mt-4 mb-4">
          <h2 className="font-montserrat">Today's Quote</h2>
          <blockquote className="blockquote fs-4 fst-italic mt-3">
            "{todaysQuote.quote}"
          </blockquote>
          <figcaption className="blockquote-footer text-white-50 mt-2 fs-6">
            {todaysQuote.author}
          </figcaption>
        </div>

        {/* 5. New Arrivals */}
        <div>
          <div className="container d-flex align-items-center justify-content-between">
            <div className="d-flex gap-2">
              <h1 className="home-h1 mt-4">New Arrivals</h1>
              <h2 className="home-h2 mt-4">(Premium)</h2>
            </div>
            <Link to="/member/view-all/new-arrivals">
              <h3 id='view-all' className="btn home-h3 mt-4">View All</h3>
            </Link>
          </div>

          <div className="horizontal-scroll">
            {newArrivedBooks.length === 0 ? (
              <div className="d-flex justify-content-center empty-state">
                <div style={{ width: '100%', maxWidth: '400px', height: '100%' }}>
                  <EmptyState message="Fresh stories are landing soon. Stay tuned!" />
                </div>
              </div>
            ) : (
              newArrivedBooks.map((book) => (
                <BookCard
                  key={book.bookId}
                  bookId={book.bookId}
                  title={book.title}
                  author={book.author}
                  image={book.bookImage}
                  rating={book.averageRatings}
                  link={`/member/book/${book.bookId}`}
                />
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default MemberHome;

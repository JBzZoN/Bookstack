import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../api/api';
import BookCard from '../../../components/Member/BookCard/BookCard';
import EmptyState from '../../../components/Member/EmptyState/EmptyState';
import { toast } from 'react-toastify';

import './ViewAllBooks.css';

/**
 * ViewAllBooks Component
 * ==========================================================================
 * A reusable page for displaying full lists of books based on a category.
 * 
 * Features:
 * - Dynamic Category Handling: Uses URL param to determine data source.
 * - Responsive Grid: Displays books in a wrapped flex layout.
 * - Fallback: Detailed EmptyState if no books found.
 * - Navigation: Includes a Back button.
 * 
 * @returns {JSX.Element}
 */
const ViewAllBooks = () => {
    /**
     * Hooks
     * - useParams: To get the category from the URL
     * - useNavigate: To handle navigation (Back button)
     * - useState: To manage books data, header info, and loading state
     */
    const { category, id } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [headerInfo, setHeaderInfo] = useState({ title: "", subtitle: "" });
    const [loading, setLoading] = useState(true);

    /**
     * fetchBooks
     * Determines the API endpoint and page metadata based on the current category.
     * Fetches the book data from the backend.
     */
    const fetchBooks = () => {
        let endpoint = "";
        let info = { title: "", subtitle: "" };

        // Determine endpoint and title based on URL param
        switch (category) {
            case 'recommended':
                endpoint = "/member/all-recommended-books";
                info = {
                    title: "Recommended for You",
                    subtitle: "Personalized recommendations curated just for you."
                };
                break;
            case 'trending':
                endpoint = "/member/all-trending-books";
                info = {
                    title: "Top Rated Reads",
                    subtitle: "Highly rated books making waves among readers."
                };
                break;
            case 'new-arrivals':
                endpoint = "/member/all-new-arrived-books";
                info = {
                    title: "Explore New Arrivals",
                    subtitle: "Explore the newest books added to the library."
                };
                break;
            case 'books':
                endpoint = "/member/books";
                info = {
                    title: "Explore Our Collection",
                    subtitle: "Find your next adventure between the pages."
                };
                break;
            case 'might-like':
                // For this category, we expect an ID in the URL params
                endpoint = `/member/all-might-liked-books/${id}`;
                info = {
                    title: "You Might Also Like",
                    subtitle: "Handpicked recommendations based on this book."
                };
                break;
            case 'might-like':
                // For this category, we expect an ID in the URL params
                endpoint = `/member/all-might-liked-books/${id}`;
                info = {
                    title: "You Might Also Like",
                    subtitle: "Handpicked recommendations based on this book."
                };
                break;
            case 'liked-books':
                endpoint = "/member/liked-books";
                info = {
                    title: "Books You Love",
                    subtitle: "All the books you’ve marked as favorites, in one place."
                };
                break;
            default:
                toast.error("Invalid Category");
                navigate('/member/home');
                return;
        }

        // Update state with determined title and subtitle
        setHeaderInfo(info);
        setLoading(true);

        // Fetch data from the selected endpoint
        api.get(endpoint)
            .then(res => {
                // Ensure response data is an array before setting state
                setBooks(Array.isArray(res.data) ? res.data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error(`Failed to fetch ${category} books`, err);
                toast.error(`Failed to load ${info.title}`);
                setBooks([]);
                setLoading(false);
            });
    };

    /**
     * Effect Hook
     * Triggers the fetchBooks function whenever the 'category' parameter changes.
     */
    useEffect(() => {
        fetchBooks();
    }, [category]);

    /* ==========================================================================
       Redux Integration
       ========================================================================== */
    const likesState = useSelector((state) => state.likes?.byBookId || {}); // Safely access likes

    /* ==========================================================================
       Derived State
       ========================================================================== */
    // If viewing 'liked-books', filter the list based on current Redux state
    // This allows immediate removal when a user unlikes a book
    const displayedBooks = category === 'liked-books'
        ? books.filter(book => likesState[book.bookId])
        : books;

    return (
        <div className="container view-all-container">
            {/* 
              Header Section 
              Displays the dynamic title and subtitle based on the category.
            */}
            <div className="container browse-title text-center">
                <h1 className="display-4 fw-bold">{headerInfo.title}</h1>
                <p className="lead">{headerInfo.subtitle}</p>
            </div>

            {/* 
              Back Button 
              Conditionally rendered. Hidden for the 'books' (Browse) category 
              as it serves as a primary navigation page.
            */}
            {category !== 'books' && category !== 'liked-books' && (
                <div className="mb-4">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                        style={{ borderRadius: '50px', padding: '0.5rem 1.25rem' }}
                    >
                        &larr; Back to Dashboard
                    </button>
                </div>
            )}

            {/* 
              Content Section
              - Shows Spinner while loading.
              - Shows EmptyState if no books found.
              - Shows Grid of BookCards if data exists.
            */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : displayedBooks.length === 0 ? (
                <div className="d-flex justify-content-center py-5">
                    <div style={{ width: '100%', maxWidth: '850px', height: 'auto' }}>
                        <EmptyState message={`No ${headerInfo.title.toLowerCase()} found at the moment.`} />
                    </div>
                </div>
            ) : (
                <div className="row g-4 pb-5">
                    {displayedBooks.map(book => (
                        <div key={book.bookId} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                            <BookCard
                                bookId={book.bookId}
                                title={book.title}
                                author={book.author}
                                image={book.bookImage}
                                rating={book.averageRatings}
                                link={`/member/book/${book.bookId}`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAllBooks;

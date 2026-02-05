import BookCard from '../../../components/Member/BookCard/BookCard'
import '../BookDetails/BookDetails.css'
import { useParams } from 'react-router-dom';
import ReviewsSection from '../../../components/Member/ReviewSection/ReviewSection';
import star from '../../../assets/images/member/star.png'
import api from '../../../api/api';
import { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, syncLikeWithBackend } from "../../../redux/slices/likeSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * BookDetails Component
 * ==========================================================================
 * Displays comprehensive information about a single book.
 * 
 * Features:
 * - Shows book metadata (Cover, Title, Author, ISBN, etc.)
 * - Displays availability status (Available/Unavailable)
 * - "Notify Me" functionality for out-of-stock books
 * - "Add to Wishlist" (Like) functionality synchronized with Redux/Backend
 * - Shows "You might also like" recommendations
 */
function BookDetails() {
    /* ==========================================================================
       State & Hooks
       ========================================================================== */
    const [bookDetails, setBookDetails] = useState([]);
    const [mightLikedBooks, setMightLikedBooks] = useState([]);
    const [isNotifyPending, setIsNotifyPending] = useState(false);

    const { id } = useParams();

    /* ==========================================================================
       Effects
       ========================================================================== */

    /**
     * Fetch Book Data
     * --------------------------------------------------------------------------
     * 1. Fetches main book details by ID.
     * 2. Fetches "Might Like" recommendations.
     * 3. Checks if the current user has already requested a notification for this book.
     */
    useEffect(() => {
        if (!id) return;

        api.get(`/member/book/${id}`)
            .then(res => setBookDetails(res.data))
            .catch(err => {
                console.error("Failed to fetch book", err);
                toast.error("Failed to load book details");
                setBookDetails(null);
            });
    }, [id]);

    useEffect(() => {
        if (!id) return;

        api.get(`/member/might-liked-books/${id}`)
            .then(res => setMightLikedBooks(res.data))
            .catch(err => {
                console.error("Failed to fetch book", err);
                // toast.error("Failed to load recommendations"); // Optional: soft fail
                setMightLikedBooks(null);
            });

        // Check notification status
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && id) {
            api.get(`/member/check-notify-status/${id}?email=${currentUser.email}`)
                .then(res => setIsNotifyPending(res.data))
                .catch(err => console.error("Failed to check notify status", err));
        }
    }, [id]);

    if (!bookDetails) {
        return (
            <div className="container py-5">
                <h2>Book not found</h2>
            </div>
        );
    }

    const image = bookDetails.bookImage || "No image available";
    const title = bookDetails.title || "No title available";
    const author = bookDetails.author || "Unknown";
    const summary = bookDetails.description || "No summary available.";
    const genres = bookDetails.genres?.length ? bookDetails.genres.join(", ") : "No genre available";

    const publisher = bookDetails.publisher || "No publisher available.";
    const isbn = bookDetails.isbn || "Not available.";
    const totalCopies = bookDetails.numberOfCopies || "Out of Stock - No Copy Available";
    const copyAvailable = bookDetails.numberOfCopiesRemaining || "Out of Stock - No Copy Available";
    const rating = bookDetails.averageRatings || 0;
    const likedByUser = bookDetails.likedByCurrentUser || false;

    const dispatch = useDispatch();

    const isLiked = useSelector(
        (state) => state.likes.byBookId[id] ?? likedByUser
    );

    /* ==========================================================================
       Handlers
       ========================================================================== */

    /**
     * Handles "Notify Me" Click
     * --------------------------------------------------------------------------
     * triggered when a user wants to be notified about an out-of-stock book.
     * Sends a request to the backend to queue a notification.
     */
    const handleNotify = async () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser) {
            toast.error("Please login");
            return;
        }

        try {
            const res = await api.post("/member/notify", {
                bookId: id,
                email: currentUser.email
            });
            toast.success(res.data);
            setIsNotifyPending(true);
        } catch (err) {
            toast.error(err.response?.data || "Request failed");
        }
    }

    return (
        <div className='p-2'>
            <div className="container py-5 mt-5">

                <div className="details-card">
                    <div className="row g-5">

                        <div className="col-lg-5 text-center">
                            <img src={image} className="img-fluid book-cover" alt="Book Cover" />
                        </div>

                        <div className="col-lg-7">

                            <h1 className="h1-c font-montserrat display-5">{title}</h1>
                            <h4 className="fw-normal text-secondary">by {author}</h4>

                            {bookDetails.numberOfCopiesRemaining > 0 ? (
                                <div className="d-flex align-items-center gap-3 my-4">
                                    <div className='rating'>
                                        <h3 className="rating-value">{rating}</h3>
                                        <img id="star" src={star} alt="rating star" />
                                    </div>

                                    <span className="badge fs-6 availability"><h4 className='member-h4'>Available</h4></span>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-3 my-4">
                                    <div className='rating'>
                                        <h3 className="rating-value">{rating}</h3>
                                        <img id="star" src={star} alt="rating star" />
                                    </div>

                                    <span className="badge fs-6 availability bg-danger"><h4 className='member-h4'>Unavailable</h4></span>
                                </div>
                            )}

                            <p className="lead">{summary}</p>

                            <hr className="my-4" />

                            <div className="row">

                                <div className="col-md-6">
                                    <p><strong>Genre:</strong> {genres}</p>
                                    <p><strong>Publisher:</strong> {publisher}</p>
                                </div>

                                <div className="col-md-6">
                                    <p><strong>ISBN:</strong> {isbn}</p>
                                    <p><strong>Copies Available:</strong> {copyAvailable} of {totalCopies}</p>
                                </div>

                            </div>

                            <div className="d-grid gap-2 d-md-flex mt-4">
                                {bookDetails.numberOfCopiesRemaining === 0 && (
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={handleNotify}
                                        disabled={isNotifyPending}
                                        title={isNotifyPending ? "Notification scheduled. We will notify you when available." : "Notify me when available"}
                                    >
                                        <i className="bi bi-bell-fill me-2"></i>
                                        {isNotifyPending ? "Notification Scheduled" : "Notify Me"}
                                    </button>
                                )}

                                <button
                                    className={`btn ${isLiked ? "btn-danger" : "btn-outline-danger"} btn-lg`}
                                    onClick={() => {
                                        dispatch(toggleLike(id));               // instant UI update
                                        dispatch(syncLikeWithBackend(id));      // backend sync
                                    }}
                                >
                                    <i className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"} me-2`}></i>
                                    {isLiked ? "Wishlisted" : "Add to Wishlist"}
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

                <div className="my-5">
                    <ReviewsSection bookId={id} />
                </div>

                <div className="">

                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="font-montserrat">You Might Also Like</h2>
                        <a href={`/member/might-like-books/${id}`} className="text-secondary text-decoration-none">View All</a>
                    </div>

                    <div className="horizontal-scroll mt-3">
                        {
                            mightLikedBooks.map((book) => (
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

export default BookDetails
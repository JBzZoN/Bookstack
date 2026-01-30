import BookCard from '../../../components/Member/BookCard/BookCard'
import '../BookDetails/BookDetails.css'
import { useParams } from 'react-router-dom';
import ReviewsSection from '../../../components/Member/ReviewSection/ReviewSection';
import star from '../../../assets/images/member/star.png'
import { bookDetailsData,mightLikedBooksData } from '../../../api/member';
import { use, useEffect, useState } from 'react';

function BookDetails () {
    const [bookDetails, setBookDetails] = useState([]);
    const [mightLikedBooks,setMightLikedBooks] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        bookDetailsData(id)
        .then(res => setBookDetails(res.data))
        .catch(err => {
            console.error("Failed to fetch book", err);
            setBookDetails(null);
        });
    }, [id]);

    useEffect(() => {
        if (!id) return;

        mightLikedBooksData(id)
        .then(res => setMightLikedBooks(res.data))
        .catch(err => {
            console.error("Failed to fetch book", err);
            setMightLikedBooks(null);
        });
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

    const [like,setLike] = useState(false);

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

                            <div className="d-flex align-items-center gap-3 my-4">
                                <div className='rating'>
                                    <h3 className="rating-value">{rating}</h3>
                                    <img id="star" src={star} alt="rating star" />
                                </div>

                                <span className="badge fs-6 availability"><h4 className='member-h4'>Available</h4></span>
                            </div>

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
                                <button className="btn btn-outline">
                                    <i className="bi bi-book-fill me-2"></i>
                                    Borrow Now
                                </button>

                                <button className="btn btn-outline-danger btn-lg">
                                    <i className="bi bi-heart me-2"></i>
                                    Add to Wishlist
                                </button>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="my-5">
                    {/* <ReviewsSection bookId={book.id} /> */}
                </div>

                <div className="">

                    <h2 className="font-montserrat">You Might Also Like</h2>

                    <div className="horizontal-scroll mt-3">
                        {
                            mightLikedBooks.map((book) => (
                                <BookCard
                                    key={book.bookId}
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
import BookCard from '../../../components/Member/BookCard/BookCard'
import '../BookDetails/BookDetails.css'
import { allBooksData } from '../../../dummy-data/all-books-data'
import { useParams } from 'react-router-dom';

function BookDetails () {
    const { id } = useParams();

    const book = allBooksData.find(b => b.id === Number(id));

    console.log("Book_data =", allBooksData);
console.log("ID =", id);
    
    if (!book) {
        return (
        <div className="container py-5">
            <h2>Book not found</h2>
        </div>
        );
    }

    const image = book.image || "No image available";
    const title = book.title || "No title available";
    const author = book.author || "Unknown";
    const summary = book.description || "No summary available.";
    const genre = book.genre || "No genre available.";
    const publisher = book.publisher || "No publisher available.";
    const isbn = book.isbn || "Not available.";
    const copyAvailable = book.stock || "Out of Stock - No Copy Available";
    
    return (
        <div>
            <div className="container py-5" style={{ marginTop: "50px" }}>

                <div className="details-card">
                    <div className="row g-5">

                    <div className="col-lg-5 text-center">
                        <img src={image} className="img-fluid book-cover" alt="Book Cover" />
                    </div>

                    <div className="col-lg-7">

                        <h1 className="font-montserrat display-5">{title}</h1>
                        <h4 className="fw-normal text-secondary">by {author}</h4>

                        <div className="d-flex align-items-center gap-3 my-4">
                            <div className="text-warning fs-5">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-half"></i>
                            </div>

                            <span className="badge fs-6" style={{ backgroundColor: "rgba(var(--brand-teal-rgb), 0.1)", color: "var(--brand-teal)" }}>Available</span>
                        </div>

                        <p className="lead">{summary}</p>

                        <hr className="my-4" />

                        <div className="row">

                        <div className="col-md-6">
                            <p><strong>Genre:</strong> {genre}</p>
                            <p><strong>Publisher:</strong> {publisher}</p>
                        </div>

                        <div className="col-md-6">
                            <p><strong>ISBN:</strong> {isbn}</p>
                            <p><strong>Copies Available:</strong> {copyAvailable}</p>
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

                    <h2 className="font-montserrat">Reviews</h2>

                    <div className="card mt-3">
                        <div className="card-body">

                            <div className="d-flex align-items-center mb-2">
                                <img src="https://placehold.co/40x40/e0e7ff/4338ca?text=J" className="rounded-circle me-2" alt="Avatar"/>
                                <strong>Jane Doe</strong>

                                <div className="text-warning ms-auto">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                            </div>

                            <p>
                            An absolutely captivating read! The concept is so unique and
                            thought-provoking. I couldn't put it down and finished it in just two
                            days. Highly recommended!
                            </p>

                        </div>
                    </div>

                </div>

                <div className="my-5">

                    <h2 className="font-montserrat">You Might Also Like</h2>

                    <div className="horizontal-scroll mt-3">
                        <BookCard
                            key={2542}
                            title={"A Doll's House"}
                            author={"Henrik Ibsen"}
                            image={"https://www.gutenberg.org/cache/epub/2542/pg2542.cover.medium.jpg"}
                            link={'/member/book/2542'}
                        />

                        <BookCard
                            key={98}
                            title={"A Tale of Two Cities"}
                            author={"Charles Dickens"}
                            image={"https://www.gutenberg.org/cache/epub/98/pg98.cover.medium.jpg"}
                            link={'/member/book/98'}
                        />

                        <BookCard
                            key={844}
                            title={"The Importance of Being Earnest"}
                            author={"Oscar Wilde"}
                            image={"https://www.gutenberg.org/cache/epub/844/pg844.cover.medium.jpg"}
                            link={'/member/book/844'}
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default BookDetails
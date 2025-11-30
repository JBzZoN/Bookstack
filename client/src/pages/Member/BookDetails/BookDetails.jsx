import BookCard from '../../../components/Member/BookCard/BookCard'
import '../BookDetails/BookDetails.css'

function BookDetails () {
    return (
        <div>
            <div className="container py-5" style={{ marginTop: "50px" }}>

                <div className="details-card">
                    <div className="row g-5">

                    <div className="col-lg-5 text-center">
                        <img src="https://www.bigw.com.au/medias/sys_master/images/images/h13/h96/114373905219614.jpg" className="img-fluid book-cover" alt="Book Cover" />
                    </div>

                    <div className="col-lg-7">

                        <h1 className="font-montserrat display-5">The Midnight Library</h1>
                        <h4 className="fw-normal text-secondary">by Matt Haig</h4>

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

                        <p className="lead">
                        Between life and death there is a library, and within that library,
                        the shelves go on forever. Every book provides a chance to try another
                        life you could have lived. To see how things would be if you had made
                        other choices... Would you have done anything different?
                        </p>

                        <hr className="my-4" />

                        <div className="row">

                        <div className="col-md-6">
                            <p><strong>Genre:</strong> Fiction, Fantasy</p>
                            <p><strong>Publisher:</strong> Viking</p>
                        </div>

                        <div className="col-md-6">
                            <p><strong>ISBN:</strong> 978-0525559474</p>
                            <p><strong>Copies Available:</strong> 3 of 5</p>
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
                            key={1}
                            title={"Klara and the Sun"}
                            author={"Kazuo Ishiguro"}
                            image={"https://covers.openlibrary.org/b/id/10561563-L.jpg"}
                            link={'/member/book'}
                        />

                        <BookCard
                            key={2}
                            title={"Piranesi"}
                            author={"Susanna Clarke"}
                            image={"https://covers.openlibrary.org/b/id/10413954-L.jpg"}
                            link={'/member/book'}
                        />

                        <BookCard
                            key={3}
                            title={"The Invisible Life of Addie LaRue"}
                            author={"V.E. Schwab<"}
                            image={"https://covers.openlibrary.org/b/id/10909237-L.jpg"}
                            link={'/member/book'}
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default BookDetails
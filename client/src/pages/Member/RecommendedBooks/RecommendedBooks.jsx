import '../BrowseBooks/BrowseBooks.css'
import BookCard from '../../../components/Member/BookCard/BookCard'
import api from '../../../api/api';
import { useState, useEffect } from 'react';

function AllRecommendedBooks () {
    const [allRecommendedBooks, setAllRecommendedBooks] = useState([]);

    useEffect(() => {
        api.get("/member/all-recommended-books")
            .then(res => {
                setAllRecommendedBooks(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error("Failed to fetch books", err);
                setAllRecommendedBooks([]);
            });
    }, []);

    return (
        <div className='mb-5 p-2'>
            <div className="container browse-title text-center">
                <h1 className="display-4">Recommended for You</h1>
                <p className="lead">Personalized recommendations curated just for you.</p>
            </div>

            <div className='mt-4 container vertical-scroll'>
                    {
                        allRecommendedBooks.map((book) => (
                            <BookCard
                                key={book.bookId}
                                title={book.title}
                                author={book.author}
                                image={book.bookImage}
                                rating={book.averageRatings}
                                like={book.likedByCurrentUser}
                                link={`/member/book/${84}`}
                            />
                        ))
                    }
            </div>
        </div>
    )
}

export default AllRecommendedBooks
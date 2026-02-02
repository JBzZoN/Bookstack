import '../BrowseBooks/BrowseBooks.css'
import BookCard from '../../../components/Member/BookCard/BookCard'
import api from '../../../api/api';
import { useState, useEffect } from 'react';

function AllNewArrivedBooks () {
    const [allNewArrivedBooks, setAllNewArrivedBooks] = useState([]);

    useEffect(() => {
        api.get("/member/all-new-arrived-books")
            .then(res => {
                setAllNewArrivedBooks(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error("Failed to fetch books", err);
                setAllNewArrivedBooks([]);
            });
    }, []);

    return (
        <div className='mb-5 p-2'>
            <div className="container browse-title text-center">
                <h1 className="display-4">Explore New Arrivals</h1>
                <p className="lead">Explore the newest books added to the library.</p>
            </div>

            <div className='mt-4 container vertical-scroll'>
                    {
                        allNewArrivedBooks.map((book) => (
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

export default AllNewArrivedBooks
import '../BrowseBooks/BrowseBooks.css'
import BookCard from '../../../components/Member/BookCard/BookCard'
import EmptyState from '../../../components/Member/EmptyState/EmptyState';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

function AllTrendingBooks() {
    const [allTrendingBooks, setAllTrendingBooks] = useState([]);

    useEffect(() => {
        api.get("/member/all-trending-books")
            .then(res => {
                setAllTrendingBooks(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error("Failed to fetch books", err);
                toast.error("Failed to load trending books");
                setAllTrendingBooks([]);
            });
    }, []);

    return (
        <div className='mb-5 p-2'>
            <div className="container browse-title text-center">
                <h1 className="display-4">Top Rated Reads</h1>
                <p className="lead">Highly rated books making waves among readers.</p>
            </div>

            <div className='mt-4 container vertical-scroll'>
                {
                    allTrendingBooks.length === 0 ? (
                        <EmptyState message="No trending books available." />
                    ) : (
                        allTrendingBooks.map((book) => (
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
                    )
                }
            </div>
        </div>
    )
}

export default AllTrendingBooks
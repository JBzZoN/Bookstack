import '../BrowseBooks/BrowseBooks.css'
import BookCard from '../../../components/Member/BookCard/BookCard'
import EmptyState from '../../../components/Member/EmptyState/EmptyState';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

function LikedBooks() {
    const [allLikedBooksCard, setAllLikedBooksCard] = useState([]);

    useEffect(() => {
        api.get("/member/liked-books")
            .then(res => {
                setAllLikedBooksCard(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error("Failed to fetch books", err);
                toast.error("Failed to load liked books");
                setAllLikedBooksCard([]);
            });
    }, []);

    return (
        <div className='mb-5 p-2'>
            <div className="container browse-title text-center">
                <h1 className="display-4">Books You Love</h1>
                <p className="lead">All the books you’ve marked as favorites, in one place.</p>
            </div>

            <div className='mt-4 container vertical-scroll'>
                {
                    allLikedBooksCard.length === 0 ? (
                        <EmptyState message="You haven't liked any books yet." />
                    ) : (
                        allLikedBooksCard.map((book) => (
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

export default LikedBooks
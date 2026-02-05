import '../BrowseBooks/BrowseBooks.css'
import BookCard from '../../../components/Member/BookCard/BookCard'
import EmptyState from '../../../components/Member/EmptyState/EmptyState';
import api from '../../../api/api';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MightLikeBooks() {
    const [books, setBooks] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        api.get(`/member/all-might-liked-books/${id}`)
            .then(res => {
                setBooks(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error("Failed to fetch books", err);
                toast.error("Failed to load recommendations");
                setBooks([]);
            });
    }, [id]);

    return (
        <div className='mb-5 p-2'>
            <div className="container browse-title text-center">
                <h1 className="display-4">You Might Also Like</h1>
                <p className="lead">Handpicked recommendations based on this book.</p>
            </div>

            <div className='mt-4 container vertical-scroll'>
                {
                    books.length === 0 ? (
                        <EmptyState message="No similar books found." />
                    ) : (
                        books.map((book) => (
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
                    )
                }
            </div>
        </div>
    )
}

export default MightLikeBooks

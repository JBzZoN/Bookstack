import '../BrowseBooks/BrowseBooks.css'
import BookCard from '../../../components/Member/BookCard/BookCard'
import { allBooksCardData } from '../../../api/member';
import { useState, useEffect } from 'react';

function BrowseBooks () {
    const [allBooksCard, setAllBooksCard] = useState([]);

    useEffect(() => {
        allBooksCardData()
            .then(res => {
                setAllBooksCard(Array.isArray(res.data) ? res.data : []);
            })
            .catch(err => {
                console.error("Failed to fetch books", err);
                setAllBooksCard([]);
            });
    }, []);

    return (
        <div className='mb-5 p-2'>
            <div className="container browse-title text-center">
                <h1 className="display-4">Explore Our Collection</h1>
                <p className="lead">Find your next adventure between the pages.</p>
            </div>

            <div className='mt-4 container vertical-scroll'>
                    {
                        allBooksCard.map((book) => (
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
    )
}

export default BrowseBooks
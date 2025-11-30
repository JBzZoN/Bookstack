import '../BrowseBooks/BrowseBooks.css'
import { allBooksData } from '../../../dummy-data/all-books-data'
import BookCard from '../../../components/Member/BookCard/BookCard'

function BrowseBooks () {
    return (
        <div>
            <div className="container browse-title text-center mb-5">
                <h1 className="display-4">Explore Our Collection</h1>
                <p className="lead">Find your next adventure between the pages.</p>
            </div>

            <div className='container vertical-scroll'>
                    {
                        allBooksData.map((book) => (
                            <BookCard
                                key={book.id}
                                title={book.title}
                                author={book.author}
                                image={book.image}
                                link={'/member/book'}
                            />
                        ))
                    }
            </div>
        </div>
    )
}

export default BrowseBooks
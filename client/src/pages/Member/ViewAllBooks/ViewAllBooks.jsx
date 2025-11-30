import '../BrowseBooks/BrowseBooks.css'
import { allBooksData } from '../../../dummy-data/all-books-data'
import BookCard from '../../../components/Member/BookCard/BookCard'

function ViewAllBooks () {
    return (
        <div>
            <div className='container vertical-scroll' style={{marginTop: '80px'}}>
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

export default ViewAllBooks
import '../../../components/Member/Navbar/Navbar.css'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../assets/images/logo.png'
import likesList from '../../../assets/images/member/likes-cart.png'
import api from "../../../api/api"
import { useSelector, useDispatch } from 'react-redux';
import { loadLikesFromBackend } from '../../../redux/slices/likeSlice';
import { useEffect } from 'react';

/**
 * Member Navbar Component
 * ==========================================================================
 * Navigation bar for authenticated members.
 * 
 * Features:
 * - Search bar for books (ISBN, Title, Author) with debouncing.
 * - Links to Home, Browse Books, and My Account.
 * - "Upgrade" button for membership plan upgrades.
 * - Likes/Wishlist indicator with badge count.
 * - Logout functionality.
 */
function Navbar() {
    const dispatch = useDispatch();
    const likes = useSelector((state) => state.likes.byBookId);

    useEffect(() => {
        dispatch(loadLikesFromBackend());
    }, [dispatch]);
    const [onSearch, setOnSearch] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchBarOn, setSearchBarOn] = useState(false)
    const [searchString, setSearchString] = useState("")

    /**
     * Handles Book Search
     * --------------------------------------------------------------------------
     * Debounced search handler. API call is delayed by 400ms to avoid
     * flooding the backend while typing.
     */
    const onSearchBook = (e) => {
        const value = e.target.value
        setSearchString(value)

        // minimum characters
        if (value.length < 2 || onSearch === true) return

        setOnSearch(true)

        setTimeout(async () => {
            if (value.length < 2) return

            const response = await api.post("/book/search", { search: value })

            setSearchResults(response.data)
            setOnSearch(false)
        }, 400)
    }

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login")
    };
    const handleLikedBooks = () => {
        navigate("/member/view-all/liked-books")
    };
    return (
        <nav className="member-navbar navbar navbar-expand-lg fixed-top">
            <div className="container">

                <div className="d-flex align-items-center gap-2 text-decoration-none" to="/">
                    <img className="logo-img" src={logo} alt="logo" />
                    <div className='logo-title'>
                        <span style={{ color: "#0a0d9f" }}>Book</span>
                        <span style={{ color: "#111827" }}>Stack</span>
                    </div>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">

                    <form className="d-flex ms-3 flex-grow-1 position-relative p-2" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search by book, author or ISBN"
                            value={searchString}
                            onChange={onSearchBook}
                            autoComplete="off"
                            onFocus={() => setSearchBarOn(true)}
                            onBlur={() => setTimeout(() => setSearchBarOn(false), 300)}
                        />

                        {searchResults.length > 0 &&
                            searchBarOn &&
                            searchString.length >= 2 && (
                                <div className="list-group position-absolute w-100 mt-5">
                                    {searchResults.map((book) => (
                                        <div
                                            key={book.id}
                                            className="list-group-item list-group-item-action"
                                            onClick={() => {
                                                // navigate to book page
                                                navigate(`/member/book/${book.bookId}`)
                                                setSearchString("")
                                                setSearchResults([])
                                            }}
                                        >
                                            <strong>{book.title}</strong><br />
                                            <small className="text-muted">
                                                {book.author} • {book.isbn}
                                            </small>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </form>

                    <div className="position-relative p-2" style={{ cursor: 'pointer' }} onClick={handleLikedBooks}>
                        <img id="img-size" src={likesList} alt="Liked Books" style={{ marginLeft: 0 }} />
                        {Object.values(likes).filter(Boolean).length > 0 && (
                            <span className="position-absolute badge rounded-pill" style={{
                                top: '1px',
                                right: '1px',
                                background: 'linear-gradient(90deg, #4f0bc5, rgb(236, 94, 117))',
                                fontSize: '0.75rem',
                                border: '2px solid white'
                            }}>
                                {Object.values(likes).filter(Boolean).length}
                            </span>
                        )}
                    </div>

                    <div className="p-2 ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-3 mt-lg-0 navbar-nav ">
                        <NavLink to="/member/home" id="member-margin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                        <NavLink to="/member/view-all/books" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Browse Books</NavLink>
                        <NavLink to="/member/account" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Account</NavLink>
                        <button
                            className="btn btn-sm text-white rounded-pill px-3 btn-upgrade"
                            onClick={() => navigate('/membership')}
                        >
                            Upgrade
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;

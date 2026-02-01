import '../../../components/Member/Navbar/Navbar.css'
import { NavLink,Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../../assets/logo.png'
import logout from '../../../assets/images/member/logout.png'
import likesList from '../../../assets/images/member/likes-cart.png'

function Navbar () {
    const [onSearch, setOnSearch] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [searchBarOn, setSearchBarOn] = useState(false)
    const [searchString, setSearchString] = useState("")

    const onSearchBook = (e) => {
    const value = e.target.value
    setSearchString(value)

    // minimum characters
    if (value.length < 2 || onSearch === true) return

    setOnSearch(true)

    setTimeout(async () => {
        if (value.length < 2) return

        const response = await axios.post(
        "http://localhost:8080/books/search",
        { search: value }
        )

        setSearchResults(response.data)
        setOnSearch(false)
    }, 400)
    }

    const navigate=useNavigate();
    const handleLogout = () => {
        navigate("/login")
    };
    const handleLikedBooks = () => {
        navigate("/member/liked-books")
    };
    return (
        <nav className="member-navbar navbar navbar-expand-lg fixed-top">
            <div className="container">

                <div className="d-flex align-items-center gap-2 text-decoration-none" to="/">
                    <img className="logo-img" src={logo} alt="logo"/>
                    <div className='logo-title'>
                        <span style={{ color: "#0a0d9f" }}>Book</span>
                        <span style={{ color: "#111827" }}>Stack</span>
                    </div>
                </div>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">

                    <form className="d-flex ms-3 flex-grow-1 position-relative" role="search">
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
                                    navigate(`/books/${book.id}`)
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

                    <div className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-3 mt-3 mt-lg-0 navbar-nav ">
                        <NavLink to="/member/home" id="member-margin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                        <NavLink to="/member/browse" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Browse Books</NavLink>
                        <NavLink to="/member/account" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Account</NavLink>
                        <img id="img-size" src={likesList} onClick={handleLikedBooks}></img>
                        <img className="member-image-fix" src={logout} onClick={handleLogout}></img>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;

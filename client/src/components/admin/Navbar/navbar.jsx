import React from "react";
import "../../../components/admin/Navbar/navbar.css";

export default function Navbar() {
return (
<nav className="non-member-navbar">
<div className="logo">BookStack</div>
<div className="nav-links">
<a href="/admin/staff">Staff</a>
<a href="/admin/books">Books</a>
<a href="/admin/members">Members</a>
</div>
<a href="/admin" className="logout">Logout</a>
</nav>
);
}
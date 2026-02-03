import '../MyAccount/MyAccount.css'
import api from '../../../api/api';
import { format } from "date-fns";
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatDate = (dateStr) =>
    format(new Date(dateStr), "dd MMM yyyy");

function MyAccount() {
    const [currentlyBorrowed, setCurrentlyBorrowed] = useState([]);
    const [history, setHistory] = useState([]);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePassword = async () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.userId) {
            toast.error("User not verified");
            return;
        }

        try {
            const response = await api.post("/auth/change-password", {
                userId: currentUser.userId,
                currentPassword: currentPassword,
                newPassword: newPassword
            });
            toast.success(response.data);
            setCurrentPassword("");
            setNewPassword("");
        } catch (error) {
            console.error("Change password error", error);
            toast.error(error.response?.data || "Failed to update password");
        }
    };

    useEffect(() => {
        api.get("/member/currently-borrowed-books")
            .then(res => setCurrentlyBorrowed(res.data))
            .catch(err => {
                console.error("Failed to fetch book", err);
                setCurrentlyBorrowed(null);
            });
    }, []);

    useEffect(() => {
        api.get("/member/history-borrowed-books")
            .then(res => setHistory(res.data))
            .catch(err => {
                console.error("Failed to fetch book", err);
                setHistory(null);
            });
    }, []);

    const handleRenew = async (bookId) => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.userId) {
            toast.error("User not verified");
            return;
        }

        try {
            const res = await api.post("/member/renew", {
                userId: currentUser.userId,
                bookId: bookId
            });
            toast.success(res.data);
            api.get("/member/currently-borrowed-books")
                .then(res => setCurrentlyBorrowed(res.data))
                .catch(err => setCurrentlyBorrowed(null));
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || "Renew failed");
        }
    }

    return (
        <div className='m-5'>
            <ToastContainer />
            <div className="container py-4">

                <div className="myaccount-title text-center mb-5">
                    <h1 className="font-montserrat display-4">My Account</h1>
                    <p className="lead">Manage your membership and borrowing activity.</p>
                </div>

                <div className="content-card" style={{ margin: "auto" }}>

                    <ul className="nav nav-tabs nav-fill mb-4 custom-tabs">

                        <li className="nav-item">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#borrowed">
                                Currently Borrowed
                            </button>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#history">
                                Borrowing History
                            </button>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#settings">
                                Profile Settings
                            </button>
                        </li>

                    </ul>

                    <div className="tab-content">

                        <div className="tab-pane fade show active" id="borrowed">
                            <ul className="list-group list-group-flush">
                                <ul className="list-group list-group-flush">
                                    {currentlyBorrowed.map((book, index) => (
                                        <div>
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <div>
                                                    <h5 className="mb-1">{book.title}</h5>
                                                    <p className="mb-0 text-secondary">
                                                        Borrowed on: {formatDate(book.startDate)}
                                                    </p>
                                                    <p className="mb-0">
                                                        <strong>Due on: {formatDate(book.endDate)}</strong>
                                                    </p>
                                                </div>
                                                <button
                                                    className="btn btn-outline btn-success"
                                                    onClick={() => handleRenew(book.bookId)}
                                                >Renew</button>
                                            </li>
                                        </div>
                                    ))}
                                </ul>

                            </ul>
                        </div>

                        <div className="tab-pane fade" id="history">

                            <ul className="list-group list-group-flush">

                                <ul className="list-group">
                                    {history.map((book, index) => (
                                        <li key={index} className="list-group-item p-3">
                                            <h5 className="mb-1">{book.bookName}</h5>
                                            <p className="mb-0 text-secondary">
                                                Returned on: {formatDate(book.returnDate)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                            </ul>
                        </div>

                        <div className="tab-pane fade p-3" id="settings">
                            <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control form-control-lg" value="Current User" readOnly />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-control form-control-lg" value="user@example.com" readOnly />
                                </div>

                                <hr className="my-4" />

                                <h5 className="mb-3">Change Password</h5>

                                <div className="mb-3">
                                    <label className="form-label">Current Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>

                                <button className="btn btn-outline btn-success">Save Changes</button>
                            </form>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default MyAccount
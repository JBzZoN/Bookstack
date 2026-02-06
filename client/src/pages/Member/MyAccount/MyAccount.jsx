import '../MyAccount/MyAccount.css'
import api from '../../../api/api';
import { format } from "date-fns";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyState from '../../../components/Member/EmptyState/EmptyState';

/* ==========================================================================
   Helper Functions
   ========================================================================== */

/**
 * Formats a date string into "dd MMM yyyy" format.
 * @param {string} dateStr - The date string to format.
 * @returns {string} The formatted date string.
 */
const formatDate = (dateStr) =>
    format(new Date(dateStr), "dd MMM yyyy");

/**
 * MyAccount Page Component
 * ==========================================================================
 * Manages user profile, borrowing history, and current loans.
 * 
 * Features:
 * - View currently borrowed books and renew them.
 * - View history of returned books.
 * - Update profile settings (password).
 * - Display membership details (current plan, renewal limits).
 * 
 * @component
 * @returns {JSX.Element} The rendered MyAccount page.
 */
function MyAccount() {
    /* ==========================================================================
       State Management
       ========================================================================== */
    const [currentlyBorrowed, setCurrentlyBorrowed] = useState([]);
    const [history, setHistory] = useState([]);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPlan, setCurrentPlan] = useState(null);

    // Hooks
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    /* ==========================================================================
       API Interactions
       ========================================================================== */

    /**
     * Fetches the user's membership plan details.
     */
    const fetchCurrentPlan = () => {
        api.get("/member/current-plan")
            .then(res => setCurrentPlan(res.data))
            .catch(err => {
                console.error("Failed to fetch limits", err);
                toast.error("Failed to load membership limits");
            });
    };

    /**
     * Handles password change request.
     */
    const handleChangePassword = async () => {
        try {
            const response = await api.post("/auth/change-password", {
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

    /**
     * Handles book renewal.
     * @param {number} bookId - ID of the book to renew.
     */
    const handleRenew = async (bookId) => {
        try {
            const res = await api.post("/member/renew", {
                bookId: bookId
            });
            toast.success(res.data);

            // Refresh borrowed list to update due dates
            api.get("/member/currently-borrowed-books")
                .then(res => setCurrentlyBorrowed(res.data))
                .catch(err => {
                    setCurrentlyBorrowed(null);
                    toast.error("Failed to refresh borrowed list");
                });

            // Refresh plan limits
            fetchCurrentPlan();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data || "Renew failed");
        }
    }

    /* ==========================================================================
       Effects
       ========================================================================== */

    /**
     * Initial Data Fetch
     * Loads borrowed books, history, and plan details on component mount.
     */
    useEffect(() => {
        // Fetch borrowed books
        api.get("/member/currently-borrowed-books")
            .then(res => setCurrentlyBorrowed(res.data))
            .catch(err => {
                console.error("Failed to fetch book", err);
                toast.error("Failed to load borrowed books");
                setCurrentlyBorrowed(null);
            });

        // Fetch current plan details
        fetchCurrentPlan();

        // Fetch borrowing history
        api.get("/member/history-borrowed-books")
            .then(res => setHistory(res.data))
            .catch(err => {
                console.error("Failed to fetch book", err);
                toast.error("Failed to load borrowing history");
                setHistory(null);
            });
    }, []);

    /* ==========================================================================
       Render Helpers
       ========================================================================== */

    // Check if user has reached their renewal limit
    const isRenewLimitReached = currentPlan && currentPlan.renewCount >= currentPlan.renewalLimit;

    /* ==========================================================================
       Main Render
       ========================================================================== */
    return (
        <div className='m-5'>
            <div className="container py-4">

                {/* Header Section */}
                <div className="myaccount-title text-center mb-5">
                    <h1 className="font-montserrat display-4">My Account</h1>
                    <p className="lead">Manage your membership and borrowing activity.</p>
                    {currentPlan && (
                        <div className="text-muted mt-2 text-color">
                            Rentals Renewed: {currentPlan.renewCount} / {currentPlan.renewalLimit}
                        </div>
                    )}
                </div>

                <div className="content-card" style={{ margin: "auto" }}>

                    {/* Navigation Tabs */}
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

                    {/* Tab Content */}
                    <div className="tab-content">

                        {/* Currently Borrowed Tab */}
                        <div className="tab-pane fade show active" id="borrowed">
                            {currentlyBorrowed && currentlyBorrowed.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {currentlyBorrowed.map((book, index) => (
                                        <div key={index}>
                                            <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                                <div>
                                                    <h5 className="mb-1">{book.title}</h5>
                                                    <p className="mb-0 text-secondary">
                                                        Borrowed on: {formatDate(book.startDate)}
                                                    </p>
                                                    <p className="mb-0">
                                                        <strong>Due on: {formatDate(book.endDate)}</strong>
                                                    </p>
                                                </div>
                                                <div title={isRenewLimitReached ? "Renewal limit reached" : ""}>
                                                    <button
                                                        className="btn btn-outline btn-success"
                                                        onClick={() => handleRenew(book.bookId)}
                                                        disabled={isRenewLimitReached}
                                                    >Renew</button>
                                                </div>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <div style={{ width: '100%', maxWidth: '400px', height: '100%' }}>
                                        <EmptyState
                                            message="You haven't borrowed any books yet."
                                            action={{
                                                label: "Browse Books",
                                                onClick: () => window.location.href = '/member/browse'
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* History Tab */}
                        <div className="tab-pane fade" id="history">
                            {history && history.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {history.map((book, index) => (
                                        <li key={index} className="list-group-item p-3">
                                            <h5 className="mb-1">{book.bookName}</h5>
                                            <p className="mb-0 text-secondary">
                                                Returned on: {formatDate(book.returnDate)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <div style={{ width: '100%', maxWidth: '400px', height: '100%' }}>
                                        <EmptyState message="No borrowing history found." />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Settings Tab */}
                        <div className="tab-pane fade p-3" id="settings">
                            <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control form-control-lg" value={currentUser?.name || "Member"} readOnly />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-control form-control-lg" value={currentUser?.email || ""} readOnly />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Current Plan</label>
                                    <div className="d-flex align-items-center">
                                        <input type="text" className="form-control form-control-lg text-primary fw-bold" value={currentPlan?.membershipType || currentUser?.role || "Member"} readOnly />
                                        {/* Optional badges or icons logic here */}
                                    </div>
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
                                <hr className="my-5" />

                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="text-danger mb-2">Session Controls</h5>
                                        <p className="text-muted small mb-0">Once you log out, you will need to sign in again to access your account.</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-danger px-4"
                                        onClick={() => {
                                            localStorage.clear();
                                            navigate("/login");
                                        }}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default MyAccount
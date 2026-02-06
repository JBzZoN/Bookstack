import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

/* ==========================================================================
   Page & Component Imports
   ========================================================================== */

/* --- Member Modules --- */
import Home from './pages/Member/Home/Home';
import MemberHome from './pages/Member/MemberHome/MemberHome';
import MyAccount from './pages/Member/MyAccount/MyAccount';
import BookDetails from './pages/Member/BookDetails/BookDetails';
import ViewAllBooks from './components/Member/ViewAllBooks/ViewAllBooks';

/* --- Administrative Modules --- */
import AdminHome from './pages/admin/home/home';
import AddStaff from './pages/admin/AddNewStaff/AddStaff';
import EditStaff from './pages/admin/EditStaff/EditStaff';
import Books from './pages/admin/Books/Books';
import Members from './pages/admin/Members/Members';
import MemberProfile from './pages/admin/Members/MemberProfile';
import SendLetter from './pages/admin/Members/SendLetter';

/* --- Staff Modules --- */
import Staff from './pages/admin/staff/Staff';
import StaffHome from './pages/staff/home/home';
import AllBooks from './pages/staff/all-books/all-books';
import AddBooks from './pages/staff/add-books/add-books';
import RentRenewReturn from './pages/staff/rent-renew-return/rent-renew-return';
import SendNewsletter from './pages/staff/send-newsletter/send-newsletter';
import ViewMembers from './pages/staff/view-members/view-members';
import BookProfile from './pages/staff/book-profile/book-profile';
import MemberStaffProfile from './pages/staff/member-profile/member-profile';

/* --- Public / Non-Member Modules --- */
import NonMemberHome from './pages/non-member/Home/Home';
import BookStackIntro from './pages/non-member/BookStackIntro/BookStackIntro';
import Membership from './pages/non-member/Membership/Membership';
import OrderSummary from './pages/non-member/OrderSummary/OrderSummary';
import Register from './pages/non-member/Register/Register';
import Login from './pages/non-member/Login/Login';

/**
 * App Component
 * ==========================================================================
 * Root component that serves as the main entry point for the application UI.
 * 
 * Responsibilities:
 * - Routing Orchestration: Defines the hierarchy for Member, Admin, Staff, and Guest routes.
 * - Global Notifications: Configures and renders the ToastContainer.
 * - Root Layout: Wraps all pages in an 'app-container' for consistent base styling.
 *
 * @component
 * @returns {JSX.Element} The fully routed application.
 */
function App() {
  return (
    <div className="app-container">
      {/* 
        Global Toast Notifications 
        Configured here to be accessible from any part of the application.
      */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* 
          ----------------------------------------------------------------
          GUEST / NON-MEMBER ROUTES
          Base Path: /
          ---------------------------------------------------------------- 
        */}
        <Route path="/" element={<NonMemberHome />}>
          <Route index element={<Navigate to="intro" replace />} />
          <Route path='intro' element={<BookStackIntro />} />
          <Route path="login" element={<Login />} />
          <Route path="membership" element={<Membership />} />
          <Route path="order-summary" element={<OrderSummary />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* 
          ----------------------------------------------------------------
          MEMBER ROUTES
          Base Path: /member
          Requires authenticated 'Member' role context.
          ---------------------------------------------------------------- 
        */}
        <Route path="member" element={<Home />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<MemberHome />} />
          <Route path="view-all/:category/:id?" element={<ViewAllBooks />} />
          <Route path="browse" element={<Navigate to="view-all/books" replace />} />
          <Route path="book/:id" element={<BookDetails />} />
          <Route path="account" element={<MyAccount />} />
        </Route>

        {/* 
          ----------------------------------------------------------------
          ADMINISTRATIVE ROUTES
          Base Path: /admin
          Requires authenticated 'Admin' role context.
          ---------------------------------------------------------------- 
        */}
        <Route path="admin" element={<AdminHome />}>
          <Route path="staff" element={<Staff />} />
          <Route path="addstaff" element={<AddStaff />} />
          <Route path="editstaff" element={<EditStaff />} />
          <Route path="books" element={<Books />} />
          <Route path="members" element={<Members />} />
          <Route path="memberprofile" element={<MemberProfile />} />
          <Route path='emailsending' element={<SendLetter />} />
        </Route>

        {/* 
          ----------------------------------------------------------------
          STAFF ROUTES
          Base Path: /staff
          Requires authenticated 'Librarian' role context.
          ---------------------------------------------------------------- 
        */}
        <Route path="/staff" element={<StaffHome />}>
          <Route path="books" element={<AllBooks />} />
          <Route path="books/add" element={<AddBooks />} />
          <Route path="books/profile" element={<BookProfile />} />
          <Route path="transaction" element={<RentRenewReturn />} />
          <Route path="newsletter" element={<SendNewsletter />} />
          <Route path="members" element={<ViewMembers />} />
          <Route path="members/profile" element={<MemberStaffProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;


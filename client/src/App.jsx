import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'

/* Member pages */
import Home from './pages/Member/Home/Home';
import MemberHome from './pages/Member/MemberHome/MemberHome';
import BrowseBooks from './pages/Member/BrowseBooks/BrowseBooks';
import MyAccount from './pages/Member/MyAccount/MyAccount';
import BookDetails from './pages/Member/BookDetails/BookDetails';
import ViewAllBooks from './pages/Member/ViewAllBooks/ViewAllBooks';
import LikedBooks from './pages/Member/LikedBooks/LikedBooks';
import AllRecommendedBooks from './pages/Member/RecommendedBooks/RecommendedBooks';
import AllTrendingBooks from './pages/Member/TrendingBooks/TrendingBooks';
import AllNewArrivedBooks from './pages/Member/NewArrivedBooks/NewArrivedBooks';

/* Admin pages */
import AdminHome from './pages/admin/home/home';
import AddStaff from './pages/admin/AddNewStaff/AddStaff';
import EditStaff from './pages/admin/EditStaff/EditStaff';
import Books from './pages/admin/Books/Books';
import Members from './pages/admin/Members/Members';


/* Staff pages */
import Staff from './pages/admin/staff/Staff';
import StaffHome from './pages/staff/home/home';
import AllBooks from './pages/staff/all-books/all-books';
import AddBooks from './pages/staff/add-books/add-books';
import RentRenewReturn from './pages/staff/rent-renew-return/rent-renew-return';
import SendNewsletter from './pages/staff/send-newsletter/send-newsletter';
import ViewMembers from './pages/staff/view-members/view-members';
import BookProfile from './pages/staff/book-profile/book-profile';

/* Non member pages */
import NonMemberHome from './pages/non-member/Home/Home';
import BookStackIntro from './pages/non-member/BookStackIntro/BookStackIntro';
import Membership from './pages/non-member/Membership/Membership';
import OrderSummary from './pages/non-member/OrderSummary/OrderSummary';
import Register from './pages/non-member/Register/Register';
import Login from './pages/non-member/Login/Login';
import MemberProfile from './pages/admin/Members/MemberProfile';
import SendLetter from './pages/admin/Members/SendLetter';
import AllStaffBooks from './pages/staff/all-books/all-books';
import MemberStaffProfile from './pages/staff/member-profile/member-profile';

function App() {
  return <Routes>    
    {/* NON MEMBER ROUTES */}
    <Route path="/" element={<NonMemberHome />}>
      <Route index element={<Navigate to="intro" replace />} />
      <Route path='intro' element={<BookStackIntro />} />
      <Route path="login" element={<Login />} />
      <Route path="membership" element={<Membership />} />
      <Route path="order-summary" element={<OrderSummary />} />
      <Route path="register" element={<Register/>}/>
    </Route>
    
    {/* MEMBER ROUTES */}
      <Route path="member" element={<Home />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<MemberHome />} />
        <Route path="recommended-books" element={<AllRecommendedBooks />} />
        <Route path="trending-books" element={<AllTrendingBooks />} />
        <Route path="new-arrivals" element={<AllNewArrivedBooks />} />
        <Route path="browse" element={<BrowseBooks />} />
        <Route path="account" element={<MyAccount />} />
        <Route path="book/:id" element={<BookDetails />} />
        <Route path="view" element={<ViewAllBooks />} />
        <Route path="liked-books" element={<LikedBooks />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="admin" element={<AdminHome />}>
        <Route path="staff" element={<Staff />} />
        <Route path="addstaff" element={<AddStaff />} />
        <Route path="editstaff" element={<EditStaff />} />
        <Route path="books" element={<Books />} />
        <Route path="members" element={<Members />} />
        <Route path="memberprofile" element={<MemberProfile/>} />
        <Route path='emailsending' element={<SendLetter/>}/>
      </Route>

    {/* STAFF ROUTES */}
    <Route path="/staff" element={<StaffHome/>}>
      <Route path="books" element={<AllStaffBooks/>}/>
      <Route path="books/add" element={<AddBooks/>}/>
      <Route path="books/profile" element={<BookProfile/>}/>
      <Route path="transaction" element={<RentRenewReturn/>}/>
      <Route path="newsletter" element={<SendNewsletter/>}/>
      <Route path="members" element={<ViewMembers/>}/>
      <Route path="members/profile" element={<MemberStaffProfile/>}/>
    </Route>
  </Routes>
}

export default App;

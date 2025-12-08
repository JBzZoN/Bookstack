import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import Login from './pages/non-member/Login/Login';
import NonMemberHome from './pages/non-member/home/home';

/* Member pages */
import Home from './pages/Member/Home/Home';
import MemberHome from './pages/Member/MemberHome/MemberHome';
import BrowseBooks from './pages/Member/BrowseBooks/BrowseBooks';
import MyAccount from './pages/Member/MyAccount/MyAccount';
import BookDetails from './pages/Member/BookDetails/BookDetails';
import ViewAllBooks from './pages/Member/ViewAllBooks/ViewAllBooks';

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
import MemberProfile from './pages/staff/member-profile/member-profile';
import BookProfile from './pages/staff/book-profile/book-profile';

/* Non member pages */
import BooksData from './pages/non-member/Books/Books';
import Membership from './pages/non-member/Membership/Membership';
import AboutUs from './pages/non-member/AboutUs/AboutUs';
import Register from './pages/non-member/Register/Register';

function App() {
  return <Routes>
    
    {/* NON MEMBER ROUTES */}
    <Route path="/" element={<NonMemberHome/>}>
        <Route index element={<Navigate to="aboutus" replace />} />
        <Route path='Login' element={<Login/>}></Route>
        <Route path="books" element={<BooksData/>}></Route>
        <Route path="membership" element={<Membership/>}></Route>
        <Route path="aboutus" element={<AboutUs/>}></Route>
        <Route path="register" element={<Register/>}></Route>

    </Route>
    
    {/* MEMBER ROUTES */}
      <Route path="member" element={<Home />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<MemberHome />} />
        <Route path="browse" element={<BrowseBooks />} />
        <Route path="account" element={<MyAccount />} />
        <Route path="book/:id" element={<BookDetails />} />
        <Route path="view" element={<ViewAllBooks />} />
      </Route>


      {/* ADMIN ROUTES */}
      <Route path="admin" element={<AdminHome />}>
        <Route path="staff" element={<Staff />} />
        <Route path="addstaff" element={<AddStaff />} />
        <Route path="editstaff" element={<EditStaff />} />
        <Route path="books" element={<Books />} />
        <Route path="members" element={<Members />} />
      </Route>

    {/* STAFF ROUTES */}
    <Route path="/staff" element={<StaffHome/>}>
      <Route path="books" element={<AllBooks/>}/>
      <Route path="books/add" element={<AddBooks/>}/>
      <Route path="books/profile" element={<BookProfile/>}/>
      <Route path="transaction" element={<RentRenewReturn/>}/>
      <Route path="newsletter" element={<SendNewsletter/>}/>
      <Route path="members" element={<ViewMembers/>}/>
      <Route path="members/profile" element={<MemberProfile/>}/>
    </Route>
  </Routes>
}

export default App;

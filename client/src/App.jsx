import { Routes, Route, Navigate } from "react-router-dom";

/* Non-member pages */
import NonMemberHome from './pages/nonmember/NonMemberHome';

/* Member pages */
import Home from './pages/Member/Home/Home';
import MemberHome from './pages/Member/Home/MemberHome';
import BrowseBooks from './pages/Member/BrowseBooks/BrowseBooks';
import MyAccount from './pages/Member/MyAccount/MyAccount';
import BookDetails from './pages/Member/BookDetails/BookDetails';
import ViewAllBooks from './pages/Member/ViewAllBooks/ViewAllBooks';

/* Admin pages */
import AdminHome from './pages/admin/home/home';
import Dummy from './pages/admin/dummy/dummy';
import Staff from './pages/admin/staff/Staff';
import AddStaff from './pages/admin/AddNewStaff/AddStaff';
import EditStaff from './pages/admin/EditStaff/EditStaff';
import Books from './pages/admin/Books/Books';
import Members from './pages/admin/Members/members';

function App() {
  return (
    <Routes>

      <Route path="/" element={<NonMemberHome />} />

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
        <Route path="dummy" element={<Dummy />} />
        <Route path="staff" element={<Staff />} />
        <Route path="addstaff" element={<AddStaff />} />
        <Route path="editstaff" element={<EditStaff />} />
        <Route path="books" element={<Books />} />
        <Route path="members" element={<Members />} />
      </Route>

    </Routes>
  );
}

export default App;

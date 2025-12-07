import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import NonMemberHome from './pages/non-member/home/home';
import MemberHome from './pages/member/home/home';
import StaffHome from './pages/staff/home/home';
import AdminHome from './pages/admin/home/home';
import Dummy from './pages/admin/dummy/dummy';
import AllBooks from './pages/staff/all-books/all-books';
import AddBooks from './pages/staff/add-books/add-books';
import RentRenewReturn from './pages/staff/rent-renew-return/rent-renew-return';
import SendNewsletter from './pages/staff/send-newsletter/send-newsletter';
import ViewMembers from './pages/staff/view-members/view-members';
import MemberProfile from './pages/staff/member-profile/member-profile';
import BookProfile from './pages/staff/book-profile/book-profile';

function App() {

  return<Routes>
    <Route path="/" element={<NonMemberHome/>}>
    
    </Route>
    
    <Route path="/member" element={<MemberHome/>}>
    
    </Route>
    <Route path="/admin" element={<AdminHome/>}>
      <Route path='dummy' element={<Dummy/>}/>
    </Route>
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

export default App

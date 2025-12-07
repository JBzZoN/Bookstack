import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import NonMemberHome from './pages/non-member/home/home';
import MemberHome from './pages/Member/MemberHome/MemberHome';
import Home from './pages/Member/Home/Home';
import StaffHome from './pages/staff/home/home';
import AdminHome from './pages/admin/home/home';
import Dummy from './pages/admin/dummy/dummy';
import BrowseBooks from './pages/Member/BrowseBooks/BrowseBooks';
import MyAccount from './pages/Member/MyAccount/MyAccount';
import BookDetails from './pages/Member/BookDetails/BookDetails';
import ViewAllBooks from './pages/Member/ViewAllBooks/ViewAllBooks';
import { Navigate } from 'react-router-dom';

function App() {
  return <Routes>
    <Route path="/" element={<NonMemberHome/>}/>
    <Route path="member" element={<Home/>}>
      <Route index element={<Navigate to="home" replace />} />
      <Route path="home" element={<MemberHome/>}/>
      <Route path="browse" element={<BrowseBooks/>}/>
      <Route path="account" element={<MyAccount/>}/>
      <Route path="book/:id" element={<BookDetails/>}/>
      <Route path="view" element={<ViewAllBooks/>}/>
    </Route>
    <Route path="admin" element={<AdminHome/>}>
      <Route path='dummy' element={<Dummy/>}/>
    </Route>
    <Route path="staff" element={<StaffHome/>}/>
  </Routes>;
}

export default App

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Login from './pages/non-member/Login/Login';
import NonMemberHome from './pages/non-member/home/home';
import MemberHome from './pages/member/home/home';
import StaffHome from './pages/staff/home/home';
import AdminHome from './pages/admin/home/home';
import Dummy from './pages/admin/dummy/dummy';
import Books from './pages/non-member/Books/Books';
import Membership from './pages/non-member/Membership/Membership';
import AboutUs from './pages/non-member/AboutUs/AboutUs';
import Register from './pages/non-member/Register/Register';

function App() {
  return <Routes>
    
    <Route path="/" element={<NonMemberHome/>}>
        <Route path='Login' element={<Login/>}></Route>
        <Route path="books" element={<Books/>}></Route>
        <Route path="membership" element={<Membership/>}></Route>
        <Route path="aboutus" element={<AboutUs/>}></Route>
        <Route path="register" element={<Register/>}></Route>

    </Route>
    <Route path="/member" element={<MemberHome/>}></Route>
    <Route path="/admin" element={<AdminHome/>}>
      <Route path='dummy' element={<Dummy/>}/>
    </Route>
    <Route path="/staff" element={<StaffHome/>}></Route>
  </Routes>;
}

export default App

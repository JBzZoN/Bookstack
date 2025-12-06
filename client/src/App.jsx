import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import NonMemberHome from './pages/non-member/home/home';
import MemberHome from './pages/member/home/home';
import StaffHome from './pages/staff/home/home';
import AdminHome from './pages/admin/home/home';
import Staff from './pages/admin/staff/Staff';
import AddStaff from './pages/admin/AddNewStaff/AddStaff';
import EditStaff from './pages/admin/EditStaff/EditStaff';
import Books from './pages/admin/Books/Books';
import Members from './pages/admin/Members/members';

function App() {
  return <Routes>
    <Route path="/" element={<NonMemberHome/>}></Route>
    <Route path="/member" element={<MemberHome/>}></Route>
    <Route path="/admin" element={<AdminHome/>}>
      <Route path="Staff" element={<Staff/>} />
      <Route path="AddStaff" element={<AddStaff/>} />
      <Route path="editstaff" element={<EditStaff/>} />
      <Route path="books" element={<Books/>} />
      <Route path="members" element={<Members/>} />
    </Route>
    <Route path="/staff" element={<StaffHome/>}></Route>
  </Routes>;
}

export default App

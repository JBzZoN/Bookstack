import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import NonMemberHome from './pages/non-member/home/home';
import MemberHome from './pages/member/home/home';
import StaffHome from './pages/staff/home/home';
import AdminHome from './pages/admin/home/home';
import Dummy from './pages/admin/dummy/dummy';

function App() {
  return <Routes>
    <Route path="/" element={<NonMemberHome/>}></Route>
    <Route path="/member" element={<MemberHome/>}></Route>
    <Route path="/admin" element={<AdminHome/>}>
      <Route path='dummy' element={<Dummy/>}/>
    </Route>
    <Route path="/staff" element={<StaffHome/>}></Route>
  </Routes>;
}

export default App

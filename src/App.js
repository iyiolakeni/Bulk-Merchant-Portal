import './App.css';
import './css/login.css';
import './css/form.css';
import './css/pos.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import { UserProvider } from './UserProvider';
import NewRequest from './pages/new_request';
import Allrequests from './pages/all-request';
import Pending_requests from './pages/pending-request';
import Approved_Request from './pages/approved';
import In_Process from './pages/in_process';
import Denied_Request from './pages/denied_request';
import EmailBoard from './pages/email_board';
import Merchants from './pages/merchants';

function App() {
  return (
    <div className='home'>
      <UserProvider>
     <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/NewRequest" element={<NewRequest/>}/>
        <Route path="/allrequests" element={<Allrequests/>}/>
        <Route path="/pendingrequest" element={<Pending_requests/>}/>
        <Route path="/approved" element={<Approved_Request/>}/>
        <Route path="/In_Process" element={<In_Process/>}/>
        <Route path="/denied_request" element={<Denied_Request/>}/>
        <Route path="/email" element={<EmailBoard/>}/>
        <Route path="/merchantlist" element={<Merchants/>}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

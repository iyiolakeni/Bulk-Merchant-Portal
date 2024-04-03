import './App.css';
import './css/login.css';
import './css/form.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import { UserProvider } from './UserProvider';
import NewRequest from './pages/new_request';
import Allrequests from './pages/all-request';
import Pending_requests from './pages/pending-request';
import Approved_request from './pages/approved';
import In_Process from './pages/in_process';
import Denied_Request from './pages/denied_request';

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
        <Route path="/approvedrequest" element={<Approved_request/>}/>
        <Route path="/in-process-request" element={<In_Process/>}/>
        <Route path="/denied_request" element={<Denied_Request/>}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

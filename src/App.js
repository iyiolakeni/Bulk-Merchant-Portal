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
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

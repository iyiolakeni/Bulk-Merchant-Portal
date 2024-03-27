import './App.css';
import './css/login.css';
import './css/form.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import { UserProvider } from './UserProvider';
import New_Request from './pages/new_request';

function App() {
  return (
    <div className='home'>
      <UserProvider>
     <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/New_Request" element={<New_Request/>}/>
      </Routes>
      </UserProvider>
    </div>
  );
}

export default App;

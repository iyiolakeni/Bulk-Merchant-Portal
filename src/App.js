import './App.css';
import './css/login.css';
import { Link, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/login';

function App() {
  return (
    <div className='home'>
     <Routes>
      <Route path='/' element={<Login/>}/>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;

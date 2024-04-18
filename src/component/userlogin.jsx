import React, { useState } from 'react';
import '../css/login.css';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/users/login', { username, password });
  
      if (response.data.success) {
        const user = response.data.user;
        setUser(user);
        if (user.jobPosition === 'NBSS')
        {
          navigate('/NibssDashboard');
        }
        else{
          navigate('/Dashboard');
        }
        console.log(user);
    }
  } 
    catch (error) {
      setErrorMessage('Wrong user details');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className='loginDiv'>
        <form className='login' onSubmit={handleSubmit}>
          <input className='username' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className='password' placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessage && <p>{errorMessage}</p>}
          <button type='submit'>LOGIN</button>
        </form>
        <Link to="/Signup">New User?</Link>
      </div>
    </div>
  );
}

export default UserLogin;
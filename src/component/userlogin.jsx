import React, { useState } from 'react';
import '../css/login.css';
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    if (!response.ok) {
      setErrorMessage('Wrong user details');
      return;
    }
  
    const data = await response.json();
  
    if (data.success) {
      const user = data.user;
      setUser(user);
      navigate('/Dashboard');
      console.log(user);
    } else {
      setErrorMessage("username or password is incorrect");
    }
  };

  return (
    <div className="App">
      <div className='new'></div>
      <div className='loginDiv'>
        <form className='login' onSubmit={handleSubmit}>
          <input className='username' placeholder='Username or Email' value={username} onChange={(e) => setUsername(e.target.value)} />
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
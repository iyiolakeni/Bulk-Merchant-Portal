import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showLoginDiv, setShowLoginDiv] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [jobPosition, setJobPosition] = useState('');

  
  // Handles the account type selection
  const handleAccountTypeClick = (e) => {
    setJobPosition(e.target.value);
  };

  const handleOnClick = () => {
    setShowLoginDiv(!showLoginDiv);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      // Handle error
      console.error('Passwords do not match');
      return;
    }
  
    try{
    const response = await fetch('http://localhost:5000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password, firstname, surname, jobPosition })
    });
  
    
    if (!response.ok) {
      const data = await response.json();
      console.error('Signup failed:', data.message);
      return;
    }
  
    // Redirect to home page
      navigate('/');
      console.log(jobPosition);
    }
      // Handle error
    catch(error)
    {  console.error('Error', error);
    }
  };
  
  return (
    <div className="App">
      <div className="new"></div>
      {!showLoginDiv && (
  <div className="loginDiv">
 
  <select 
  style={{backgroundColor: "#F7F1FD",color:"black"}} 
  onChange={handleAccountTypeClick} 
  value={jobPosition} 
  className="userType"
>
  <option value="">Select Account Type</option>
  <option value="Account Officer">Account Officer</option>
  <option value="POS Business Officer">POS Business Officer</option>
  <option value="Business Developer">Business Developer</option>
  <option value="Account Developer">Account Developer</option>
</select>

    <button style={{ color: 'white', backgroundColor: '#CDADF5', border: '25px', width:'150%'}} onClick={handleOnClick}>CONFIRM</button>
  </div>
)}
      {showLoginDiv && (
        <div className="loginDiv">
          <form className="login" onSubmit={handleSubmit}>
            <input className="username" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="username" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
            <input className="username" placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <input className="username" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className="password" placeholder="Confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit">SIGN UP</button>
          </form>
    </div>
        )}
        </div>
  );
};
export default Signup;

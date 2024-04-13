import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import {useNavigate} from "react-router-dom"
const Navbar = () => {
  const {user} = useContext(UserContext);

  const naviagate = useNavigate();
 const click = () =>{
  naviagate('/email');
 }
  return (
    <nav className="navbar">
      <div className='welcome'>
      <h1>Welcome</h1>
      <input type="search" placeholder="Search..." />
      </div>
      <div className='profile'>
        <button onClick={click}>📩</button>
        <button>🔔</button>
        {/* A box to get the User name first Letter of user fname and lname */}
        <p style={{width: 'auto', background:'#EDCFF3', color:'#630678', borderRadius:'10px', padding: '10px', fontSize:'20px', fontWeight:'bold' }}>{user.firstname[0] + '.' + user.surname[0]}</p>
        <div>
        <p style={{fontSize:'14px', fontWeight:'bold'}}>{user.firstname +' '+ user.surname}</p>
        <p style={{fontSize:'10', fontWeight:'lighter'}}>{user.jobPosition}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
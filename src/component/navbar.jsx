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
      <input type="search" placeholder="Search..." />
      </div>
      <div className='profile'>
        {/* <span className='navemail'></span> */}
        <span className='navemail' onClick={click}></span>
        <span onClick={click} className="instant-message"></span>
        {/* A box to get the User name first Letter of user fname and lname */}
        <p style={{width: '30px', background:'#EDCFF3', color:'#630678', borderRadius:'10px', padding: '10px', fontSize:'20px', fontWeight:'500', textAlign: 'center' }}>{user.firstname[0] + user.surname[0]}</p>
        <div>
        <p style={{fontSize:'14px', fontWeight:'bold'}}>{user.firstname +' '+ user.surname}</p>
        <p style={{fontSize:'10', fontWeight:'lighter'}}>{user.jobPosition}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';

const Navbar = ({user}) => {
  return (
    <nav className="navbar">
      <div className='welcome'>
      <h1>Welcome</h1>
      <input type="search" placeholder="Search..." />
      </div>
      <div className='profile'>
        <button>📩</button>
        <button>🔔</button>
        {/* A box to get the User name first Letter of user fname and lname */}
        <p style={{width: 'auto', background:'#EDCFF3', color:'#630678', borderRadius:'10px', padding: '10px', fontSize:'20px', fontWeight:'bold' }}>{user.fname[0] + '.' + user.lname[0]}</p>
        <div>
        <p style={{fontSize:'14px', fontWeight:'bold'}}>{user.fname+' '+user.lname}</p>
        <p style={{fontSize:'10', fontWeight:'lighter'}}>{user.role}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
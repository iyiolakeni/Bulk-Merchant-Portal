import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  }

  const dropDownOpen = () => {  
    setShow(!show);
  };
  return (
    <nav className="sidebar">
      <div className="menu">
      <ul style={{marginBottom:"15%"}}>
        <li className="dash_board">
          <Link to="/Dashboard" className={window.location.pathname === '/Dashboard' ?  'active' : ''}>Dashboard</Link>
        </li>
        <li>
          <Link onClick={dropDownOpen} className={window.location.pathname=== '/NewRequest' || '/allrequests' || '/In_Process' || '/approved' || '/pendingrequest' || '/denied_request' ?  'active' : ''}>Request</Link>
          {show && (
            user.jobPosition === 'Account Officer' ? (
            <ul className="dropdown">
              <li><Link to="/NewRequest" className={window.location.pathname === '/NewRequest' ? 'active' : ''}>New Request</Link></li>
              <li><Link to="/allrequests" className={window.location.pathname === '/allrequests' ? 'active' : ''}>View All Requests</Link></li>
                <li><Link to="/In_Process" className={window.location.pathname === '/In_Process' ? 'active' : ''}>View In-Process Requests</Link></li>
                <li><Link to="/pendingrequest" className={window.location.pathname === '/pendingrequest' ? 'active' : ''}>Pending Requests</Link></li>
                <li><Link to="/approved" className={window.location.pathname === '/approved' ? 'active' : ''}>View Approved Requests</Link></li>
                <li><Link to="/denied_request" className={window.location.pathname === '/denied_request' ? 'active' : ''}>View Denied Requests</Link></li>
            </ul>) : (
              <ul className="dropdown">
                <li><Link to="/allrequests" className={window.location.pathname === '/allrequests' ? 'active' : ''}>View All Requests</Link></li>
                <li><Link to="/In_Process" className={window.location.pathname === '/In_Process' ? 'active' : ''}>View In-Process Requests</Link></li>
                <li><Link to="/pendingrequest" className={window.location.pathname === '/pendingrequest' ? 'active' : ''}>Pending Requests</Link></li>
                <li><Link to="/approved" className={window.location.pathname === '/approved' ? 'active' : ''}>View Approved Requests</Link></li>
                <li><Link to="/denied_request" className={window.location.pathname === '/denied_request' ? 'active' : ''}>View Denied Requests</Link></li>
              </ul>)
            
            )}
        </li>
        <li>
          <Link to="/merchantlist" className={window.location.pathname === '/merchantlist' ? 'active' : ''}>Merchants</Link>
        </li>
      </ul>
      </div>
      <div className="logout">
       <button style={{color: "white"}} onClick={handleLogout}>
       Logout
        </button>
      </div>
    </nav>
  );
  
};
export default SideBar;

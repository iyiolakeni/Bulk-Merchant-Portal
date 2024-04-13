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
          <Link to="/Dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={dropDownOpen} className="dropDown">Request</button>
          {show && (
            user.jobPosition === 'Account Officer' ? (
            <ul className="dropdown">
              <li><Link to="/NewRequest">New Request</Link></li>
              <li><Link to="/allrequests">View All Requests</Link></li>
                <li><Link to="/In_Process">View In-Process Requests</Link></li>
                <li><Link to="/pendingrequest">Pending Requests</Link></li>
                <li><Link to="/approved">View Approved Requests</Link></li>
                <li><Link to="/denied_request">View Denied Requests</Link></li>
            </ul>) : (
              <ul className="dropdown">
                <li><Link to="/allrequests">View All Requests</Link></li>
                <li><Link to="/In_Process">View In-Process Requests</Link></li>
                <li><Link to="/pendingrequest">Pending Requests</Link></li>
                <li><Link to="/approved">View Approved Requests</Link></li>
                <li><Link to="/denied_request">View Denied Requests</Link></li>
              </ul>)
            
            )}
        </li>
        <li>
          <Link to="/merchantlist">Merchants</Link>
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

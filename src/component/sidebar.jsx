import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);

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
      <ul>
        <li>
          <Link to="/Dashboard">Dashboard</Link>
        </li>
        <li>
          <button onClick={dropDownOpen} className="dropDown">Request</button>
          {show && (
            <ul className="dropdown">
              <li><Link to="/new-request">New Request</Link></li>
              <li><Link to="/all-requests">View All Requests</Link></li>
              <li><Link to="/in-process-requests">View In-Process Requests</Link></li>
              <li><Link to="/approved-requests">View Approved Requests</Link></li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/report">Report and Analysis</Link>
        </li>
      </ul>
      </div>
      <div className="logout">
       <button onClick={handleLogout}>
       Logout
        </button>
      </div>
    </nav>
  );
};
export default SideBar;

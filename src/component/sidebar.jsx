import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const SideBar = () => {
  const [show, setShow] = useState(false);

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
      <Link to="/">
        Logout
      </Link>
      </div>
    </nav>
  );
};
export default SideBar;

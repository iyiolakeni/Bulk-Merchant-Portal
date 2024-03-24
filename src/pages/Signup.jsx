import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showLoginDiv, setShowLoginDiv] = useState(false);

  const handleOnClick = () => {
    setShowLoginDiv(!showLoginDiv);
  };
  const [show, setShow] = useState(false);

  const dropDownOpen = () => {
    setShow(!show);
  };
  return (
    <div className="App">
      <div className="new"></div>
      {!showLoginDiv && (
        <div className="loginDiv ">
          <div className="signup">
            <button onClick={dropDownOpen} style={{width: '150%'}}>
              <a className="selUser">SELECT USER</a>
            </button>
          </div>
          {show && (
            <div className="loginDivBut">
              <button value={"Account Officer"} className="userType">
                Account Officer
              </button>
              <button value={"POS Business Officer"} className="userType">
                POS Business Officer
              </button>
              <button value={"Business Developer"} className="userType">
                Business Developer
              </button>
              <button value={"Account Developer"} className="userType">
                Account Developer
              </button>
              <button style={{ color: 'white', backgroundColor: '#CDADF5', border: '25px'}} onClick={handleOnClick}>CONFIRM</button>
            </div>
          )}
        </div>
      )}

      {showLoginDiv && (
        <div className="loginDiv">
          <div className="login">
            <input className="username" placeholder="Email" />
            <input className="username" placeholder="Username" />
            <input className="username" placeholder="Password" />
            <input className="password" placeholder="Confirm password" />
          </div>
          <button>
            <Link to="/">SIGN-UP</Link>
          </button>
        </div>
      )}
    </div>
  );
};
export default Signup;

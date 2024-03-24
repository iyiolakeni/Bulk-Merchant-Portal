import React from "react";
import { Link } from "react-router-dom";

const Notification = ({ notifications }) => {
  return (
    <div className="notification">
      <div className="notification-header">
        <h2 style={{ color: "#0D163A", fontSize: "20" }}>Notification</h2>
        <p style={{ color: "#0D163A", fontSize: "14" }}><Link>See All</Link></p>
      </div>
      {notifications.map((notification, index) => (
        <div key={index} className="notifications">
          <div className="notification-icons">
            <p style={{fontSize: "12px"}}>Request {notification.status}</p>
          </div>
          <div className="notification-info">
            <div className="notification_info">
              <p style={{ fontSize: "14.56px", fontWeight: "normal" }}>
                {notification.message}
              </p>
            </div>
            <div className="notification-status">
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                {notification.amount}
              </p>
              <p style={{fontSize: "12px"}}>{notification.approved_date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Notification;
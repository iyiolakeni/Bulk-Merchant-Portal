import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    const timeSince = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = Math.floor(seconds / 31536000);
    
        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/forms');
                const notifications = response.data.map(form => {
                    const updatedAt = new Date(form.updatedAt);
                    const timeAgo = timeSince(updatedAt);

                    return {
                        message: `Form ${form.RequestId} is ${form.status}.`,
                        status: form.status,
                        time: timeAgo,
                        requestId: form.RequestId
                    };
                });
                setNotifications(notifications);
            } catch (error) {
                console.error('Error fetching forms', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const navigate = useNavigate();
    const handleOnClick = (requestId) => {
        console.log(requestId);
        navigate(`/request/${requestId}`)
    }
    return (
        <div className="notification">
            <div className="notification-header">
                <h2 style={{ color: "#0D163A", fontSize: "20" }}>Notification</h2>
                <p style={{ color: "#0D163A", fontSize: "14" }}><Link to="#">See All</Link></p>
            </div>
            {notifications.reverse().slice(0, 5).map((notification, index) => (
    <div key={index} className="notifications">
        <div className="notification-info">
            <div className="notification_info" onClick={() => handleOnClick(notification.requestId)}>
                <p style={{ fontSize: "14.56px", fontWeight: "normal" }}>
                    {notification.message}
                </p>
                <p className="status" style={{fontSize: "12px"}}>Request {notification.time}</p>
            </div>
        </div>
    </div>
))}
        </div>
    );
};

export default Notification;
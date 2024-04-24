import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Notification = (num) => {
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
                        message: `Your request is ${form.status}.`,
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
                <p style={{ color: "#0D163A", fontSize: "20px", fontWeight: "bold" }}>Notification</p>
                <p style={{ color: "#0D163A", fontSize: "14px"}}><Link to="#">See All</Link></p>
            </div>
            {notifications.reverse().slice(0, num.num).map((notification, index) => (
    <div key={index} className="notifications">
        <div className="notification-info">
            <div className="notification_info" onClick={() => handleOnClick(notification.requestId)}>
                <div className='req'>
                <h3 style={{margin: '0px'}}>{notification.requestId}</h3>
                <p style={{fontSize: "15px", margin: '0px'}}>{notification.time}</p>
                </div>
                <p style={{ fontSize: "14.56px", fontWeight: "normal", margin:'10px 0px'}}>
                    {notification.message}
                </p>
            </div>
                <div className='req1'>
            <p className="nstatus">Request {notification.status}</p>
                </div>
        </div>
    </div>
))}
        </div>
    );
};

export default Notification;
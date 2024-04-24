import React, { useContext, useEffect, useState } from 'react';
import '../css/email.css';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NewEmail from './newemail';

const Email = () => {
  const { user } = useContext(UserContext);
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [open, setOpen] = useState(false);

  const closeForm = (e) => {
    setOpen(false);
  }
  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return date.toLocaleDateString(); // return the date in "Month day, year" format
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return date.toLocaleDateString(); // return the date in "Month day, year" format
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return 'Yesterday';
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + ' mins ago';
    }
    return Math.floor(seconds) + ' seconds';
  }

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/emails/allemail');
        setEmails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmails(); // Fetch emails immediately after component mounts

    const intervalId = setInterval(fetchEmails, 10000); // Fetch emails every 10 seconds

    return () => {
      clearInterval(intervalId); // Clear the interval when the component unmounts
    };
  }, []);

  return (
    <div className="email-system">
      <div className="emailheader">
      <h1>Email Feed</h1>
      <Link onClick={() => setOpen(true)}>New Email</Link>
      </div>
      <div className="email-list">
        {emails
          .filter((email) => email.from === user.email || email.to === user.email)
          .map((email, index) => {
            const isSent = email.from === user.email;
            const isInbox = email.to === user.email;

            return (
              <div>
              <div key={index} className="email-summary" onClick={() => handleEmailClick(email)}>
                <p className={isSent ? 'sent' : isInbox ? 'inbox' : ''}>
                  {isSent ? '\u2713\u2713' : isInbox ? '\u1F4E\u1F4E' : ''}
                </p>
                <p className="intials">{email.name ? email.name.split(' ').map((word) => word[0]).join('') : ''}</p>
                <p>{email.name}</p>
                <p style={{fontWeight: '500'}}>{email.subject}</p>
                <p>{email.message.split(' ').slice(0, 10).join(' ')}...</p>
                <p>{timeSince(new Date(email.date))}</p>
              </div>
                {selectedEmail && selectedEmail === email && (
                  <div className="email-details">
                    <h2>{selectedEmail.subject}</h2>
                    <h3>From: {selectedEmail.name}</h3>
                    <p>{selectedEmail.message}</p>
                  </div>
                )}
      </div>
            );
          })}
    </div>
    {open && (
      <div className="modal">
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          width: "40%",
          height: "60%",
          gap: "20%",
          padding: "2%",
          justifyContent: "center",
          display: "grid",
          justifyItems: "center",
        }}
      >
      <NewEmail closeForm={closeForm}/>
      </div>
    </div>
    )}
    </div>
  );
};

export default Email;
import React, { useState } from 'react';
import '../css/email.css';

const EmailSystem = ({ emails }) => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div className="email-system">
      <div className="email-list">
        {emails.map((email, index) => (
          <div key={index} className="email-summary" onClick={() => handleEmailClick(email)}>
            <p>{email.title}</p>
            <p>{email.time}</p>
          </div>
        ))}
      </div>
      {selectedEmail && (
        <div className="email-details">
          <h2>{selectedEmail.title}</h2>
          <h3>From: {selectedEmail.name}</h3>
          <p>{selectedEmail.message}</p>
        </div>
      )}
    </div>
  );
};

export default EmailSystem;
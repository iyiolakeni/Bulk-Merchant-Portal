import React, { useState } from 'react';
import axios from 'axios';

const NewEmail = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = {
      recipient,
      subject,
      body,
    };

    try {
      const response = await axios.post('/api/emails', email);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='emailForm' onSubmit={handleSubmit}>
      <label>
        To:
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
      </label>
      <label>
        Subject:
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      </label>
      <label>
        Body:
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
      </label>
      <button type="submit">Send</button>
    </form>
  );
};

export default NewEmail;
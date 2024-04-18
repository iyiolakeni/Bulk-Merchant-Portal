import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from "../UserContext";


const NewEmail = (props) => {
  const {user} = useContext(UserContext)
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  // const [open, setOpen] = useState(false);

  const handleClose = () => {
    props.closeForm();
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = {
      sender: user.email,
      recipient,
      subject,
      body,
    };

    try {
      const response = await axios.post('http://localhost:5000/emails/send', email);
      console.log(response.data);
      props.closeForm();
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
      <button type='close' onClick={handleClose}>Close</button>
    </form>
  );
};

export default NewEmail;
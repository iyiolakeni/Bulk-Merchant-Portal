import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from "../UserContext";


const NewEmail = (props) => {
  const {user} = useContext(UserContext);
  const formObj =useRef();

  const handleClose = () => {
    props.closeForm();
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const form = new FormData(formObj.current);
    const email = {};
    form.forEach((value, key) => {
      email[key] = value;
    });

    //get User email
    email.from = user.email;

    try {
      const response = await axios.post('http://localhost:5000/emails/send', email);
      console.log(response.data);
      formObj.current.reset();
      props.closeForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form ref={formObj} className='emailForm' onSubmit={handleSubmit}>
      <label>
        To:
        <input type="text" name='to' required />
      </label>
      <label>
        Subject:
        <input type="text" name='subject' required />
      </label>
      <label>
        Body:
        <textarea name='message' required />
      </label>
      <div className='emailBut'>
      <button type="submit">Send</button>
      <button type='close' onClick={handleClose}>Close</button>
      </div>
    </form>
  );
};

export default NewEmail;
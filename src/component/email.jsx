import React from 'react';
import '../css/chatsidebar.css';

const Email = ({emails}) =>{
    return(
        <div className="email_box">
           {emails.map((email, index) => (
          <div className='email_name'>
            <p className='intials'>{email.name.charAt(0)}</p>
            <p>{email.name}</p>
            <p>{email.title}</p>
            <p>{email.message}</p>
            <p>{email.time}</p>
          </div>
      ))} 
        </div>
    )
}
export default Email;
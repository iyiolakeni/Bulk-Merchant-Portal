import React from 'react';
import '../css/chatsidebar.css';

const ChatSidebar = ({ chats }) => {
  const unreadCount = chats.filter(chat => chat.status === 'unread').length;
  const statusClasses = {
    read: 'read',
    unread: 'unread',
    typing: 'typing',
    sent: 'sent'
  };
  
  return (
    <div className="chat-sidebar">
      <div className="header">
        <h2 style={{color: '#0D163A', fontSize: '20'}}>Chats</h2>
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>
      {chats.map((chat, index) => (
        <div key={index} className={`chat ${statusClasses[chat.status] || ''}`}>
          <img className="chat-icon" src={chat.image} alt={chat.name} />
          <div className='chat_name'>
          <div className="chat-info">
            <p style={{fontSize:'18px', fontWeight:'bold'}}>{chat.name}</p>
            <p>{chat.time}</p>
          </div>
          <div className="chat-status">
            <p style={{fontSize:'14px', fontWeight:'bold'}}>{chat.position}</p>
            <h6>{chat.status}</h6>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
import React from "react";
import "../css/chatsidebar.css";
import ChatSidebar from "../component/chatbox";
import arabella4 from "../images/arabella4(0).jpg";
import image2 from "../images/DSC_4119.jpg";
import image3 from "../images/Light.jpg";
import image4 from "../images/headshot.png";
import Notification
 from "./notification";

 const RequestCards = ({ requests}) => {
  // const user = { fname: "Iyioluwa", lname: "Awe", role: "Bank Manager" };
  const chats = [
    {
      image: arabella4,
      name: "Iyioluwa Awe",
      position: "Hello",
      time: "10:00 AM",
      status: "unread",
    },
    {
      image: image2,
      name: "Oluwapelumi Adekola",
      position: "Hi",
      time: "9:30 AM",
      status: "read",
    },
    {
      image: image3,
      name: "User 3",
      position: "Good morning",
      time: "9:00 AM",
      status: "sent",
    },
    {
      image: image4,
      name: "User 4",
      position: "How are you?",
      time: "8:30 AM",
      status: "typing",
    },
    {
      image: image4,
      name: "User 5",
      position: "Have a nice day",
      time: "8:00 AM",
      status: "unread",
    },
  ];
  const reques = { amount: "1000", status: "Approved", id: "Req9187"};
  const notification = [
    {
      message: `The Request ${reques.id} has been Approved By the Business Developer Awaiting Retrievel`,
      name: "User 1",
      approved_date: "29-Feb-2024",
      status: reques.status,
      amount: reques.amount
    },
    {
      message: `The Request ${reques.id} has been Approved By the Business Developer Awaiting Retrievel`,
      name: "User 1",
      approved_date: "29-Feb-2024",
      status: reques.status,
      amount: reques.amount
    },
  ]
      return (
      <div className="request_info">
        <div className="card_overview">
          <div className="overview">
            <p
              style={{
                fontSize: "32px",
                textAlign: "left",
                marginLeft: "10px",
                fontWeight: "bold",
                color: "#0D163A",
                marginBottom: "0px",
                marginTop: "-0.5%"
              }}
            >
              OVERVIEW
            </p>
          </div>
          <div className="card_allview">
            <div className="card1">
              {requests.map((request, index) => (
                <div key={index} className="request_card">
                  <div className="card_name_icon">
                    <p className="total">TOTAL</p>
                  </div>
                  <div className="amount_clickmore">
                    <p>{request.amount}</p>
                  </div>
                </div>
              ))}
              {/* TOTAL AMOUNT OF PENDING REQUESTS */}
              {requests.map((request, index) => (
                <div key={index} className="request_card">
                  <div className="card_name_icon">
                    <p className="pending">Pending</p>
                  </div>
                  <div className="amount_clickmore">
                    <p>{request.amount}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* // TOTAL AMOUNT OF APPROVED REQUESTS */}
            <div className="card2">
              {requests.map((request, index) => (
                <div key={index} className="request_card">
                  <div className="card_name_icon">
                    <p className="approved">APPROVED</p>
                  </div>
                  <div className="amount_clickmore">
                    <p>{request.amount}</p>
                  </div>
                </div>
              ))}
              {/* TOTAL AMOUNT OF REJECTED REQUESTS */}
              {requests.map((request, index) => (
                <div key={index} className="request_card">
                  <div className="card_name_icon">
                    <p className="reject">REJECTED</p>
                  </div>
                  <div className="amount_clickmore">
                    <p>{request.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

            <Notification notifications={notification}/>
        </div>
        <ChatSidebar chats={chats} />
      </div>
  );
};

export default RequestCards;

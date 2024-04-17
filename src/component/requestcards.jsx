import React, { useContext, useEffect, useState } from "react";
import "../css/chatsidebar.css";
// import ChatSidebar from "../component/chatbox";
// import arabella4 from "../images/arabella4(0).jpg";
// import image2 from "../images/DSC_4119.jpg";
// import image3 from "../images/Light.jpg";
// import image4 from "../images/headshot.png";
import Notification from "./notification";
import axios from "axios";
import { UserContext } from "../UserContext";

 const RequestCards = () => {
  const {user} = useContext(UserContext);
  const [pendingRequest, setPending] = useState(0);
  const [approvedRequest, setApproved] = useState(0);
  const [declinedRequest, setDeclined] = useState(0);
  const [totalRequest, setTotal] = useState(0);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/forms');
        const response2 = await axios.get('http://localhost:5000/POS/allrequest');
        let requests = response.data;
        let requests2 = response2.data;
        const username = user.firstname + ' ' + user.surname;
  
        if (user.jobPosition === 'Account Officer') {
          requests = requests.filter(request => request.officer_name === username);
        }
        const pending = requests.filter(request => request.status === 'pending').length;
        const approved = requests.filter(request => request.status === 'approved').length;
        const declined = requests.filter(request => request.status === 'declined').length;
        const total = requests.length;
  
        setPending(pending);
        setApproved(approved);
        setDeclined(declined);
        setTotal(total);

        if (user.jobPosition === 'POS Business Officer'){
        const pending = requests.filter(request => request.status === 'approved').length;
        const approved = requests2.filter(request => request.status === 'approved').length;
        const declined = requests2.filter(request => request.status === 'declined').length;
        const total = pending + approved + declined;
  
        setPending(pending);
        setApproved(approved);
        setDeclined(declined);
        setTotal(total);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchRequests();
    const intervalId = setInterval(fetchRequests, 5000);

    return() => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

      return (
      <div className="request_info">
          <div className="overview">
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#0D163A",
                marginBottom: "0px",
              }}
            >
              Welcome {user.firstname}!
            </p>
            <p>Manage your POS Request with ease</p>
          </div>
        <div className="card_overview">
          <div className="card_allview">
            <div className="card1">
                <div className="request_card">
                    <p className="app">TOTAL</p>
                    <p className="app1">{totalRequest}</p>
                  <p className="total"></p>
                </div>
              {/* TOTAL AMOUNT OF PENDING REQUESTS */}
                <div className="request_card">
                    <p className="app">Pending</p>
                    <p className="app1">{pendingRequest}</p>
                    <p className="pending"></p>
                </div>
                <div className="request_card">
                    <p className="app">Pending</p>
                    <p className="app1">{pendingRequest}</p>
                    <p className="pending"></p>
                </div>
            </div>
            {/* // TOTAL AMOUNT OF APPROVED REQUESTS */}
            <div className="card2">
                <div className="request_card">
                    <p className="app">APPROVED</p>
                    <p className="app1">{approvedRequest}</p>
                    <p className="approved"></p>
                  </div>
                <div className="request_card">
                    <p className="app">APPROVED</p>
                    <p className="app1">{approvedRequest}</p>
                    <p className="approved"></p>
                  </div>
              {/* TOTAL AMOUNT OF REJECTED REQUESTS */}
                <div className="request_card">
                    <p className="app">REJECTED</p>
                    <p className="app1">{declinedRequest}</p>
                    <p className="reject"></p>
                </div>
            </div>
          </div>
            <Notification num={3}/>
        </div>
      </div>
  );
};

export default RequestCards;

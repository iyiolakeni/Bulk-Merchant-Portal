import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import PosRequest from "./posrequest";

const ViewARequest = ({ requestId }) => {
  const [request, setRequest] = useState(null);
  const [merchant, setMerchant] = useState(null);
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const navItems = ["Request Details", "Merchant Details", "Notes"];

  const [selectedForm, setSelectedForm] = useState("form1");
  const handleOnClick = (formId) => {
    setSelectedForm(formId);
  };

  const closeForm = () => {
    setShow2(false);
  };

  //This function fetches the request details from the server and sets them in state.
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/forms/${requestId}`
        );
        const response2 = await axios.get(
          `http://localhost:5000/merchant/${response.data.MerchantID}`
        );
        console.log(response.data);
        setRequest(response.data);
        console.log(response2.data);
        setMerchant(response2.data);
        console.log(user.jobPosition);
        if (user.jobPosition === "Business Developer") {
          if (response.data.status === "pending") setShow(true);
        }
        if (user.jobPosition === "POS Business Officer") {
          if (response.data.status === "approved") setShow(true);
        }
      } catch (error) {
        console.error("Failed to fetch request:", error);
      }
    };

    fetchRequest();
  }, [requestId]);

  if (!request) return <p>Loading...</p>;

  // this function is to upon approve button for business developer update Form Status;
  const handleApprove = async () => {
    if (user.jobPosition === "Business Developer") {
      try {
        const response = await axios.put(
          `http://localhost:5000/forms/${requestId}`,
          { status: "approved" }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Failed to update request:", error);
      }
    }
    if (user.jobPosition === "POS Business Officer") {
      setShow2(true);
    }
  };

  const handleDenied = async () => {
    if (user.jobPosition === "Business Developer") {
      try {
        const response = await axios.put(
          `http://localhost:5000/forms/${requestId}`,
          { status: "denied" }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Failed to update request:", error);
      }
    }
    if (user.jobPosition === "POS Business Officer") {
      try {
        const response = await axios.put(
          `http://localhost:5000/forms/${requestId}`,
          { status: "denied" }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Failed to Update request:", error);
      }
    }
  };

  return (
    <div className="review">
<nav>
  <ul className="ordernav">
    {navItems.map((item, index) => {
      let formId = `form${index + 1}`;
      return (
        <li
          key={index}
          className={selectedForm === formId ? 'active' : ''}
          onClick={() => handleOnClick(formId)}
        >
          {item}
        </li>
      );
    })}
  </ul>
</nav>
      {selectedForm === "form1" && (
        <div className="reviewForm">
          <h3>Request Information</h3>
          <label>
          RequestID:
            <p>{request.RequestId}</p>
          </label>
          <label>
            No of POS Requested:
            <p>{request.No_of_POS_terminal}</p>
          </label>
          <div className="order">
            <label>
              Number of Locations:
              <p>{request.location_of_terminal.length}</p>
            </label>
            <label>
                Location(s) of Terminal:
              
              <p>{request.location_of_terminal}</p>
            </label>
          </div>
          <div className="order">
            <label>
              Contact Persons:
              <p>{request.contact_person}</p>
            </label>
            <label>
              Contact Numbers
              <p>
                {request.contact_mobile_no}
              </p>
            </label>
          </div>
          <label>
            Request Status:
            <p>{request.status}</p>
          </label>
        </div>
      )}
      {selectedForm === "form2" && (
        <div className="reviewForm">
          <h3>Merchant Information</h3>
          <label>
            Business Name:
            <p>{merchant.Merchant_Trade_Name}</p>
          </label>
          <label>
            Merchant ID:
            <p>{request.MerchantID}</p>
          </label>
          <label>
            Registration Number:
            <p>{merchant.RC_Number}</p>
            <label>
              Business Type:
              <p>{merchant.Business_type}</p>
            </label>
          </label>
          <h3>Location Details</h3>
          <div className="order">
            <label>
              Business Location:
              <p>{merchant.Business_location}</p>
            </label>
            <label>
              State:
              <p>{merchant.state}</p>
            </label>
          </div>
          <div className="order">
            <label>
              Number of Branches:
              <p>{merchant.No_of_branches}</p>
            </label>
            <label>
              Opening Hours:
              <p>{merchant.opening_hours}</p>
            </label>
          </div>
          {show && (
            <div className="inputDiv formbut">
              <button onClick={handleApprove}>Aprrove</button>
              <button onClick={handleDenied}>Decline</button>
            </div>
          )}
          {show2 && (
            <div className="modal formbut">
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  left: 0,
                  width: "70%",
                  height: "50%",
                  gap: "2%",
                  padding: "2%",
                  justifyContent: "center",
                  display: "grid",
                  justifyItems: "center",
                  color: "black",
                }}
              >
                <PosRequest requestId={requestId} closeForm={closeForm} />
              </div>
            </div>
          )}
        </div>
      )}
      {selectedForm === "form3" && (
      <div className="reviewForm">
      <label>
        Additional Notes:
        <p>{request.Notes}</p>
      </label>{" "}
      <label>
        Account Officer:
        <p>{request.officer_name}</p>
      </label>
      </div>
      )}
    </div>
  );
};
export default ViewARequest;

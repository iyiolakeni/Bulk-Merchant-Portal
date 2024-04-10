import {useEffect, useState, useContext} from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const ViewARequest =({requestId}) =>{
    const [request, setRequest] = useState(null);
    const [merchant, setMerchant] = useState(null);
    const {user} = useContext(UserContext);
    const [show, setShow] = useState(false);
    
    //This function fetches the request details from the server and sets them in state.
    useEffect(() => {
        const fetchRequest = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/forms/${requestId}`);
            const response2 = await axios.get(`http://localhost:5000/merchant/${response.data.MerchantID}`)
            console.log(response.data);
            setRequest(response.data);
            console.log(response2.data);
            setMerchant(response2.data);
            console.log(user.jobPosition);
            if (user.jobPosition === "Business Developer"){
              if (response.data.status === 'pending')
                setShow(true);
            } 
          } catch (error) {
            console.error('Failed to fetch request:', error);
          }
        };
    
        fetchRequest();
      }, [requestId]);
    
      if (!request) return <p>Loading...</p>;

      // this function is to upon approve button for business developer update Form Status;
      const handleApprove = async() =>{
        if (user.jobPosition === 'Business Developer'){
          try{
              const response = await axios.put(`http://localhost:5000/forms/${requestId}`, {status: 'approved'});
              console.log(response.data);
          }catch(error){
              console.error('Failed to update request:', error);
          }
        }
      }

      const handleDenied = async() =>{
        if (user.jobPosition === 'Business Developer'){
          try{
              const response = await axios.put(`http://localhost:5000/forms/${requestId}`, {status: 'denied'});
              console.log(response.data);
          }catch(error){
              console.error('Failed to update request:', error);
          }
        }
      }
    return(
        <div className="review">
            <div className="reviewForm">
                <label htmlFor=""> RequestID:
                </label>
                <input value={request.RequestId} readonly class="reviewForm-output" />
                <label> Account Officer:
                </label>
                  <input value={request.officer_name} readonly class="reviewForm-output" />
                <label> Merchant ID: 
                </label>
                <input value={request.MerchantID} readonly class="reviewForm-output" />
                <label> No of POS Requested:
                </label>
                <input value={request.No_of_POS_terminal} readonly class="reviewForm-output" />
                <label> Location of Terminal
                </label>
                <input value={request.location_of_terminal} readonly class="reviewForm-output" />
                <label> Contact Persons: 
                </label>
                <input value={request.contact_person} readonly class="reviewForm-output" />
                <label> Contact Numbers: 
                </label>
                <input value={request.contact_mobile_no} readonly class="reviewForm-output" />
                <label> Request Status:
                </label>
                <input value={request.status} readonly class="reviewForm-output" />
                <label> Additional Notes:
                </label>
                <input value={request.Notes} readonly class="reviewForm-output" />
            </div>
            <div className="reviewForm">
                <label htmlFor=""> Business Name:
                </label>
                <input value={merchant.Merchant_Trade_Name} readonly class="reviewForm-output" />
                <label> Business Location:
                </label>
                <input value={merchant.Business_location} readonly class="reviewForm-output" />                  
                <label> Business Type: 
                </label>
                <input value={merchant.Business_type} readonly class="reviewForm-output" />
                <label> Number of Branches:
                </label>
                <input value={merchant.No_of_branches} readonly class="reviewForm-output" />
                <label> State:
                </label>
                <input value={merchant.state} readonly class="reviewForm-output" />
                <label> Opening Hours: 
                </label>
                <input value={merchant.opening_hours} readonly class="reviewForm-output" />
                <label> Registration Number:
                </label>
                <input value={merchant.RC_Number} readonly class="reviewForm-output" />
                {show && (
                    <div className="inputDiv formbut">
                    <button onClick={handleApprove}>Aprrove</button>
                    <button onClick={handleDenied}>Decline</button>
                    </div>
                )}
            </div>
        </div>
        )
}
export default ViewARequest;
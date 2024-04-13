import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MerchantCard = ({merchantID}) => {
    const [merchant, setMerchant] = useState(null);
    
    //This function fetches the request details from the server and sets them in state.
    useEffect(() => {
        const fetchRequest = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/merchant/${merchantID}`)
            console.log(response.data);
            setMerchant(response.data);
          } catch (error) {
            console.error('Failed to fetch request:', error);
          }
        };
    
        fetchRequest();
      }, [merchantID]);
    
      if (!merchant) return <p>Loading...</p>;
    
    return (
        <div className="review">
        <div className="reviewForm">
            <label htmlFor=""> Merchant ID:
            </label>
            <textarea value={merchant.MerchantID} readonly class="reviewForm-output" />
            <label> Merchant Name:
            </label>
              <textarea value={merchant.Merchant_Trade_Name} readonly class="reviewForm-output" />
            <label> Business Type: 
            </label>
            <textarea value={merchant.Business_type} readonly class="reviewForm-output" />
            <label> Business Location:
            </label>
            <textarea value={merchant.Business_location} readonly class="reviewForm-output" />
            <label> RC Number:
            </label>
            <textarea value={merchant.RC_Number} readonly class="reviewForm-output" />
            <label> Number of Branches: 
            </label>
            <textarea value={merchant.No_of_branches} readonly class="reviewForm-output" />
            <label> Opening Hours: 
            </label>
            <textarea value={merchant.opening_hours} readonly class="reviewForm-output" />
            <label> Website:
            </label>
            <textarea value={merchant.website} readonly class="reviewForm-output" />
            <label> Address:
            </label>
            <textarea value={merchant.Office_address} readonly class="reviewForm-output" />
        </div>
        <div className="reviewForm">
            <label htmlFor=""> LGA:
            </label>
            <textarea value={merchant.LGA} readonly class="reviewForm-output" />
            <label> State:
            </label>
            <textarea value={merchant.state} readonly class="reviewForm-output" />                  
            <label> Primary Contact Name: 
            </label>
            <textarea value={merchant.Name_of_Primary_Contact} readonly class="reviewForm-output" />
            <label> Primary Contact Phone Number:
            </label>
            <textarea value={merchant.office_No} readonly class="reviewForm-output" />
            <label> Primary Contact Email:
            </label>
            <textarea value={merchant.office_email} readonly class="reviewForm-output" />
            <label> Primary Contact Designation: 
            </label>
            <textarea value={merchant.Designation} readonly class="reviewForm-output" />
            <label> Secondary Contact Name:
            </label>
            <textarea value={merchant.Name_of_Secondary_Contact} readonly class="reviewForm-output" />
            <textarea value={merchant.Business_type} readonly class="reviewForm-output" />
            <label> Secondary Contact Phone Number:
            </label>
            <textarea value={merchant.office_No2} readonly class="reviewForm-output" />
            <label> Secondary Contact Email:
            </label>
            <textarea value={merchant.office_email2} readonly class="reviewForm-output" />
        </div>
    </div>
    );
}
export default MerchantCard;
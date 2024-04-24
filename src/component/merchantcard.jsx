import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MerchantCard = ({merchantID}) => {
    const [merchant, setMerchant] = useState(null);
    const navItems = ["Basic Information", "Contact"];

    const [selectedForm, setSelectedForm] = useState("form1");
    const handleOnClick = (formId) => {
      setSelectedForm(formId);
    };
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
        {selectedForm === "form1" && (<div className="reviewForm">
            <label htmlFor=""> Merchant ID:
            </label>
            <p >{merchant.MerchantID}</p>
            <label> Merchant Name:
            </label>
              <p >{merchant.Merchant_Trade_Name}</p>
            <label> Business Type: 
            </label>
            <p >{merchant.Business_type}</p>
            <label> Business Location:
            </label>
            <p >{merchant.Business_location}</p>
            <label> RC Number:
            </label>
            <p >{merchant.RC_Number}</p>
            <label> Number of Branches: 
            </label>
            <p >{merchant.No_of_branches}</p>
            <label> Opening Hours: 
            </label>
            <p >{merchant.opening_hours}</p>
            <label> Website:
            </label>
            <p >{merchant.website}</p>
            <label> Address:
            </label>
            <p >{merchant.Office_address}</p>
        </div>
        )}
        {selectedForm === "form2" && (
        <div className="reviewForm">
            <label htmlFor=""> LGA:
            </label>
            <p>{merchant.LGA}</p>
            <label> State:
            </label>
            <p>{merchant.state}</p>                  
            <label> Primary Contact Name: 
            </label>
            <p>{merchant.Name_of_Primary_Contact}</p>
            <label> Primary Contact Phone Number:
            </label>
            <p>{merchant.office_No}</p>
            <label> Primary Contact Email:
            </label>
            <p>{merchant.office_email}</p>
            <label> Primary Contact Designation: 
            </label>
            <p>{merchant.Designation}</p>
            <label> Secondary Contact Name:
            </label>
            <p>{merchant.Name_of_Secondary_Contact}</p>
            <label> Secondary Contact Phone Number:
            </label>
            <p>{merchant.office_No2}</p>
            <label> Secondary Contact Email:
            </label>
            <p>{merchant.office_email2}</p>
        </div>
        )}
    </div>
    );
}
export default MerchantCard;
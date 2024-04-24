import React, { useState, useRef } from "react";
import axios from "axios";

const MerchantDetails = (props) => {
  const [others, setOthers] = useState(false);
  const [message, setMessage] = useState('');
  const merchantObj = useRef();

  const handleChange = (e) => {
    if (!others && e.target.value === "Others") {
      setOthers(true);
    } else {
      setOthers(false);
    }
  };

  const handleClose = () => {
    props.closeForm();
    
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    const form = new FormData(merchantObj.current);
    const info = {};
    form.forEach((value, key) => {
      info[key] = value;
    });
    console.log("Form data", info);
    try {
      const response = await axios.post(
        "http://localhost:5000/merchant/newMerchant",
        info
      );
      // alert("Successfully submitted!");
      const merchantId = response.data.MerchantID;
      await navigator.clipboard.writeText(merchantId);
      // window.alert(`Merchant ID Created: ${merchantId}`);
      props.closeForm();
      props.setMerchantId(merchantId);
      console.log(merchantId);
    
    } catch (err) {
      console.log("An error occurred while submitting the form", err);
    }
  };

  return (
    <form ref={merchantObj} onSubmit={handleSubmitBtn} className="request">
      <h4 style={{ color: "black", marginBottom: 0 }}>Create New Merchant</h4>
      <input
        className="inputField1"
        type="text"
        name="Merchant_Trade_Name"
        placeholder="Merchant Trade Name"
      />
      <div className="inputDiv">
        <select name="Business_type" onChange={handleChange}>
          <option name="Business_type" value="">
            Business Type
          </option>
          <option name="Business_type" value="Sole Owner">
            Sole Owner
          </option>
          <option name="Business_type" value="Partnership">
            Partnership
          </option>
          <option name="Business_type" value="Limited Liabitily Company">
            Limited Liabitily Company
          </option>
          <option name="Business_type" value="Public Limited Company">
            Public Limited Company
          </option>
          <option value="Others">Others</option>
        </select>
        {others && (
          <input
            className="inputField1"
            name="Business_type"
            type="text"
            placeholder="Please specify"
          />
        )}
        <select name="Business_location" onChange={handleChange}>
          <option>Select Business Location</option>
          <option name="Business_location" value="Store Front">
            {" "}
            Store Front
          </option>
          <option name="Business_location" value="Office">
            Office
          </option>
          <option name="Business_location" value="Home">
            Home
          </option>
          <option name="Business_location" value="Others">
            Others
          </option>
        </select>
        {others && (
          <input
            className="inputField1"
            name="Business_location"
            type="text"
            placeholder="Please specify"
          />
        )}
      </div>
      <div className="inputDiv">
        <input
          className="inputField1"
          name="RC_Number"
          type="text"
          placeholder="RC Number"
        />
        <input
          className="inputField1"
          name="No_of_branches"
          type="number"
          placeholder="Number of Branches"
        />
        <input
          className="inputField1"
          name="opening_hours"
          type="text"
          placeholder="Opening Hours"
        />
      </div>
      <input
        className="inputField1"
        name="website"
        type="text"
        placeholder="Website"
      />
      <input
        className="inputField1"
        name="Office_address"
        type="text"
        placeholder="Office Address"
      />
      <input className="inputField1" name="LGA" type="text" placeholder="LGA" />
      <input
        className="inputField1"
        name="state"
        type="text"
        placeholder="State"
      />
      <div className="inputDiv">
        <input
          className="inputField1"
          name="Name_of_Primary_Contact"
          type="text"
          placeholder="Name of Primary Contact Person"
        />
        <input
          className="inputField1"
          name="Designation"
          type="text"
          placeholder="Designation of Primary Contact Person"
        />
        <input
          className="inputField1"
          name="office_No"
          type="text"
          placeholder="Phone Number of Primary Contact Person"
        />
        <input
          className="inputField1"
          name="office_email"
          type="text"
          placeholder="Email Address of Primary Contact Person"
        />
      </div>
      <div className="inputDiv">
        <input
          className="inputField1"
          name="Name_of_Secondary_Contact"
          type="text"
          placeholder="Name of Secondary Contact Person"
        />
        <input
          className="inputField1"
          name="Designation2"
          type="text"
          placeholder="Designation of Secondary Contact Person"
        />
        <input
          className="inputField1"
          name="office_No2"
          type="text"
          placeholder="Phone Number of Secondary Contact Person"
        />
        <input
          className="inputField1"
          name="office_email2"
          type="text"
          placeholder="Email Address of Secondary Contact Person"
        />
      </div>
      <div className="inputDiv">
        <button type="submit">Create Merchant</button>
        <button onClick={handleClose}>Cancel</button>
      </div>
      {message && <div>{message}</div>}
    </form>
  );
};
export default MerchantDetails;

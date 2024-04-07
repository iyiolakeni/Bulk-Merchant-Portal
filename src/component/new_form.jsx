import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import MerchantDetails from "../component/merchant_details";

const NewForm = ({user}) => {
  const [businessTradeName, setBusinessTradeName] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [merchantExists, setMerchantExists] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [certify, setCertify] = useState(false);
  const [numRows, setNumRows] = useState(0);
  const [rows, setRows] = useState([
    { location: "", contactPerson: "", mobilePhone: "" },
  ]);
  const [error, setError] = useState("");
  const formObj = useRef();
  const [typingTimeout, setTypingTimeout] = useState(0);
  const closeForm = () => {
    setOpenForm(false);
    {!openForm && merchantId &&(
      <p>{merchantId} has been created</p>
    )}
  };

  const handleTableRow = (event) =>{
    setNumRows(event.target.value);
  };
  const changeHandler = (e, index) => {
    const { name, value } = e.target;
    if (!value) {
      setError(`${name} field must be filled`); // Set the error message
      return;
    }
    const list = [...rows];
    list[index] = { ...list[index], [name]: value };
    setRows(list);
    setError(""); // Clear the error message
  };
  const handleCheckBox = (e) => {
    setCertify(e.target.checked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!certify) {
      alert("You must certify the information provided is accurate");
    }

    const lastRow = rows[rows.length - 1];
    const isAnyFieldEmpty = Object.values(lastRow).every((value) => !value);

    if (isAnyFieldEmpty) {
      setError("All fields must be filled"); // Set the error message
    } else {
      setError(""); // Clear the error message
      setRows([...rows, { location: "", contactPerson: "", mobilePhone: "" }]);
    }

    const form = new FormData(formObj.current);
    const info = {};
    form.forEach((value, key) => {
      info[key] = value;
    });

    //This adds the username of the person submitting the request form
    info.officer_name = user.firstname + ' ' + user.surname;
    console.log("Form data", info);
    try {
      await axios.post("http://localhost:5000/forms/new", info);
      alert("Successfully submitted!");
      formObj.current.reset();
      setNumRows(0);
    } catch (err) {
      alert("An error occurred while submitting the form");
    }
    //retrieve all information on forms and send it to an api
  };

  useEffect (() => {
    const checkMerchantId = async () => {
      if (merchantId){
      try{
        console.log(user);
        const response = await axios.get(`http://localhost:5000/merchant/${merchantId}`);
        setMerchantExists(response.data != null);
        if (response.data != null){
          const businessTradeName = response.data.Merchant_Trade_Name;
          setBusinessTradeName(businessTradeName);
        }
      } catch (e){
        console.error(e);
      }
    }
    else{
      setHasChecked(false);
      setMerchantExists(false);
    }
  };
  checkMerchantId();
  }, [merchantId]);

  const handleMerchantIdChange = (event) => {
    const newMerchantId = event.target.value;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      setMerchantId(newMerchantId);
      setHasChecked(true);
    }, 1000));
  };
  return (
    <div className="form">
      <h2 style={{paddingLeft: '3%'}}>POS Requisition Form</h2>
      <form ref={formObj} onSubmit={handleSubmit} className="request">
          <input className="inputField" type="text" name="MerchantID" placeholder="Search for Merchant ID" onChange={handleMerchantIdChange}/>
          {hasChecked && !merchantExists && <button onClick={(e) => {e.preventDefault();
            setOpenForm(true);}}>Create New Merchant</button>}
          {openForm && (
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }}>
    <div style={{backgroundColor: 'white', borderRadius: '8px', width: '40%', height:'50%', gap:'20%', padding: '2%', justifyContent: 'center', display: 'grid',justifyItems: 'center'}}>
      <MerchantDetails setMerchantId={setMerchantId} closeForm={closeForm}/>
    </div>
  </div>
)}

          <input className="inputField" name="No_of_POS_terminal" type="number" placeholder="Number of POS Outlets" />
          <input className="inputField" name="" type="number" placeholder="Number of Terminal Locations" onChange={handleTableRow} />
          <table>
            {/* Table Headers */}
            {numRows > 0 && (
            <thead>
              <tr>
                <th>Terminal Location</th>
                <th>Contact Person</th>
                <th>Mobile Phone</th>
              </tr>
            </thead>
  )}
  {/* Table Body */}
            <tbody>
              {Array.from({length: numRows},(_, index) => (
                <tr key={index}>
                  <td>
                    <input className="inputField"
                      name="location_of_terminal"
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                  <td>
                    <input className="inputField"
                      name="contact_person"
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                  <td>
                    <input className="inputField"
                      name="contact_mobile_no"
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            {error && <p>{error}</p>}
          <select>
            <option name="Business_Category" value="">Select Category of Merchant's Business</option>
            <option name="Business_Category" value="Store/Supermarket">Store/Supermarket</option>
            <option name="Business_Category" value="Restaurants">Restaurants</option>
            <option name="Business_Category" value="Wholesale/Distributor">Wholesale/Distributor</option>
            <option name="Business_Category" value="Telecoms">Telecoms</option>
            <option name="Business_Category" value="Fuel Station">Fuel Station</option>
            <option name="Business_Category" value="Hotel/Guest House">Hotel/Guest House</option>
            <option name="Business_Category" value="Logistics(Courier)">Logistics(Courier)</option>
            <option name="Business_Category" value="Church/NGO">Church/NGO</option>
            <option name="Business_Category" value="Hospital">Hospital</option>
            <option name="Business_Category" value="Airlines">Airlines</option>
            <option name="Business_Category" value="Fast Food">Fast Food</option>
            <option name="Business_Category" value="Travel Agencies">Travel Agencies</option>
            <option name="Business_Category" value="Embassy">Embassy</option>
            <option name="Business_Category" value="Education/School">Education/School</option>
            <option name="Business_Category" value="Others">Others</option>
          </select>
          <input name="bank" className="inputField" type="text" placeholder="Bank Name" />
          <input name="Account_No" className="inputField" type="text" placeholder="Account Number" />
          <input className="inputField" type="text" placeholder="Additional information" />
          <select>
            <option value="">Select Card Type</option>
            <option name="CardType" value="Local Card">Local Card</option>
            <option name="CardType" value="International Mastercard">
              International Mastercard
            </option>
            <option name="CardType" value="International Visa">International Visa</option>
            <option name="CardType" value="None">None</option>
          </select>
      <label>
        <input type="checkbox" checked={certify} onChange={handleCheckBox} />
        I {user.firstname} {user.surname}, on behalf of {businessTradeName}, hereby certify that the information
        provided in this form is true and accurate. I agree that I reserve the
        right to take appropriate measures including legal actions if the
        information here is discovered to be false.
      </label>
      <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default NewForm;

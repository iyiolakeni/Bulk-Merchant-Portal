import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const NewForm = () => {
  const {user} = useContext(UserContext);
  const [merchantId, setMerchantId] = useState('');
  const [merchantExists, setMerchantExists] = useState(false);
  const [certify, setCertify] = useState(false);
  const [numRows, setNumRows] = useState(0);
  const [rows, setRows] = useState([
    { location: "", contactPerson: "", mobilePhone: "" },
  ]);
  const [error, setError] = useState("");
  const formObj = useRef();


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
    console.log("Form data", info);
    try {
      await axios.post("http://localhost:5000/forms/new", info);
      alert("Successfully submitted!");
    } catch (err) {
      alert("An error occurred while submitting the form");
    }
    //retrieve all information on forms and send it to an api
  };

  useEffect (() => {
    const checkMerchantId = async () => {
      try{
        const response = await axios.get(`http://localhost:5000/merchant/${merchantId}`);
        setMerchantExists(response.data != null);
      } catch (e){
        console.error(e);
      }
    };

    if (merchantId){
      checkMerchantId();
    }
  }, [merchantId]);

  const handleMerchantIdChange = (event) => {
    setMerchantId(event.target.value);
  };
  return (
    <div className="form">
      <form ref={formObj} onSubmit={handleSubmit} className="request">
          <input type="text" name="MerchantID" placeholder="Search for Merchant ID" onChange={handleMerchantIdChange}/>
          {!merchantExists && <p>Merchant ID does not exist</p>}
          <h2>Transaction Details</h2>
          <input name="" type="number" placeholder="Number of POS Outlets" />
          <input name="" type="number" placeholder="Number of Terminal Locations" onChange={handleTableRow} />
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
                    <input
                      name="location"
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      name="contactPerson"
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      name="mobilePhone"
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            {error && <p>{error}</p>}
          <select>
            <option value="">Select Category of Merchant's Business</option>
            <option value="Store/Supermarket">Store/Supermarket</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Wholesale/Distributor">Wholesale/Distributor</option>
            <option value="Telecoms">Telecoms</option>
            <option value="Fuel Station">Fuel Station</option>
            <option value="Hotel/Guest House">Hotel/Guest House</option>
            <option value="Logistics(Courier)">Logistics(Courier)</option>
            <option value="Church/NGO">Church/NGO</option>
            <option value="Hospital">Hospital</option>
            <option value="Airlines">Airlines</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Travel Agencies">Travel Agencies</option>
            <option value="Embassy">Embassy</option>
            <option value="Education/School">Education/School</option>
            <option value="others">others</option>
          </select>
          <input type="text" placeholder="Bank Name" />
          <input type="text" placeholder="Account Number" />
          <input type="text" placeholder="Additional information" />
          <select>
            <option value="">Select Card Type</option>
            <option value="Local Card">Local Card</option>
            <option value="International Mastercard">
              International Mastercard
            </option>
            <option value="International Visa">International Visa</option>
            <option value="None">None</option>
          </select>
      <label>
        <input type="checkbox" checked={certify} onChange={handleCheckBox} />
        I, on behalf of {user.name}, hereby certify that the information
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

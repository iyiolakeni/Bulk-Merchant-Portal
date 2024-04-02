import React, { useState, useRef } from "react";
import axios from "axios";
// import { UserContext } from "../UserContext";

const NewForm = () => {
  const user = { name: "John Doe", email: "johndoe@email.com" };
  const [others, setOthers] = useState(false);
  const [certify, setCertify] = useState(false);
  const [rows, setRows] = useState([
    { location: "", contactPerson: "", mobilePhone: "" },
  ]);
  const [error, setError] = useState("");
  const formObj = useRef();
  const handleChange = (e) => {
    if (!others && e.target.value === "others") {
      setOthers(true);
    } else {
      setOthers(false);
    }
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
  const handleAddRow = (e) => {
    e.preventDefault();
    const lastRow = rows[rows.length - 1];
    const isAnyFieldEmpty = Object.values(lastRow).every((value) => !value);

    if (isAnyFieldEmpty) {
      setError("All fields must be filled"); // Set the error message
    } else {
      setError(""); // Clear the error message
      setRows([...rows, { location: "", contactPerson: "", mobilePhone: "" }]);
    }
  };
  const handleCheckBox = (e) => {
    setCertify(e.target.checked);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!certify) {
      alert("You must certify the information provided is accurate");
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
  return (
    <div className="form">
      <form ref={formObj} onSubmit={handleSubmit} className="request">
        <div className="requestForm">
          <h2>Merchant Information</h2>

          <input type="text" name="MerchantID" placeholder="Search for Merchant ID" />
          <input type="date" />
          <select name="Business_type" onChange={handleChange}>
            <option name="Business_type" value="">Business Type</option>
            <option name="Business_type" value="Sole Owner">Sole Owner</option>
            <option name="Business_type" value="Partnership">Partnership</option>
            <option name="Business_type" value="Limited Liabitily Company">
              Limited Liabitily Company
            </option>
            <option value="Public Limited Company">
              Public Limited Company
            </option>
            <option value="others">others</option>
          </select>
          {others && <input name="Business_type" type="text" placeholder="Please specify" />}
          <select onChange={handleChange}>
            <option>Select Business Location</option>
            <option name="Business_location" value="Store Front"> Store Front</option>
            <option name="Business_location" value="Office">Office</option>
            <option name="Business_location" value="Home">Home</option>
            <option name="Business_location" value="Others">Others</option>
          </select>
          <input name="Rc_Number" type="number" placeholder="RC Number" />
          <input name="No_of_branches" type="text" placeholder="Number of Branches" />
          <input name="opening_hours" type="text" placeholder="Opening Hours" />
          <input name="website" type="text" placeholder="Website" />
          <input name="Office_address" type="text" placeholder="Office Address" />
          <input name="LGA" type="text" placeholder="LGA" />
          <input name="state" type="text" placeholder="State" />
          <input name="Name_of_Primary_Contact" type="text" placeholder="Name of Primary Contact Person" />
          <input name="Designation" type="text" placeholder="Designation of Contact Person" />
        </div>
        <div className="requestForm1">
          <h2>Transaction Details</h2>
          <input name="office_No" type="text" placeholder="Phone Number" />
          <input name="email" type="text" placeholder="Email Address" />
          <input name="" type="number" placeholder="Number of POS Outlets" />
          <input name="" type="number" placeholder="Number of Terminal Locations" />
          {others && <input name="" type="text" placeholder="Please specify" />}
          <table>
            {/* Table Headers */}
            <thead>
              <tr>
                <th>Terminal Location</th>
                <th>Contact Person</th>
                <th>Mobile Phone</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      name="location"
                      value={row.location}
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      name="contactPerson"
                      value={row.contactPerson}
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      name="mobilePhone"
                      value={row.mobilePhone}
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            {error && <p>{error}</p>}
          <button onClick={handleAddRow}>Add Row</button>
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
        </div>
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

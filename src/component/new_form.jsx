import React, { useState } from "react";
// import { UserContext } from "../UserContext";

const NewForm = () => {
  const user = {name: 'John Doe', email: 'johndoe@email.com'};
  const [others, setOthers] = useState(false);
  const [certify, setCertify] = useState(false);
  const [rows, setRows] = useState([{ location: '', contactPerson: '', mobilePhone: '' }]);
  const [error, setError] = useState('');
  const handleChange = (e) => {
    if (!others && e.target.value === "others") {
      setOthers(true);
    } else{
      setOthers(false);
    }
  };

  const changeHandler =(e, index)=>{
    const {name, value} = e.target;
    if (!value) {
      setError(`${name} field must be filled`); // Set the error message
      return;
    }
    const list = [...rows];
    list[index] = { ...list[index], [name]: value };
    setRows(list);
    setError(''); // Clear the error message
  };
  const handleAddRow = (e) => {
    e.preventDefault();
    const lastRow = rows[rows.length - 1];
    const isAnyFieldEmpty = Object.values(lastRow).every(value => !value);
  
    if (isAnyFieldEmpty) {
      setError('All fields must be filled'); // Set the error message
    } else {
      setError(''); // Clear the error message
      setRows([...rows,{location: '', contactPerson: '', mobilePhone: ''}]);
    }
};
const handleCheckBox = (e) => {
  setCertify(e.target.checked);
}
const handleSubmit = (e) => {
  e.preventDefault();
  if (!certify) {
    alert('You must certify the information provided is accurate');
    return;
  }
}
  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="request">
        <div className="requestForm">
          <h2>Merchant Information</h2>

        <input type="search" placeholder="Search for Merchant ID"/>
        <input type="date" />
        <select onChange={handleChange}>
          <option value="">Business Type</option>
          <option value="Sole Owner">Sole Owner</option>
          <option value="Partnership">Partnership</option>
          <option value="Limited Liabitily Company">
            Limited Liabitily Company
          </option>
          <option value="Public Limited Company">Public Limited Company</option>
          <option value="others">others</option>
        </select>
        {others && <input type="text" placeholder="Please specify" />}
        <select onChange={handleChange}>
          <option>Select Business Location</option>
          <option value="Store Front"> Store Front</option>
          <option value="Office">Office</option>
          <option value="Home">Home</option>
          <option value="Others">Others</option>
        </select>
        <input type="text" placeholder="RC Number" />
        <input type="text" placeholder="Number of Branches"/>
        <input type="text" placeholder="Opening Hours"/>
        <input type="text" placeholder="Website"/>
        <input type="text" placeholder="Office Address"/>
        <input type="text" placeholder="LGA"/>
        <input type="text" placeholder="State" />
        <input type="text" placeholder="Name of Primary Contact Person"/>
        <input type="text" placeholder="Designation of Contact Person"/>
        </div>
<div className="requestForm1">
  <h2>Transaction Details</h2>
        <input type="text" placeholder="Phone Number"/>
        <input type="text" placeholder="Email Address"/>
        <input type="number" placeholder="Number of POS Outlets"/>
        <input type="number" placeholder="Number of Terminal Locations"/>
        {others && <input type="text" placeholder="Please specify" />}
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
            {rows.map((rows, index)=>(
              <tr key={index}>
                <td>
                  <input type="text" name="terminalLocation" value={rows.terminalLocation} onChange={(e)=>changeHandler(e, index)}/>
                </td>
                <td>
                  <input type="text" name="contactPerson" value={rows.contactPerson} onChange={(e)=>changeHandler(e, index)}/>
                </td>
                <td>
                  <input type="text" name="mobilePhone" value={rows.mobilePhone} onChange={(e)=>changeHandler(e, index)}/>
                </td>
              </tr>
            ))}
          </tbody>
          {error && <p>{error}</p>}
        </table>
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
        <input type="text" placeholder="Bank Name"/>
        <input type="text" placeholder="Account Number"/>
        <input type="text" placeholder="Additional information"/>
        <select>
          <option value="">Select Card Type</option>
          <option value="Local Card">Local Card</option>
          <option value="International Mastercard">International Mastercard</option>
          <option value="International Visa">International Visa</option>
          <option value="None">None</option>
        </select>
        </div>
      </form>
        <label>
        <input type="checkbox" checked={certify} onChange={handleCheckBox} />
        I, on behalf of {user.name}, hereby certify that the information provided in this form is true and accurate.
        I agree that I reserve the right to take appropriate measures including legal actions if the information here is discovered to be false.
        </label>
      <button type="submit">Submit</button>
    </div>
  );
};
export default NewForm;

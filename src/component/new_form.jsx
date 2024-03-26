import React, { useState } from "react";

const New_Form = () => {
  const [others, setOthers] = useState(false);
  // const [value, setValue] = useState('');
  const handleChange = (e) => {
    if (!others && e.target.value === "others") {
      setOthers(true);
    } else{
      setOthers(false);
    }
  };
  return (
    <div className="form">
      <form className="requestForm">
        <input type="date" />
        <input type="search" />
        Merchant ID
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
      </form>
    </div>
  );
};
export default New_Form;

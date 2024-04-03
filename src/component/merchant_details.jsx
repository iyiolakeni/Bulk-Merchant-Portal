const MerchantDetails = () =>{
  const [others, setOthers] = useState(false);
    const formObj = useRef();
    const handleChange = (e) => {
        if (!others && e.target.value === "others") {
          setOthers(true);
        } else {
          setOthers(false);
        }
      };
    return (
        <div>
            <h1>Merchant Details</h1>
      <form ref={formObj} onSubmit={handleSubmit} className="request">
      <input type="date" />
      <input type="text" name="" placeholder="Merchant Trade Name"/>
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
          <input name="Designation" type="text" placeholder="Designation of Primary Contact Person" />
          <input name="office_No" type="text" placeholder="Phone Number of Primary Contact Person" />
          <input name="email" type="text" placeholder="Email Address of Primary Contact Person" />
          <input name="Name_of_Secondary_Contact" type="text" placeholder="Name of Secondary Contact Person" />
          <input name="Designation" type="text" placeholder="Designation of Secondary Contact Person" />
          <input name="office_No" type="text" placeholder="Phone Number of Secondary Contact Person" />
          <input name="email" type="text" placeholder="Email Address of Secondary Contact Person" />  
      </form>
        </div>
    )
}
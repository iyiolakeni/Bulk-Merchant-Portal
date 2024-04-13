import SideBar from "../component/sidebar";
import Navbar from '../component/navbar'
import MerchantCard from "../component/merchantcard";
import { useEffect, useState } from "react";
import axios from "axios";

const Merchants = ({form}) => {
    const [request, setRequest] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedID, setSelectedID] = useState(null)
    
    // Get a specific request by ID when the handleonclick functino is clalled

    const handleonClick = (merchantID) =>{
        setSelectedID(merchantID);
        setOpenForm(true);
    }

    const closeForm = () =>{
        setOpenForm(false);
        setSelectedID(null);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get('http://localhost:5000/merchant/allMerchants'); 

                let forms = response1.data;
                setRequest(forms);//Save the merged Data in the state
                
            } catch (error) {
                console.error(error);                
            }
        };
        fetchData(); // Call once on component mount
        const intervalID = setInterval(fetchData, 3000);

        //clear the interval when components unmounts
        return() => clearInterval(intervalID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []); // Only run on component mount and never again
    

    return (
    <div className="dashboard">
      <SideBar />
      <div className="content">
      <Navbar/>
      <h2 style={{margin: "10px", color:"black"}}>Request Overview</h2>
                <table className="form-table">
                    <thead className="form-header">
                        <tr>
                            <th>Merchant Name</th>
                            <th>Merchant ID</th>
                            <th>RC Number</th>
                            <th>Merchant Business Type</th>
                            <th>Number of Branches</th>
                            <th>Business Location</th>
                            <th>Address</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody className="form-body">
                        {request.map((form, index) => (
                            <tr key={form._id}>
                                {/* <td>{index + 1}</td> */}
                                <td>{form.Merchant_Trade_Name}</td>
                                <td>{form.MerchantID}</td>
                                <td>{form.RC_Number}</td>
                                <td>{form.Business_type}</td>
                                <td>{form.No_of_branches}</td>
                                <td>{form.Business_location}</td>
                                <td>{form.office_address}</td>
                                <td>{form.state}</td>
                                {/* <td>
                                    <span className="view_more"></span>
                                </td> */}
                                <td onClick={() => handleonClick(form.MerchantID)}>
                                    <span className="view_more"></span>
                                </td>
                            </tr>
                        ))}
                        {openForm &&(
                            <div className="modal formbut">
                                <div
                                 style={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    width: "60%",
                                    height: "90%",
                                    padding: "1%",
                                    justifyContent: "center",
                                    display: "grid",
                                    placeItems: "center",
                                color: "black"}}
                                    >
                                    <MerchantCard merchantID={selectedID}/>
                                    <button onClick={closeForm}>Close</button>
                                </div>
                            </div>
                        )}
                    </tbody>
                </table>
      </div>
    </div>
  );
}
export default Merchants;
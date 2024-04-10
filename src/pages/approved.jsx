import { useContext, useEffect, useState } from "react";
import SideBar from "../component/sidebar";
import { UserContext } from "../UserContext";
import axios from "axios";
import Navbar from "../component/navbar";
import ViewARequest from "../component/viewonerequest";


const Approved_Request =() => {
    const {user} = useContext(UserContext);
    const [request, setRequest] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedID, setSelectedID] = useState(null)
    
    // Get a specific request by ID when the handleonclick functino is clalled

    const handleonClick = (requestId) =>{
        setSelectedID(requestId);
        setOpenForm(true);
    }

    const closeForm = () =>{
        setOpenForm(false);
        setSelectedID(null);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get('http://localhost:5000/forms');
                const response2 = await axios.get('http://localhost:5000/merchant/allMerchants'); 

                let forms = response1.data;
                const merchants = response2.data;
                const username = user.firstname + ' ' + user.surname;

                if (user.jobPosition === 'Account Officer') {
                    forms = response1.data.filter(request => request.officer_name === username);
                    setRequest(response1.data);
                } 
                
                const mergedData = forms.map(form => ({
                    ...form,
                    merchant: merchants.find(merchant => merchant.MerchantID === form.MerchantID)
                }));
                setRequest(mergedData);//Save the merged Data in the state
                
            } catch (error) {
                console.error(error);                
            }
        };
        fetchData(); // Call once on component mount
        const intervalID = setInterval(fetchData, 3000);

        //clear the interval when components unmounts
        return() => clearInterval(intervalID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []); // Keep the dependency array empty
    

    return (
        <div className="dashboard">
            <SideBar/>
            <div className="content">
                <Navbar/>
                <h2 style={{margin: "10px", color:"black"}}>Request Overview</h2>
                <table className="form-table">
                    <thead className="form-header">
                        <tr>
                            <th>S/N</th>
                            <th>Merchant ID</th>
                            <th>Business Name</th>
                            <th>Business Location</th>
                            <th>Number of Branches</th>
                            <th>Merchant Business Type</th>
                            <th>No of POS Terminal</th>
                            <th>Location of Terminal</th>
                            <th>Pos Use</th>
                            <th>Officer Name</th>
                            <th>Form Status</th>
                        </tr>
                    </thead>
                    <tbody className="form-body">
                    {request.filter(form => form.status === 'approved').map((form, index) => (
                            <tr key={form._id}>
                                <td>{index + 1}</td>
                                <td>{form.MerchantID}</td>
                                <td>{form.merchant?.Merchant_Trade_Name}</td>
                                <td>{form.merchant?.Business_location}</td>
                                <td>{form.merchant?.No_of_branches}</td>
                                <td>{form.merchant?.Business_type}</td>
                                <td>{form.No_of_POS_terminal}</td>
                                <td>{form.location_of_terminal.join(' , ')}</td>
                                <td>{form.POS_Use}</td>
                                <td>{form.officer_name}</td>
                                <td>{form.status}</td>
                                <td onClick={() => handleonClick(form.RequestId)}>
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
                                    left: 0,
                                    width: "70%",
                                    height: "50%",
                                    gap: "2%",
                                    padding: "2%",
                                    justifyContent: "center",
                                    display: "grid",
                                    justifyItems: "center",
                                color: "black"}}
                                    >
                                    <ViewARequest requestId={selectedID}/>
                                    <button onClick={closeForm}>Close</button>
                                </div>
                            </div>
                        )}
                    </tbody>
                </table>                
            </div>
        </div>

    )
}
export default Approved_Request;
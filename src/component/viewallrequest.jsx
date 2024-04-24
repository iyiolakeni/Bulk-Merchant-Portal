import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import ViewARequest from "../component/viewonerequest";

const ViewallRequest =({num}) => {
    const {user} = useContext(UserContext);
    const [request, setRequest] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [selectedID, setSelectedID] = useState(null)
    
    const[currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = num;
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
    } , []); // Only run on component mount and never again
    

    return (
        <div className="tableRequest">
            <h2 style={{margin: "10px", color:"black"}}>Request Overview</h2>
            <table className="form-table">
                <thead className="form-header">
                    <tr>
                        <th>Request ID</th>
                        <th>Registration Date</th>
                        <th>Business Type</th>
                        <th>Business Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="form-body">
                    {request.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((form, index) => (
                        <tr key={form._id}>
                            <td>{form.RequestId}</td>
                            <td>{new Date(form.createdAt).toLocaleDateString()}</td>
                            <td>{form.merchant?.Business_type}</td>
                            <td>{form.merchant?.Merchant_Trade_Name}</td>
                            <td style={{textTransform: "uppercase"}}>{form.status}</td>
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
                                    height: "100%",
                                    justifyContent: "center",
                                    display: "grid",
                                    justifyItems: "center",
                                    color: "black"
                                }}
                            >
                                <ViewARequest requestId={selectedID}/>
                                <button onClick={closeForm}>Close</button>
                            </div>
                        </div>
                    )}
                </tbody>
            </table>
            if (num 5) {
                    <div className="nextPage">
                        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(request.length / itemsPerPage)}>Next</button>
                    </div>
            }
            </div>
    );
}
export default ViewallRequest;
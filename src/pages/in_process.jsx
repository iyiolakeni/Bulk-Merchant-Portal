import { useContext, useEffect, useState } from "react";
import SideBar from "../component/sidebar";
// import { UserContext } from "../UserContext";
import axios from "axios";
import Navbar from "../component/navbar";

const In_Process =() => {
    // const {user} = useContext(UserContext);
    const [request, setRequest] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get('http://localhost:5000/forms');
                const response2 = await axios.get('http://localhost:5000/merchant/allMerchants'); 

                const forms = response1.data;
                const merchants = response2.data;

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
    } , []); // Only run on component mount and never again
    

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
                    {request.filter(form => form.status === 'in-process').map((form, index) => (
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
                                <td>
                                    <span className="view_more"></span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
            </div>
        </div>

    )
}
export default In_Process;
import {useEffect} from "react";
const ViewARequest =(requestId) =>{
    useEffect(async ()=> {
       const response = await axios.get(`http://localhost:5000/forms/${requestId}`)
    })
    return(
        <div>
            <output>{requestId.requestId}</output>
            <output>{requestId.officer_name}</output>
            <output>{requestId.MerchantID}</output>
            <output>{requestId.No_of_POS_terminal}</output>
            <output>{requestId.location_of_terminal}</output>
            <output>{requestId.contact_person}</output>
            <output>{requestId.contact_mobile_no}</output>
            <output>{requestId.form}</output>
            <output>{requestId.form}</output>
        </div>
    )
}
export default ViewARequest;
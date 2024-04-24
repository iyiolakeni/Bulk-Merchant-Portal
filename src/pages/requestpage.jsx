import { useParams } from "react-router-dom";
import Navbar from "../component/navbar";
import SideBar from "../component/sidebar";
import ViewARequest from "../component/viewonerequest";

const RequestPage = () => {
    const {requestId} = useParams();
    return (
        <div className="dashboard">
            <SideBar/>
            <div className="content">
                <Navbar/>
                <ViewARequest requestId={requestId}/>
            </div>
        </div>
    );
}
export default RequestPage;
import SideBar from "../component/sidebar";
import RequestCards from "../component/requestcards";
import Navbar from "../component/navbar";
import ViewARequest from "../component/viewonerequest";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SideBar />
      <div className="content">
        <Navbar/>
        <RequestCards/>
        <ViewARequest status={"pending"}/>
      </div>
    </div>
  );
};
export default Dashboard;

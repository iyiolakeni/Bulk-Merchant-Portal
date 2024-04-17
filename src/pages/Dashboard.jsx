import SideBar from "../component/sidebar";
import RequestCards from "../component/requestcards";
import Navbar from "../component/navbar";
import ViewallRequest from "../component/viewallrequest";

const Dashboard = () => {
  const num = 5;
  return (
    <div className="dashboard">
      <SideBar />
      <div className="content">
        <Navbar/>
        <RequestCards/>
        <ViewallRequest num={num}/>
      </div>
    </div>
  );
};
export default Dashboard;

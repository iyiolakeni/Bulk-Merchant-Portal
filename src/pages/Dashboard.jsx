import SideBar from "../component/sidebar";
import RequestCards from "../component/requestcards";
import Navbar from "../component/navbar";

const Dashboard = () => {

  return (
    <div className="dashboard">
      <SideBar />
      <div className="content">
      <Navbar/>
          <RequestCards/>
      </div>
    </div>
  );
};
export default Dashboard;

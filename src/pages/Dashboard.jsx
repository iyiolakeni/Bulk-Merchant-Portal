import SideBar from "../component/sidebar";
import RequestCards from "../component/requestcards";
import Navbar from "../component/navbar";

const Dashboard = () => {

  const requests = [{ amount: "1000", status: "Approved" }];
  return (
    <div className="dashboard">
      <SideBar />
      <div className="content">
      <Navbar/>
          <RequestCards requests={requests}/>
      </div>
    </div>
  );
};
export default Dashboard;

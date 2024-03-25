import SideBar from "../component/sidebar";
import RequestCards from "../component/requestcards";

const Dashboard = () => {

  const requests = [{ amount: "1000", status: "Approved" }];
  return (
    <div className="dashboard">
      <SideBar />
          <RequestCards requests={requests}/>
    </div>
  );
};
export default Dashboard;

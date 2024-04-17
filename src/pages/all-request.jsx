import SideBar from "../component/sidebar";
import Navbar from "../component/navbar";
import ViewallRequest from "../component/viewallrequest";

const Allrequests = ({ form }) => {
const num = 15;
    return (
    <div className="dashboard">
      <SideBar />
      <div className="content">
        <Navbar />
        <div className="newoverview">
            <p
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                color: "#0D163A",
                marginBottom: "0px",
              }}
            >
              Request Details
            </p>
            <p>Manage your POS Request with ease</p>
          </div>
        <ViewallRequest num={num} />
      </div>
    </div>
  );
};
export default Allrequests;

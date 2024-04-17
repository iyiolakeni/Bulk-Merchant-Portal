import SideBar from "../component/sidebar";
import Navbar from "../component/navbar";
import ViewRequest from "../component/viewrequest";
const Pending_requests =() => {
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
              Pending Request
            </p>
            <p>Manage your POS Request with ease</p>
          </div>
        <ViewRequest num={num} status={'pending'}/>
      </div>
    </div>
  );
}
export default Pending_requests;
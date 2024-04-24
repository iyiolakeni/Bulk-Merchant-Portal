import SideBar from "../component/sidebar";
import Navbar from "../component/navbar";
import ViewRequest from "../component/viewrequest";
const Denied_Request =() => {
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
              Denied Request
            </p>
            <p>Manage your POS Request with ease</p>
          </div>
        <ViewRequest num={num} status={'denied'}/>
      </div>
    </div>
  );
}
export default Denied_Request;
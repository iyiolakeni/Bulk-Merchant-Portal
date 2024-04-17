import SideBar from "../component/sidebar";
import Navbar from "../component/navbar";
import ViewRequest from "../component/viewrequest";
const In_Process =() => {
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
              In Process Request
            </p>
            <p>Manage your POS Request with ease</p>
          </div>
        <ViewRequest num={num} status={'in_process'}/>
      </div>
    </div>
  );
}
export default In_Process;
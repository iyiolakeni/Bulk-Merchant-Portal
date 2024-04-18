import Navbar from "../component/navbar"
import SideBar from "../component/sidebar"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PosRequest = () => {
  const [data, setData] = useState([]);
//   const [posRequestIds, setPosRequestIds] = useState([]);
//   const [selectedID, setSelectedID] = useState(null);

const handleOnClick = async (requestId) => {
    axios({
      url: `http://localhost:5000/POS/request/excel/${requestId}`,
      method: 'GET',
      responseType: 'blob', // Important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${requestId}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/POS/allrequest');
      setData(result.data);

    //   setPosRequestIds(ids);
    //   console.log(ids);
    };

    fetchData();
  }, []);


return (
    <div className="dashboard">
            <SideBar/>
            <div className="content">
                    <Navbar/>
                    <div className="tableRequest">
        <h1 style={{margin: "10px", color:"black"}}>POS Request</h1>
        <table className="form-table">
            <thead className="form-header">
                <tr>
                    <th>NumberOfPos</th>
                    <th>Pos_RequestId</th>
                    {/* <th>Pos_SerialNumber</th> */}
                    <th>Pos_Accounts</th>
                    <th>PTSP</th>
                    <th>Pos_Model</th>
                    <th>Pos_Processor</th>
                    <th>Status</th>
                    <th>Download</th>
                </tr>
            </thead>
            <tbody className="form-body">
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.NumberOfPos}</td>
                        <td>{item.Pos_RequestId}</td>
                        {/* <td>{item.Pos_SerialNumber}</td> */}
                        <td>{item.Pos_Accounts}</td>
                        <td>{item.PTSP}</td>
                        <td>{item.Pos_Model}</td>
                        <td>{item.Pos_Processor}</td>
                        <td>{item.status}</td>
                        <td onClick={() => handleOnClick(item.Pos_RequestId)}>
                            <span className="view_more">
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
                    </div>
            </div>
    </div>
);
};

export default PosRequest;
import axios from "axios";
import { useRef } from "react";

const PosRequest = (props) => {
  const posObj = useRef();
  const handleClose = () => {
    props.closeForm();
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();
    const form = new FormData(posObj.current);
    const info = {};
    form.forEach((value, key) => {
      info[key] = value;
    });
    console.log(info);
    try {
      const response = await axios.post(
        "http://localhost:5000/POS/newposrequest",
        info
      );
      // alert("Successfully submitted!");
      console.log(props.requestId);
      props.closeForm();
      console.log("This is the form submitted", response.data);
      await axios.put(`http://localhost:5000/forms/${props.requestId}`, {status: 'in_process'})
    } catch (err) {
      console.log("An error occurred while submitting the form", err);
    }
  };
  return (
    <div>
      <h1>Generate Serial Number</h1>
      <form className="formNew" ref={posObj} onSubmit={handleSubmitBtn}>
        <input name="Pos_RequestId" readOnly value={props.requestId} />
        <select name="Pos_Accounts">
          <option name="Pos_Accounts" value="">
            Select POS Accounts
          </option>
          <option name="Pos_Accounts" value="Polaris Corporate">
            Polaris Corporate
          </option>
          <option name="Pos_Accounts" value="Polaris Wise Account">
            Polaris Wise Account
          </option>
        </select>
        <select name="PTSP">
          <option name="PTSP" value="">
            Select PTSP
          </option>
          <option name="PTSP" value="Acquiring Banks">
            Acquiring Banks
          </option>
          <option name="PTSP" value="Payment Gateway Providers">
            Payment Gateway Providers
          </option>
          <option name="PTSP" value="Fintechs">
            Fintechs
          </option>
        </select>
        <select name="Pos_Model">
          <option name="Pos_Model" value="">
            Select POS Model
          </option>
          <option name="Pos_Model" value="Verifone VX 520">
            Verifone VX 520
          </option>
          <option name="Pos_Model" value="Ingenico ICT250">
            Ingenico ICT250
          </option>
          <option name="Pos_Model" value="Pax S80">
            Pax S80
          </option>
          <option name="Pos_Model" value="Castles Technology VEGA3000">
            Castles Technology VEGA3000
          </option>
          <option name="Pos_Model" value="First Data FD130">
            First Data FD130
          </option>
          <option name="Pos_Model" value="Spectra T1000">
            Spectra T1000
          </option>
          <option name="Pos_Model" value="Hypercom T4220">
            Hypercom T4220
          </option>
          <option name="Pos_Model" value="Spire SPg7">
            Spire SPg7
          </option>
          <option name="Pos_Model" value="Sunmi V2">
            Sunmi V2
          </option>
          <option name="Pos_Model" value="Yoco">
            Yoco
          </option>
          <option name="Pos_Model" value="Safaricom Lipa Na M-Pesa (LNM)">
            Safaricom Lipa Na M-Pesa (LNM)
          </option>
          <option name="Pos_Model" value="Etranzact POS">
            Etranzact POS
          </option>
          <option name="Pos_Model" value="Paga Agent POS">
            Paga Agent POS
          </option>
          <option name="Pos_Model" value="Flutterwave POS">
            Flutterwave POS
          </option>
          <option name="Pos_Model" value="OPay POS">
            OPay POS
          </option>
        </select>
        <select name="Pos_Processor">
          <option name="Pos_Processor" value="">
            Select POS Processor
          </option>
          <option name="Pos_Processor" value="Central Processing Unit (CPU)">
            Central Processing Unit (CPU)
          </option>
          <option name="Pos_Processor" value="Integrated Processor">
            Integrated Processor
          </option>
          <option name="Pos_Processor" value="Mobile Processor">
            Mobile Processor
          </option>
          <option name="Pos_Processor" value="Cloud-Based Processor">
            Cloud-Based Processor
          </option>
          <option name="Pos_Processor" value="Payment Processor">
            Payment Processor
          </option>
          <option name="Pos_Processor" value="Embedded Processor">
            Embedded Processor
          </option>
          <option name="Pos_Processor" value="Network Processor">
            Network Processor
          </option>
        </select>
        <div className="butClass">
          <button>Generate Serial Number</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};
export default PosRequest;

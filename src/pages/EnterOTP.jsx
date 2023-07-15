import React,{useEffect, useState} from 'react';
import {Link,useNavigate} from "react-router-dom";

function EnterOTP() {
    const [otp, setOtp] = useState({otp:""});
    const [msg, setMsg] = useState("");
    let [timer, setTimer] = useState(5);

    let navigate=useNavigate();

    const handelOTp=()=>{
        let otpStored=localStorage.getItem("otp");
        console.log(otpStored,otp.otp);
        if(otpStored===otp.otp){
            localStorage.clear();
            setMsg("OTP matched");
            navigate("/newpassword");
        }
        setMsg("OTP Mismatched");
    }

  return (
    <div>
      <div className='container-fluid '>
        <div className="input-box">
            <label htmlFor=""> Enter OTP</label>
            <input type="password"  value={otp.otp} onChange={(e)=> setOtp({...otp,otp:e.target.value})} required />
            <input type="button" value="Submit" onClick={handelOTp} />
            <Link className='forgetpass' to={"/"}>Sign in</Link>
            <p style={{color:"red"}}>{msg}</p>
            <p style={{color:"black"}}>OTP valid for only: <b>{timer}</b> Min</p>

        </div>
    </div>
    </div>
  )
}

export default EnterOTP
import React,{useState} from 'react';
import {Link,useNavigate} from "react-router-dom";

function ForgetPassword() {
const [email, setEmail] = useState({email:""});
const [msg, setMsg] = useState("");

const navigat=useNavigate();

const handelForgotPass=()=>{
  if(email.email===""){
    setMsg("Please enter a valid Email");
    return;
  }
  let random_otp=Math.floor(Math.random()*10000);
  let forgotOtpUrl="http://localhost:8080/epmloyee/forgetpass/sendopt/"+email.email+"/"+random_otp;
  localStorage.setItem("otp",random_otp);
  fetch(forgotOtpUrl,{method:"POST"});
  navigat("/forgetpassword/otp");
}

  return (
    <div>
      <div className='container-fluid '>
        <div className="input-box">
            <label htmlFor=""> Forget Password?</label>
            <input type="email" placeholder='Ex: abc@gmail.com' value={email.email} onChange={(e)=> setEmail({...email,email:e.target.value})} required />
            <input type="button" value="Send OTP" onClick={handelForgotPass} />
            <Link className='forgetpass' to={"/"}>Sign in</Link>
            <p style={{color:"red"}}>{msg}</p>
        </div>
    </div>
    </div>
  )
}

export default ForgetPassword
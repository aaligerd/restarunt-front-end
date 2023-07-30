import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom";

function Newpassword() {
const [empCredential,setEmpCredential]=useState({email:"",newpassword:"",confirmpassword:""});
const [msg, setMsg] = useState("");

let navigaet=useNavigate();

const handelNewPassword=()=>{
  if(empCredential.email==="" || empCredential.password==="" || empCredential.confirmpassword===""){
    setMsg("Please provide all fields");
    return;
  }
    if(empCredential.confirmpassword!==empCredential.newpassword){
        setMsg("Password missmatched");
        console.log(empCredential.confirmpassword,empCredential.newpassword)
        return;
    }
    let url=process.env.REACT_APP_URL+"employee/password/newpassword?email="+empCredential.email+"&password="+empCredential.newpassword;
    
    fetch(url,{method:"POST"})
    .then(res=>{
      if(res.status===201){
        setMsg("Password changed");
        setTimeout(() => {
          navigaet("/");
        }, 2000);
      }
      else{
        setMsg("Provide valid Email");
      }
    })
    .catch(err=>{
      setMsg("There is some server error try after some time");
      console.log(err)});
    
    
    
}

  return (
    <div className='container-fluid '>
    <div className="input-box">
        <label htmlFor=""> Set new password</label>
        <input type="email" placeholder='Ex: abc@gmail.com' value={empCredential.email} onChange={(e)=> setEmpCredential({...empCredential,email:e.target.value})} required />

        <input type="password" placeholder='New Password' value={empCredential.newpassword}  onChange={(e)=> setEmpCredential({...empCredential,newpassword:e.target.value})} required />

        <input type="text" placeholder='Confirm Password' value={empCredential.confirmpassword}  onChange={(e)=> setEmpCredential({...empCredential,confirmpassword:e.target.value})} required />
        <input type="button" value="Submit" onClick={handelNewPassword} />
        <Link className='forgetpass' to={"/"}>Sign in</Link>
        <p style={{color:"red"}}>{msg}</p>
    </div>
</div>
  )
}

export default Newpassword
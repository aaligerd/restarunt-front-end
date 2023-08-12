import React,{useState,useContext} from 'react'
import { AppContext } from '../context/AppContext';
import "../css/EmployeeLogin.css";
import {Link} from 'react-router-dom';

function EmployeeLoging() {
const {setLoggedIn,setEmp} =useContext(AppContext);
const isEmpLoggin=localStorage.getItem("loggedin");
if(isEmpLoggin==="true"){
    setLoggedIn(true);
}

const [empCredential, setEmpCredential] = useState({email:"",password:""});
const [msg, setMsg] = useState("")

const handelLogin=()=>{

    //trim the white space
    setEmpCredential({
        email:empCredential.email.trim(),
        password:empCredential.password.trim()
    })
    //checking for blacnk string
   if(empCredential.length===0 || empCredential.password.length===0)
   {
    setMsg("Provide all fields");
    return;
   }
   var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": empCredential.email,
        "password": empCredential.password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
let url=process.env.REACT_APP_URL+"employee/login";
console.log(url)
    fetch(url, requestOptions)
        .then(response => {
                if(response.status===200){
                    return response.json();
                }           
                return  Promise.reject("Invalide email or password");
            })
        .then(result=>{
            localStorage.clear();
            setEmp(result);
            localStorage.setItem("id",result.empid);
            localStorage.setItem("name",result.empname);
            localStorage.setItem("role",result.empjobrole);
            localStorage.setItem("loggedin",true);
            setLoggedIn(true);
        })
        .catch(error => {
            setMsg(error);
        }); 
   }


  return (
    <div className='container-fluid '>
        <div className="input-box">
            <label htmlFor=""> Employee Login</label>
            <input type="email" placeholder='Ex: abc@gmail.com' value={empCredential.email} onChange={(e)=> setEmpCredential({...empCredential,email:e.target.value})} required />
            <input type="password" placeholder='Password' value={empCredential.password}  onChange={(e)=> setEmpCredential({...empCredential,password:e.target.value})} required />
            <input type="button" value="Login" onClick={handelLogin} />
            <Link className='forgetpass' to={"/forgetpassword"}>Forget Password</Link>
            <p style={{color:"red"}}>{msg}</p>
        </div>
    </div>
  )
}

export default EmployeeLoging
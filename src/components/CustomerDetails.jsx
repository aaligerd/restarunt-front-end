import React, { useState,useContext } from 'react';
import  "../css/CustomerDetails.css";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


export default function CustomerDetails() {
  const navigate=useNavigate();
  const{packet,setPacket,emp,setTotalBill,setOrderedItems}=useContext(AppContext);
    const [customerCredential, setCustomerCredential] = useState({"cname":"","cphone":""});
    const [msg, setMsg] = useState("");
    const handleOrderPlaced=()=>{
      let url="http://localhost:8080";
      var myHeader=new Headers();
      myHeader.append("Content-Type","application/json");

      const requestOption1={
        method:"POST",
        headers:myHeader,
        body:JSON.stringify(customerCredential)
      }

      //saving customer details in data
      fetch(url+"/customer/create",requestOption1)
      .then(res=>res.text())
      .then(res=>{localStorage.setItem("customer",res)})
      .catch(err=>console.log(err));
      

      /*getting basic priority Status
      in this case it is waiting */
    fetch(url+"/orderpriority/status/waiting")
    .then(res=>res.text())
    .then(res=>{localStorage.setItem("priority",res)})
    .catch(err=>console.log(err));

    let myCustomer=localStorage.getItem("customer");
      myCustomer=JSON.parse(myCustomer);
      localStorage.removeItem("customer");

    let myOderPriority=localStorage.getItem("priority")
    myOderPriority=JSON.parse(myOderPriority);
    localStorage.removeItem("priority");

    const orderObj={
      "packet":packet,
      "employee":emp,
      "customer":myCustomer,
      "orderPriority":myOderPriority
    };

    let requestOption2={
      method:"POST",
      headers:myHeader,
      body:JSON.stringify(orderObj)
    }
    fetch(url+"/order/create",requestOption2)
    .catch(err=>{console.log(err)})

    
    setTotalBill(0);
    setPacket({});
    setOrderedItems([]);
    navigate("/");

  




    };
  return (
    <div className='customer-container'>
        <label htmlFor="cname">Customer Name</label>
        <input type="text" id="cname" value={customerCredential.cname} onChange={(e)=>{setCustomerCredential({...customerCredential,"cname":e.target.value})}} />
        <label htmlFor="cphone">Customer phone</label>
        <input type="text" id="cphone" value={customerCredential.cphone} onChange={(e)=>{setCustomerCredential({...customerCredential,"cphone":e.target.value})}} />
        <button onClick={handleOrderPlaced}>Take Order</button>
    </div>
  )
}

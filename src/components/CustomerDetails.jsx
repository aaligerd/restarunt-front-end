import React, { useState,useContext } from 'react';
import  "../css/CustomerDetails.css";
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';


export default function CustomerDetails() {
  const navigate=useNavigate();
  const{packet,setPacket,emp,setTotalBill,setOrderedItems,defaultOrderPriority}=useContext(AppContext);
    const [customerCredential, setCustomerCredential] = useState({"cname":"","cphone":""});
    const [msg, setMsg] = useState("");

    //handel customer order
    const handleOrderPlaced=()=>{
      let url=process.env.REACT_APP_URL;
      var myHeader=new Headers();
      myHeader.append("Content-Type","application/json");

      const requestOption1={
        method:"POST",
        headers:myHeader,
        body:JSON.stringify(customerCredential)
      }

      //saving customer details in data
      fetch(url+"customer/create",requestOption1)
      .then(res=>res.json())
      .then(res=>{
        const orderObj={
          "packet":packet,
          "employee":emp,
          "customer":res,
          "orderPriority":defaultOrderPriority
        };
        let requestOption2={
          method:"POST",
          headers:myHeader,
          body:JSON.stringify(orderObj)
        }
        fetch(url+"order/create",requestOption2)
        .then(res=>res.text())
        .then((res=>{
          setMsg(res);
          setTimeout(() => {
            setMsg("");
            setTotalBill(0);
            setPacket({});
            setOrderedItems([]);
            navigate("/");
          }, 5000);
        }))
        .catch(err=>{console.log(err)});
        
        
      })
      .catch(err=>console.log(err));
    };
  return (
    <div className='customer-container'>
      <p className='sectionHeader fs-4 my-3 '>Customer details</p>

        <label htmlFor="cname">Customer Name</label>

        <input type="text" id="cname" value={customerCredential.cname} onChange={(e)=>{setCustomerCredential({...customerCredential,"cname":e.target.value})}} />

        <label htmlFor="cphone">Customer phone</label>

        <input type="text" id="cphone" value={customerCredential.cphone} onChange={(e)=>{setCustomerCredential({...customerCredential,"cphone":e.target.value})}} />

        <button onClick={handleOrderPlaced}>Take Order</button>

        <p>{msg}</p>

    </div>
  )
}

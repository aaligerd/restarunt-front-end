import React, { useContext, useEffect } from 'react'
import "../css/ChefCard.css";
import { AppContext } from "../context/AppContext";

function ChefCard({orderno,item,accept,loadOrderData,setLoadOrderData}) {
  let eid = localStorage.getItem("id");

  const{emp,setEmp}=useContext(AppContext);
  const orderAccept=()=>{
    let url=process.env.REACT_APP_URL+"order/update/maker/"+orderno+"/"+emp.empid+"/3";
    fetch(url,{method:"PUT"})
    .then(()=>{setLoadOrderData(!loadOrderData)})
    .catch(err=>{console.log(err)});
   
  }
  
  const orderComplete=()=>{
    let url=process.env.REACT_APP_URL+"order/update/status/"+orderno;
    fetch(url,{method:"PUT"})
    .then(()=>{setLoadOrderData(!loadOrderData)})
    .catch(err=>{console.log(err)})
    

  }

  useEffect(()=>{
    let url=process.env.REACT_APP_URL;
    fetch(url+"employee/get/"+eid)
    .then(res=>res.json())
    .then(res=>setEmp(res))
    .catch(err=>console.log("error while fetching employee data"))
  });
  return (
    <div className='d-flex justify-content-between flex-wrap chef-ui-card my-3 mx-3'>
        <label>Order No: <span className='orderNumber'>{orderno}</span></label>
        <label>Item: {item}</label>
        <div className='d-flex  justify-content-center card-btn-grp mt-3' >
          {accept?
            <button onClick={orderAccept} >Accept </button>:<button onClick={orderComplete} >Complet </button>}
        </div>

    </div>
  )
}

export default ChefCard
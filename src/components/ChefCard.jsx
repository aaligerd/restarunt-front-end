import React, { useContext } from 'react'
import "../css/ChefCard.css";
import { AppContext } from "../context/AppContext";

function ChefCard({orderno,item,accept,loadOrderData,setLoadOrderData}) {



  const{emp}=useContext(AppContext);
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
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {} from "../css/SingleItem.css";

function SelectItem() {
  const { orderedItems, setOrderedItems,totalBill,setTotalBill,changed,setChanged} = useContext(AppContext);
 
  const [msg, setMsg] = useState(totalBill);

  const handelQuntChange = (e, i) => {
    orderedItems[i].qunt=parseInt(e.target.value);
    setOrderedItems(orderedItems);
    setChanged(!changed);
  };

  const handelTotalBill=()=>{
    let total=orderedItems.reduce((acl,ele)=>{
      let p=ele.itemprice;
      let q=ele.qunt;
      let net=p*q;
      return acl+net;
    },0);
    setTotalBill(total);
    setChanged(!changed);
    
  }

  useEffect(() => {
    let totalBtn=document.getElementById("totalGen");
    let packBtn=document.getElementById("packetGen");
    if(orderedItems.length===0){
      setMsg("")
      totalBtn.disabled=true;
      packBtn.disabled=true;
      if(totalBill!==0){setTotalBill(0)}
    }else{
      packBtn.disabled=false;
      totalBtn.disabled=false;
      setMsg(totalBill);
    }
  }, [changed])
  


  return (
    <div className="choosed-item-container">
      <div>
        <p className="text-center my-3 fs-4 top-text">Enter Quantity</p>
      </div>
      <ol>
        {orderedItems.map((ele, indx) => {
          return (
            <li key={indx}>
              {ele.itemname + " " + ele.itemdesc} <br />
              <input
                type="number"
                placeholder="Qunt."
                value={ele.qunt}
                onChange={(e) => {
                  handelQuntChange(e, indx);
                }}
              />
            </li>
          );
        })}
      </ol>
      <div className="text-center my-5">
        <p>{msg}</p>
        <button id="totalGen" className="btn btn-success" onClick={()=>handelTotalBill()}>Total Amount</button><br />
        <button id="packetGen" className="btn btn-primary mt-2">Create Package</button>
      </div>
    </div>
  );
}

export default SelectItem;

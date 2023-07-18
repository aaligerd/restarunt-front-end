import React,{useState,useContext, useEffect} from "react";
import { items } from "../test/TestFile1";
import "../css/SingleItem.css";
import { AppContext } from "../context/AppContext";

function SingleItem({itemName,desc,itemId}) {
    let elementId="mycheckbox"+itemId;
    const {orderedItems,setOrderedItems,changed,setChanged}=useContext(AppContext);

    const handelItemCheck=(e)=>{
        if(e.target.checked){
           let addObject= items.find((ele)=>{return ele.itemid===itemId});
           addObject.qunt=0;
           setOrderedItems([...orderedItems,addObject]);
           setChanged(!changed);
          }else{
            let filteredItem=orderedItems.filter((ele)=>{return ele.itemid!==itemId});
            setOrderedItems(filteredItem);
            setChanged(!changed);
        }
    }

  return (
    <div className="my-2">
      <input type="checkbox" id={elementId} onClick={(e)=>handelItemCheck(e)}/>
      <label className="itemLbl" htmlFor={elementId}>{itemName+" "+desc}</label>
      <br />
    </div>
  );
}

export default SingleItem;

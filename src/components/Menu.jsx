import React,{useContext} from "react";
import "../css/Menu.css";
import { items } from "../test/TestFile1";
import SingleItem from "./SingleItem";
import { AppContext } from "../context/AppContext";
function Menu() {
    const {orderedItems,setOrderedItems}=useContext(AppContext);
    const deleteOrderList=()=>{
        setOrderedItems([]);
    }
  return (
    <div className="menu-container">
      <div>
        <p id="select-lbl" className="fs-4">Select Items</p>
      </div>
      <div className="text-center">
        <button onClick={deleteOrderList} className="btn btn-primary">Reset List</button>
      </div>
      <div className="mx-3">
        {items.map((ele,indx)=>{
            return <SingleItem itemName={ele.itemname} desc={ele.itemdesc} key={indx} itemId={ele.itemid}/>
        })}
        
      </div>
      
    </div>
  );
}

export default Menu;

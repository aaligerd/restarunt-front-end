import React, { createContext, useState } from "react";
export const AppContext = createContext();
export const AppPovider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [changed, setChanged] = useState(true);
  const[packet,setPacket]=useState({});
  const[emp,setEmp]=useState({});
  const [defaultOrderPriority,setDefaultOrderPriority]=useState({
    "orderPriorityId": 4,
    "orderStatusName": "waiting",
    "orderPriority": 2
});
  return (
    <AppContext.Provider value={{ isLoggedIn, setLoggedIn,orderedItems,setOrderedItems,totalBill,setTotalBill,changed,setChanged,packet,setPacket,emp,setEmp,defaultOrderPriority,setDefaultOrderPriority}}>
      {children}
    </AppContext.Provider>
  );
};
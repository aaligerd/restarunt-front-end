import React, { createContext, useState } from "react";
export const AppContext = createContext();
export const AppPovider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [changed, setChanged] = useState(true)
  return (
    <AppContext.Provider value={{ isLoggedIn, setLoggedIn,orderedItems,setOrderedItems,totalBill,setTotalBill,changed,setChanged}}>
      {children}
    </AppContext.Provider>
  );
};
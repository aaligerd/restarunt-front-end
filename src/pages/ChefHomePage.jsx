import React,{useState,useContext} from 'react'
import { AppContext } from '../context/AppContext';

function ChefHomePage() {
  const{setLoggedIn}=useContext(AppContext);
  const handelLogout=()=>{
    localStorage.clear();
    setLoggedIn(false);
}


  return (
    <div>chefHomePage
      <button onClick={handelLogout}>Logout</button>
    </div>
  )
}

export default ChefHomePage
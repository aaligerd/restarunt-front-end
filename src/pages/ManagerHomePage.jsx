import React,{useContext} from 'react';
import { AppContext } from '../context/AppContext';

function ManagerHomePage() {

  const{setLoggedIn}=useContext(AppContext);
  const handelLogout=()=>{
    localStorage.clear();
    setLoggedIn(false);
}
  return (
    <div>
        ManagerHomePage
        <button onClick={handelLogout}>Logout</button>
    </div>
    
  )
}

export default ManagerHomePage
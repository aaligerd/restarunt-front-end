import React,{useState,useContext} from 'react'
import { AppContext } from '../context/AppContext';
import ManagerHomePage from './ManagerHomePage';
import CasherHomePage from './CasherHomePage';
import ChefHomePage from './ChefHomePage';

export default function EmployeeHomePage() {
  
    const [empName, setEmpName] = useState(localStorage.getItem("name"));
    const [empRole, setEmpRole] = useState(localStorage.getItem("role"));
    const{setLoggedIn}=useContext(AppContext);
    
    
    const handelLogout=()=>{
        localStorage.clear();
        setLoggedIn(false);
    }
    
  return (
    <div>
        {empRole ==="Manager" && <ManagerHomePage/>}
        {empRole ==="Casher" && <CasherHomePage/>}
        {empRole ==="Chef" && <ChefHomePage/>}
    </div>
  )
  
}

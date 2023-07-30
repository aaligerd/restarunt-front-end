import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import {useNavigate} from "react-router-dom";
import "../css/CasherHomepage.css";
import SingleRowComponent from "../components/SingleRowComponent";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBowlFood, faRotateRight, faUtensilSpoon, faUtensils } from "@fortawesome/free-solid-svg-icons";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../components/PageHeader";
import Avater from "../components/Avater";

export default function CasherHomePage() {
  let eid = localStorage.getItem("id");
  // const [empName, setEmpName] = useState(fname);
  const [orders, setOrders] = useState(null);
  const [msg, setMsg] = useState("")
  const [loadOrderData, setLoadOrderData] = useState(false);
  const navigate=useNavigate();

  const { emp,setEmp,setLoggedIn } = useContext(AppContext);
  const handelLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  useEffect(()=>{
    let url=process.env.REACT_APP_URL;
    fetch(url+"employee/get/"+eid)
    .then(res=>res.json())
    .then(res=>setEmp(res))
    .catch(err=>console.log("error while fetching employee data"))



    fetch(url+"order/getall")
    .then(res=>res.json())
    .then(res=>{res=sortOrders(res);setOrders(res);})
    .catch(err=>{console.log(err)});
  },[loadOrderData]);
  const sortOrders=(res)=>{
    return res.sort((a,b)=>{
      return b.orderPriority.orderPriority - a.orderPriority.orderPriority;
    });
  }

  return (
    <div className="container-fluid">
      <PageHeader/>
      <div className="row  mt-3">
        <div className="col-4 d-flex flex-column justify-content-start">
          <p id="profile-name">
            Name: {emp.empname}
          </p>
          <p id="profile-name">
            EmpID: {emp.empid}
          </p>
        </div>
        <div className="col-4 d-flex justify-content-around">
          <button className="button-57" id="middle-btn" onClick={()=>{navigate("/neworder");}}>
          <span className="text"><FontAwesomeIcon icon={faBowlFood} className="mx-2"/></span>
            <span>New Order</span>
          </button>
          <button className="button-57" id="middle-btn"  >
          <span className="text">
            <FontAwesomeIcon icon={faUtensils} className="mx-2"/>
          </span>
          <span>Check Order Status</span>
          </button>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <button id="logoutbtn" onClick={handelLogout} className="button-57">
          <span class="text"><FontAwesomeIcon icon={faArrowRightFromBracket} className="mx-2"/></span>
          <span>LOG OUT</span>
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row my-4">
          <div className="col d-flex justify-content-between">
            <h4>Food Order</h4>
            <h4 className="text-center" style={{textTransform:"uppercase",color:"#e74c3c"}}>{msg}</h4>
            <button style={{border:"none",outline:"none", padding:"5px 10px",backgroundColor:"#000",color:"#fff",borderRadius:"5px"}} onClick={()=>{setLoadOrderData(!loadOrderData)}}>Refresh <FontAwesomeIcon icon={faRotateRight}/></button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((ele,indx)=>{
              let orderStatus=ele.orderPriority.orderStatusName;
              let ftext,fcolor;
              if(orderStatus==="served"){
                fcolor="black";
                ftext="served";
              }
              else if(orderStatus==="ready"){
                fcolor="green";
                ftext="ready";
              }
              else if(orderStatus==="ongoing"){
                fcolor="blue";
                ftext="ongoing";
              }
              else{
               
                  fcolor="red";
                  ftext="waiting";
                
              }
             return <tr key={indx}>
                <td className="orderno-col">{ele.orderno}</td>
                <td className="cnmae-col"><Avater name={ele.customer.cname}/></td>
                <td className="item-col">{ele.packet.packeditems} </td>
                <td className="price-col">Rs.{ele.packet.packetprice}</td>
                
                <td><SingleRowComponent fcolor={fcolor} ftext={ftext} id={indx} orderNo={ele.orderno} setMsg={setMsg} loadOrderData={loadOrderData} loadDataFun={setLoadOrderData}/></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

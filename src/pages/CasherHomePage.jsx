import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import {useNavigate} from "react-router-dom";
import "../css/CasherHomepage.css";
import SingleRowComponent from "../components/SingleRowComponent";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../components/PageHeader";

export default function CasherHomePage() {
  let fullname = localStorage.getItem("name");
  let fname = fullname.split(" ")[0];
  const [empName, setEmpName] = useState(fname);
  const [orders, setOrders] = useState(null);
  const [msg, setMsg] = useState("")
  const [loadOrderData, setLoadOrderData] = useState(false);
  const navigate=useNavigate();

  const { setLoggedIn } = useContext(AppContext);
  const handelLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  useEffect(()=>{
    
    fetch("http://localhost:8080/order/getall")
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
        <div className="col-4 d-flex justify-content-start">
          <p id="profile-name">
            Hello <b>{empName}</b>{" "}
          </p>
        </div>
        <div className="col-4 d-flex justify-content-around">
          <button className="btn btn-primary" onClick={()=>{navigate("/neworder");}}>
            {" "}
            New Order
          </button>
          <button className="btn btn-primary" >
            {" "}
            Order Status
          </button>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            id="logoutbtn"
            onClick={handelLogout}
          >
            {" "}
            Log out
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="mx-2"/>
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row position-absolute updateText">
          <div className="col">
            <p className="text-center">{msg}</p>
          </div>
        </div>
        <div className="row my-2">
          <div className="col d-flex justify-content-end">
            <button style={{border:"none",outline:"none", padding:"5px 10px",backgroundColor:"#000",color:"#fff",borderRadius:"5px"}} onClick={()=>{setLoadOrderData(!loadOrderData)}}>Refresh <FontAwesomeIcon icon={faRotateRight}/></button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Order no</th>
              <th>Packed Items</th>
              <th>Customer Name</th>
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
                <td>{ele.orderno}</td>
                <td>{ele.packet.packeditems} </td>
                <td>{ele.customer.cname}</td>
                <td>{ele.packet.packetprice}</td>
                
                <SingleRowComponent fcolor={fcolor} ftext={ftext} id={indx} orderNo={ele.orderno} setMsg={setMsg} loadOrderData={loadOrderData} loadDataFun={setLoadOrderData}/>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

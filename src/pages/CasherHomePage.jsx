import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import "../css/CasherHomepage.css";
import SingleRowComponent from "../components/SingleRowComponent";

export default function CasherHomePage() {
  let fullname = localStorage.getItem("name");
  let fname = fullname.split(" ")[0];
  const [empName, setEmpName] = useState(fname);
  const [orders, setOrders] = useState(null);

  const { setLoggedIn } = useContext(AppContext);
  const handelLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  useEffect(()=>{
    
    fetch("http://localhost:8080/order/getall")
    .then(res=>res.json())
    .then(res=>{setOrders(res)})
    .catch(err=>{console.log(err)});
  },[]);

  return (
    <div className="container-fluid">
      <div className="row brand-col">
        <div className="col d-flex justify-content-center">
          <p id="brand-name">Welcome to Majumder's</p>
        </div>
      </div>
      <div className="row  mt-3">
        <div className="col-4 d-flex justify-content-start">
          <p id="profile-name">
            Hello <b>{empName}</b>{" "}
          </p>
        </div>
        <div className="col-4 d-flex justify-content-around">
          <button className="btn btn-primary" onClick={handelLogout}>
            {" "}
            New Order
          </button>
          <button className="btn btn-primary" onClick={handelLogout}>
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
          </button>
        </div>
      </div>
      <div className="container mt-5">
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
              let orderStatus=ele.orderstatus;
              let ftext,fcolor;
              if(orderStatus==="served"){
                fcolor="black";
                ftext="SERVED";
              }
              else if(orderStatus==="ready"){
                fcolor="green";
                ftext="READY";
              }
              else if(orderStatus==="ongoing"){
                fcolor="blue";
                ftext="ONGOING";
              }
              else{
               
                  fcolor="red";
                  ftext="WAITING";
                
              }
             return <tr key={indx}>
                <td>{ele.orderno}</td>
                <td>{ele.packet.packeditems} </td>
                <td>{ele.customer.cname}</td>
                <td>{ele.packet.packetprice}</td>
                
                <SingleRowComponent fcolor={fcolor} ftext={ftext}/>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/ChefHomePage.css";
import {
  faBowlFood,
  faRotateRight,
  faUtensilSpoon,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import ChefCard from "../components/ChefCard";

function ChefHomePage() {
  let eid = localStorage.getItem("id");
  const { setLoggedIn, logOuthandle, emp, setEmp } = useContext(AppContext);
  const [order, setOrder] = useState([]);
  const [selfOrder, setSelfOrder] = useState([]);
  const [loadOrderData, setLoadOrderData] = useState(true);

  const handelRefreshChefOrder=()=>{
    setLoadOrderData(!loadOrderData);
  }

  const handelLogout = () => {
    logOuthandle();
  };
  useEffect(() => {
    const url=process.env.REACT_APP_URL
    fetch(url+"employee/get/")
      .then((res) => res.json())
      .then((res) => setEmp(res))
      .catch((err) => console.log("error while fetching employee data"));
  
      fetch(url+"order/getbypriority/4")
      .then(res=>res.json())
      .then(res=>setOrder(res))
      .catch(err=>console.log(err));
      
      fetch(url+"order/getbyemp/"+eid)
      .then(res=>res.json())
      .then(res=>setSelfOrder(res))
      .catch(err=>console.log(err))


  }, [loadOrderData]);

  return (
    <div>
      <PageHeader />
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col d-flex flex-column justify-content-between">
            <p id="profile-name">Name: {emp.empname}</p>
            <p id="profile-name">EmpID: {emp.empid}</p>
          </div>
          <div className="col d-flex  justify-content-end">
            <button id="logoutbtn" onClick={handelLogout} className="button-57">
              <span class="text">
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="mx-2"
                />
              </span>
              <span>LOG OUT</span>
            </button>
          </div>
        </div>
      </div>
    <div className="container">
      <div className="row">
        <div>
          <p className="text-center fs-3" id="waitingpara">Waiting List</p>
        </div>
      </div>
    </div>
      <div className="container">
        <div className="row mb-4">
          <div className="col d-flex justify-content-end">
          <button className="refreshBtn" onClick={handelRefreshChefOrder}>
              Refresh
              <FontAwesomeIcon id="refIcn" icon={faRotateRight} />
            </button>
          </div>
        </div>
        <div className="row chef-card-caontainer">
            {order && order.map((ele,indx)=>{
              return <ChefCard loadOrderData={loadOrderData} setLoadOrderData={setLoadOrderData} orderno={ele.orderno} item={ele.packet.packeditems} key={indx} accept={true}/>
            })}
        </div>
      </div>
      <div className="container my-5">
        <div className="row chef-card-caontainer">
          <div>
            <p className="text-center fs-3" id="yourlistpara">Your List</p>
          </div>
          {selfOrder && selfOrder.map((ele,indx)=>{
              return <ChefCard loadOrderData={loadOrderData} setLoadOrderData={setLoadOrderData} orderno={ele.orderno} item={ele.packet.packeditems} key={indx} accept={false}/>
            })}
        </div>
      </div>
    </div>
  );
}

export default ChefHomePage;

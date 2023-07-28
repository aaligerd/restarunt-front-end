import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  const handelLogout = () => {
    logOuthandle();
  };
  useEffect(() => {
    let url1 = "http://localhost:8080/employee/get/" + eid;
    fetch(url1)
      .then((res) => res.json())
      .then((res) => setEmp(res))
      .catch((err) => console.log("error while fetching employee data"));
      let url2="http://localhost:8080/order/getbypriority/1";
      fetch(url2)
      .then(res=>res.json())
      .then(res=>setOrder(res))
      .catch(err=>console.log(err));
      console.log(order)

  }, []);

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
        <div className="col d-flex justify-content-between flex-wrap">
            {order && order.map((ele,indx)=>{
              return <ChefCard orderno={ele.orderno} item={ele.packet.packeditems} key={indx}/>
            })}
        </div>
        </div>
      </div>
    </div>
  );
}

export default ChefHomePage;

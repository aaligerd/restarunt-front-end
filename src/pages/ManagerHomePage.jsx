import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import { months } from "../assets/Data/months";
import { graphData1 } from "../util/GraphDataFormating";
import Charts from "../components/Chart";
import BarChart from "../components/BarChart";
import "../css/ManagerHomePage.css";
import Loading from "../components/Loading";
import OrderTable from "../components/OrderTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import StatCard from "../components/StateCard";

function ManagerHomePage() {
  let eid = localStorage.getItem("id");
  const { emp, setEmp, setLoggedIn, graph1, setGraph1 } =
    useContext(AppContext);

  const [dailySellData, setDailySellData] = useState([]);
  const [dailySellGraphData,setDailySellGraphData]=useState({});
  const[hasSellData,setHasSellData]=useState(false);

  const [dailyPriceData, setDailyPriceData] = useState([]);
  const [dailyPriceGraphData,setDailyPriceGraphData]=useState({});
  const[hasPriceData,setHasPriceData]=useState(false);


  const [orders, setOrders] = useState(null);
  const [hasData, setHasData] = useState(false);
  const [msg, setMsg] = useState("");
  const [loadOrderData, setLoadOrderData] = useState(false);

  const handelLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  useEffect(() => {
    let url = process.env.REACT_APP_URL;
    fetch(url + "employee/get/" + eid)
      .then((res) => res.json())
      .then((res) => setEmp(res))
      .catch((err) => console.log("error while fetching employee data"));

    fetch(url + "packet/manager/packet/1")
      .then((res) => res.json())
      .then((res) => {
        setDailySellData(res);
        setDailySellGraphData({
          labels:dailySellData.map((ele)=>{const l=ele.pkMonth+" "+ele.pkDate;return l;}),
          datasets:[{
            label:"Item Sell",
            data:dailySellData.map((ele)=>ele.noOrder),
            backgroundColor:[" #d35400 "," #e67e22","#3498db"],
            borderColor:["#ec7063"],
            tension: 0
          }]
        });
        setHasSellData(true);
      })
      .catch((err) => console.log(err));

      fetch(url + "packet/manager/packet/1")
      .then((res) => res.json())
      .then((res) => {
        setDailySellData(res);
        setDailySellGraphData({
          labels:dailySellData.map((ele)=>{const l=ele.pkMonth+" "+ele.pkDate;return l;}),
          datasets:[{
            label:"Daily Packet Orderd",
            data:dailySellData.map((ele)=>ele.noOrder),
            backgroundColor:[" #d35400 "," #e67e22","#3498db"],
            borderColor:["#ec7063"],
            tension: 0
          }]
        });
        setHasSellData(true);
      })
      .catch((err) => console.log(err));

      fetch(url + "packet/manager/packet/2")
      .then((res) => res.json())
      .then((res) => {
        setDailyPriceData(res);
        setDailyPriceGraphData({
          labels:dailyPriceData.map((ele)=>{const l=ele.pkMonth+" "+ele.pkDate;return l;}),
          datasets:[{
            label:"Daily Sell(Rs)",
            data:dailyPriceData.map((ele)=>ele.price),
            backgroundColor:[" #d35400 "," #e67e22","#3498db"],
            borderColor:["#ec7063"],
            tension: 0
          }]
        });
        setHasPriceData(true);
      })
      .catch((err) => console.log(err));

      fetch(url+"order/getall")
      .then(res=>res.json())
      .then(res=>{res=sortOrders(res);setOrders(res);})
      .then(()=>{
        setHasData(true);
  
      })
      .catch(err=>{console.log(err)});

      


  }, [hasSellData,hasPriceData,loadOrderData]);
  const sortOrders=(res)=>{
    return res.sort((a,b)=>{
      return b.orderPriority.orderPriority - a.orderPriority.orderPriority;
    });
  }

  return (
    <div>
      <PageHeader />
      <div className="container-fluid">
        <div className="row my-2 px-2">
          <div className="col">
            <p id="profile-name">Name: {emp.empname}</p>
            <p id="profile-name">EmpID: {emp.empid}</p>
          </div>
          <div className="col text-end">
            <button onClick={handelLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
        <StatCard title="Total Item Delivered" number="500" details="This is the total number of delivery done by us" color="1"/>
            <StatCard title="Today Item Packed" number="51324" details="This is the total number of views we get" color="2"/>
            <StatCard title="Today Total Earnings" number="2426" details="This is the maimum number of view we get in a single post" color="3"/>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row row-cols-2">
          <div className="col">
          <div className='chart-box'>
            {hasSellData?<Charts LinechartData={dailySellGraphData} />: "<div>Data Loading</div>"}
        </div>
          </div>
          <div className="col">
          <div className='chart-box'>
            {hasPriceData?<BarChart BarchartData={dailyPriceGraphData} />: "<div>Data Loading</div>"}
        </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <div className="row ordertbl">
            <div className="col-12 ">
              <p className="text-center fs-4">Recent Orders</p>
              <div className="text-center my-5">
              <button style={{border:"none",outline:"none", padding:"5px 10px",backgroundColor:"#000",color:"#fff",borderRadius:"5px"}} onClick={()=>{setLoadOrderData(!loadOrderData);setHasData(false);}}>Refresh <FontAwesomeIcon icon={faRotateRight}/></button>
              </div>
            </div>
          </div>
        {hasData?<OrderTable orders={orders} setMsg={setMsg} loadOrderData={loadOrderData} setLoadOrderData={setLoadOrderData}/>:<Loading/>}
        </div>
      </div>
    </div>
  );
}

export default ManagerHomePage;

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/PageHeader";
import Charts from "../components/Chart";
import BarChart from "../components/BarChart";
import "../css/ManagerHomePage.css";
import Loading from "../components/Loading";
import OrderTable from "../components/OrderTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileArrowUp,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import ManagerHeader from "../components/ManagerHeader";
import { months } from "../assets/Data/months";

function ManagerHomePage() {
  let eid = localStorage.getItem("id");
  const { emp, setEmp, setLoggedIn } = useContext(AppContext);

  const [cardData, setCardData] = useState([]);
  // const [hasCarddata, setHasCardData] = useState(false);
  const [loadCardData, setLoadCardData] = useState(false);

  const [dailySellData, setDailySellData] = useState([]);
  const [dailySellGraphData, setDailySellGraphData] = useState({});
  const [hasSellData, setHasSellData] = useState(false);

  const [dailyPriceData, setDailyPriceData] = useState([]);
  const [dailyPriceGraphData, setDailyPriceGraphData] = useState({});
  const [hasPriceData, setHasPriceData] = useState(false);

  const [orders, setOrders] = useState(null);
  const [hasData, setHasData] = useState(false);
  const [msg, setMsg] = useState("");
  const [loadOrderData, setLoadOrderData] = useState(false);

  const[currentMonthForDataExport,setCurrentMonthForDataExport]=useState("");
  const handelLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };
  const changeCurrentMonth=async(e)=>{
    await setCurrentMonthForDataExport(months[e.target.value-1]);
    console.log(currentMonthForDataExport)
  }

  useEffect(() => {
    let url = process.env.REACT_APP_URL;
    fetch(url + "employee/get/" + eid)
      .then((res) => res.json())
      .then((res) => setEmp(res))
      .catch((err) => console.log("error while fetching employee data"));

    //card data
    fetch(url + "packet/manager/carddata")
      .then((res) => res.json())
      .then((res) => {
        setCardData(res);
      })
      .then(() => {
        setLoadCardData(!loadCardData);
      })
      .catch((err) => {
        console.log(err);
      });

    //line graph
    fetch(url + "packet/manager/packet/1")
      .then((res) => res.json())
      .then((res) => {
        setDailySellData(res);
        setDailySellGraphData({
          labels: dailySellData.map((ele) => {
            const l = ele.pkMonth + " " + ele.pkDate;
            return l;
          }),
          datasets: [
            {
              label: "Daily Packet Orderd",
              data: dailySellData.map((ele) => ele.noOrder),
              backgroundColor: [" #d65400"],
              borderColor: ["rgba(75, 192, 192)"],
              tension: 0.35,
            },
          ],
        });
        setHasSellData(true);
      })
      .catch((err) => console.log(err));

    //bar graph
    fetch(url + "packet/manager/packet/2")
      .then((res) => res.json())
      .then((res) => {
        setDailyPriceData(res);
        setDailyPriceGraphData({
          labels: dailyPriceData.map((ele) => {
            const l = ele.pkMonth + " " + ele.pkDate;
            return l;
          }),
          datasets: [
            {
              label: "Daily Sell (Rs)",
              data: dailyPriceData.map((ele) => ele.price),
              tension: 0.35,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(255, 159, 64, 0.5)",
                "rgba(255, 205, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
              ],
              borderWidth: 2,
            },
          ],
        });
        setHasPriceData(true);
      })
      .catch((err) => console.log(err));

    fetch(url + "order/getall")
      .then((res) => res.json())
      .then((res) => {
        res = sortOrders(res);
        setOrders(res);
      })
      .then(() => {
        setHasData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loadOrderData, hasPriceData, hasSellData]);
  const sortOrders = (res) => {
    return res.sort((a, b) => {
      return b.orderPriority.orderPriority - a.orderPriority.orderPriority;
    });
  };

  //csv export functions
  const exportMonthlydata = () => {};

  const exportDailydata = () => {};

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
      <div className="container-fluid">
        <div className="container">
          {cardData && <ManagerHeader cardData={cardData} />}
        </div>
      </div>
      <div className="container-fluid">
        <div className="row row-cols-2">
          <div className="col">
            <div className="chart-box">
              {hasPriceData ? (
                <BarChart BarchartData={dailyPriceGraphData} />
              ) : (
                <Loading />
              )}
            </div>
          </div>
          <div className="col">
            <div className="chart-box">
              {hasSellData ? (
                <Charts LinechartData={dailySellGraphData} />
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-6 text-center">
            <div>
              <button
                className="expbtn"
                onClick={() => {
                  exportDailydata();
                }}
              >
                Export Daily Data <FontAwesomeIcon icon={faFileArrowUp} />{" "}
              </button>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div className="mx-4">
              <select className="form-select" aria-label="Default select example" onChange={(e)=>{changeCurrentMonth(e)}}>
                <option value="0" selected>Select Month</option>
                {months.map((month,key)=><option value={key+1} key={key}>{month}</option>)}
              </select>
            </div>
            <div>
              <button
                className="expbtn"
                onClick={() => {
                  exportMonthlydata();
                }}
              >
                Export Monthly Data <FontAwesomeIcon icon={faFileArrowUp} />
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row ordertbl">
            <div className="col-12 ">
              <p className="text-center fs-4">Recent Orders</p>
              <div className="text-center my-5">
                <button
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "5px 10px",
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    setLoadOrderData(!loadOrderData);
                    setHasData(false);
                  }}
                >
                  Refresh <FontAwesomeIcon icon={faRotateRight} />
                </button>
              </div>
            </div>
          </div>
          {hasData ? (
            <OrderTable
              orders={orders}
              setMsg={setMsg}
              loadOrderData={loadOrderData}
              setLoadOrderData={setLoadOrderData}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerHomePage;

import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import PageHeader from "../components/PageHeader";

function ManagerHomePage() {
  let eid = localStorage.getItem("id");
  const { emp, setEmp } = useContext(AppContext);
  const { setLoggedIn } = useContext(AppContext);
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
  }, []);
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
    </div>
  );
}

export default ManagerHomePage;

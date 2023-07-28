import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {} from "../css/SelectItem.css";
import { json } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons";

function SelectItem() {
  const {
    orderedItems,
    setOrderedItems,
    totalBill,
    setTotalBill,
    changed,
    setChanged,
    setPacket,
  } = useContext(AppContext);

  const [bill, setBill] = useState(totalBill);
  const [msg, setMsg] = useState("");

  const handelQuntChange = (e, i) => {
    orderedItems[i].qunt = parseInt(e.target.value);
    setOrderedItems(orderedItems);
    setChanged(!changed);
  };

  const handelTotalBill = () => {
    let total = orderedItems.reduce((acl, ele) => {
      let p = ele.itemprice;
      let q = ele.qunt;
      let net = p * q;
      return acl + net;
    }, 0);
    setTotalBill(total);
    setChanged(!changed);
  };

  const createPacket = () => {
    let packedItems = "";
    document.getElementById("packetGen").disabled = true;
    packedItems = orderedItems.reduce((ac, ele) => {
      let tempItem =
        ele.itemname + " " + ele.itemdesc + " x " + ele.qunt + ", ";
      return (ac = ac + tempItem);
    }, "");
    let packedItemsNo = orderedItems.reduce((ac, ele) => {
      return (ac = ac + parseInt(ele.qunt));
    }, 0);

    packedItems = packedItems.substring(0, packedItems.length - 2);

    const finalPack = JSON.stringify({
      packeditems: packedItems,
      totalitems: packedItemsNo,
      packetprice: totalBill,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: finalPack,
      redirect: "follow",
    };

    fetch("http://localhost:8080/packet/create", requestOptions)
      .then((response) =>
        response.status === 201 ? response.json() : setMsg("Some Thing Wrong")
      )
      .then((result) => {
        setPacket(result);
        setMsg("Packet Created");
        setTimeout(() => {
          setMsg("");
        }, 5000);
      })
      .catch((error) => console.log("error", error));

    document.getElementById("packetGen").disabled = false;
  };

  useEffect(() => {
    let totalBtn = document.getElementById("totalGen");
    let packBtn = document.getElementById("packetGen");
    if (orderedItems.length === 0) {
      setMsg("");
      totalBtn.disabled = true;
      packBtn.disabled = true;
      if (totalBill !== 0) {
        setTotalBill(0);
      }
    } else {
      packBtn.disabled = false;
      totalBtn.disabled = false;
      setBill(totalBill);
    }
  }, [changed]);

  return (
    <div className="choosed-item-container">
      <div>
        <p className="text-center my-3 fs-4 top-text sectionHeader">Enter Quantity</p>
      </div>
      <ol className="selectedList">
        {orderedItems.map((ele, indx) => {
          return (
            <li key={indx}>
              <label>
                {ele.itemname + " " + ele.itemdesc} 
              </label>
              <br />
              <input
                type="number"
                placeholder="Qunt."
                value={ele.qunt}
                onChange={(e) => {
                  handelQuntChange(e, indx);
                }}
              />
            </li>
          );
        })}
      </ol>
      <div className="text-center my-5">
        <p>{bill}</p>
        <button
          id="totalGen"
          className="btn btn-success"
          onClick={() => handelTotalBill()}
        >
          Total Amount
        </button>
        <br />
        <button
          id="packetGen"
          className="btn btn-primary mt-2"
          onClick={createPacket}
        >
          Create Packcket
        </button>
      </div>
      <div>
        <p className="text-center fs-3">{msg}</p>
      </div>
    </div>
  );
}

export default SelectItem;

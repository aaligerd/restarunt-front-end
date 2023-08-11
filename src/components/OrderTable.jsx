import React from 'react'
import Avater from './Avater';
import SingleRowComponent from './SingleRowComponent';

function OrderTable({orders,setMsg,loadOrderData,setLoadOrderData}) {
  return (
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
            {orders.map((ele,indx)=>{
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
  )
}

export default OrderTable
import React,{useState} from 'react';
import '../css/SingleRowComponent.css';

function SingleRowComponent({fcolor,ftext,id,orderNo,setMsg,loadDataFun,loadOrderData}) {



  const orderStatusText=["served","ready","ongoing","waiting"];
  const neededTextForChange=orderStatusText.filter((ele)=>{return ele!==ftext});

  const handelOrderChangeStatus=(e)=>{
    let oStat=e.target.innerHTML;
    let oStateNum=orderStatusText.indexOf(oStat)+1;
    
    let url="http://localhost:8080/order/update/status/"+orderNo+"/"+oStateNum;
    fetch(url,{method:"POST"})
    .then(res=>res.text())
    .then(res=>{
      loadDataFun(!loadOrderData);
      setMsg(res)
      setTimeout(() => {
        setMsg("");
      }, 5000);
      
    })
    .catch(err=>console.log(err));
   


  }

  const buttonSataeChange=()=>{
    let btId1="btn"+id+""+0;
    let btId2="btn"+id+""+1;
    let btId3="btn"+id+""+2;
    const btn1=document.getElementById(btId1);

    const btn2=document.getElementById(btId2);
    const btn3=document.getElementById(btId3);
    if(btn1.classList.contains("activeChangeBtn")){
      
      btn1.classList.replace("activeChangeBtn","deactiveChangeBtn");
      btn2.classList.replace("activeChangeBtn","deactiveChangeBtn");
      btn3.classList.replace("activeChangeBtn","deactiveChangeBtn");
      
    }else{
      btn1.classList.replace("deactiveChangeBtn","activeChangeBtn");
      btn2.classList.replace("deactiveChangeBtn","activeChangeBtn");
      btn3.classList.replace("deactiveChangeBtn","activeChangeBtn");
    }
  }
  return (
    <td id='tblLastCol' style={{color:fcolor}} >
        {ftext} 


        <button id='orderStatusChangeBtn'
        onClick={buttonSataeChange}>i</button>


        <div className='changeOptions'>

          {neededTextForChange.map((ele,idx)=>{
          const uniqId="btn"+id+""+idx;
          return <button className='changeBtn deactiveChangeBtn' key={idx} id={uniqId} onClick={(e)=>handelOrderChangeStatus(e)}>
            {ele}
            </button>
        })}

        </div>

        
     </td>
  )
}

export default SingleRowComponent
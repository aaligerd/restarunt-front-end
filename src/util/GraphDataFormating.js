import { months } from "../assets/Data/months";

let dailydata=[];


const graphData1=(data)=>{
    data.map((ele,indx)=>{
        const d = new Date(ele.pkDate);
        let month=months[d.getMonth()];
        let day=d.getDate();
        let year=d.getFullYear();
        let price=ele.price;

        let singleDayObj={
            month,day,year,price
        }
        dailydata.push(singleDayObj);

});

 return dailydata;
}


export  {graphData1};
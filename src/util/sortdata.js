const sortOrders=(res)=>{
    return res.sort((a,b)=>{
      return b.orderPriority.orderPriority - a.orderPriority.orderPriority;
    });
  }

  export default sortOrders;
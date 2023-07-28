import React from 'react'
import "../css/ChefCard.css";

function ChefCard({orderno,item}) {
  return (
    <div className='chef-ui-card'>
        <label>Order No: <span className='orderNumber'>{orderno}</span></label>
        <label>Item: {item}</label>
        <div className='d-flex  justify-content-between card-btn-grp mt-3' >
            <button>Accept </button>
            <button>Complete </button>
        </div>

    </div>
  )
}

export default ChefCard
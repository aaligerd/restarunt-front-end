import React from 'react'
import StatCard from './StateCard'

function ManagerHeader({cardData}) {
  return (
    <div className="row d-flex justify-content-center">
          <StatCard
            isCurrency={false}
            title="Total Item Delivered"
            number={cardData[0]}
            details="This is the total number of items delivery done by us"
            color="1"
          />
          <StatCard
            isCurrency={false}
            title="Today Item Packed"
            number={cardData[1]}
            details="This is the total number of packet created today so far"
            color="2"
          />
          <StatCard
            isCurrency={true}
            title="Today Total Earnings"
            number={cardData[2]}
            details="This is the earning of today so far"
            color="3"
          />
        </div>
  )
}

export default ManagerHeader
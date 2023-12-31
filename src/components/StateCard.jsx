import React from "react";
import "../css/Statcard.css";
function StatCard(props) {
  const { title, number, details, color,isCurrency } = props;
  const colorNum = parseInt(color);
  const colorGrade = [
    "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)",
    "linear-gradient(-60deg, #16a085 0%, #f4d03f 100%)",
    "linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
  ];
  const cardBackground = { backgroundImage: colorGrade[colorNum - 1] };
  return (
    <div className="col">
      <div className="card" style={cardBackground}>
        <div className="card-number">
          <p>{number}</p>
        </div>
        <div className="card-title">
          <p>{title}</p>
        </div>
        <div className="card-details">
          <p>{isCurrency?"Rs. "+details:details}</p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;

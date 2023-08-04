import React from 'react'
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
import {Line,Bar} from 'react-chartjs-2';
import '../css/Chart.css';

function BarChart({BarchartData}) {
  return (
    <div className='line-chart'>
      <div className='graph'>
        <Bar data={BarchartData} options={{responsive:true,maintainAspectRatio:true}}/>
      </div>
  </div>
  )
}

export default BarChart
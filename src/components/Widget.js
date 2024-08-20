import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Widget = ({ widget }) => {
  // Check if widget exists and if it has any data
  const hasData =
    widget &&
    widget.type === 'Chart' &&
    widget.data &&
    widget.data.length > 0;

  if (!hasData) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '122px', height: '154px', position:"absolute", left: '19%' }}>
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm5-4v12a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1zm5-5v17a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1zm5 8v9a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1z" fill="#999"/>
      </svg>
      <span style={{color:"grey",fontSize:10}}>No Graph Data Available</span>
    </div>
    
    );
  }

  const labels = widget.data.map((item) => item.label);
  const values = widget.data.map((item) => item.value);
  const colors = widget.data.map((item) => item.color);
  const totalValue = widget.data.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);

  const chartData = {
    labels: labels.filter((label) => label !== 'total'), // Exclude 'total' from chart labels
    datasets: [
      {
        data: values.filter((value, index) => labels[index] !== 'total'), // Exclude 'total' from chart data
        backgroundColor: colors, 
        hoverBackgroundColor: colors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false, // Because we need to display a custom legend
      },
    },
  };

  return (
    <div className="flexrow" style={{ gap: '20px', alignItems: 'center' }}>
      <div style={{ width: '122px', height: '154px', position: 'relative' }}>
        <Doughnut data={chartData} options={chartOptions} />
        <div
          className="doughnutTotal"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          {totalValue}
          <br />
          Total
        </div>
      </div>
      <div>
        {widget.data
          .filter((item) => item.label !== 'total')
          .map((item, index) => (
            <div
              key={index}
              className="flexcolumn widgetRight"
              style={{ marginBottom: '10px' }}
            >
              <span>{item.label}: {item.value}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Widget;

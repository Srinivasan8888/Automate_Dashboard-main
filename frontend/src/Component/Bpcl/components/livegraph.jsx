import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { baseUrl } from '../config';

// Register the components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
};

const LiveGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      { label: 'Sensor 1', data: [], borderColor: 'rgb(255, 99, 132)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
      { label: 'Sensor 2', data: [], borderColor: 'rgb(53, 162, 235)', backgroundColor: 'rgba(53, 162, 235, 0.5)' },
      { label: 'Sensor 3', data: [], borderColor: 'rgb(75, 192, 192)', backgroundColor: 'rgba(75, 192, 192, 0.5)' },
      { label: 'Sensor 4', data: [], borderColor: 'rgb(255, 159, 64)', backgroundColor: 'rgba(255, 159, 64, 0.5)' },
      { label: 'Sensor 5', data: [], borderColor: 'rgb(153, 102, 255)', backgroundColor: 'rgba(153, 102, 255, 0.5)' },
      { label: 'Sensor 6', data: [], borderColor: 'rgb(255, 205, 86)', backgroundColor: 'rgba(255, 205, 86, 0.5)' },
      { label: 'Sensor 7', data: [], borderColor: 'rgb(54, 162, 235)', backgroundColor: 'rgba(54, 162, 235, 0.5)' },
      { label: 'Sensor 8', data: [], borderColor: 'rgb(201, 203, 207)', backgroundColor: 'rgba(201, 203, 207, 0.5)' },
    ],
  });
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${baseUrl}jsondata`)
        .then(response => {
          const reversedata = response.data;
          const apiData = reversedata.reverse();
          const labels = apiData.map(item => new Date(item.updatedAt).toLocaleTimeString());
          const dataset1 = apiData.map(item => parseInt(item.s1, 10));
          const dataset2 = apiData.map(item => parseInt(item.s2, 10));
          const dataset3 = apiData.map(item => parseInt(item.s3, 10));
          const dataset4 = apiData.map(item => parseInt(item.s4, 10));
          const dataset5 = apiData.map(item => parseInt(item.s5, 10));
          const dataset6 = apiData.map(item => parseInt(item.s6, 10));
          const dataset7 = apiData.map(item => parseInt(item.s7, 10));
          const dataset8 = apiData.map(item => parseInt(item.s8, 10));
          const lastUpdatedAt = apiData[apiData.length - 1].updatedAt;

          setChartData({
            labels,
            datasets: [
              { label: 'Sensor 1', data: dataset1, borderColor: 'rgb(255, 99, 132)', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
              { label: 'Sensor 2', data: dataset2, borderColor: 'rgb(53, 162, 235)', backgroundColor: 'rgba(53, 162, 235, 0.5)' },
              { label: 'Sensor 3', data: dataset3, borderColor: 'rgb(75, 192, 192)', backgroundColor: 'rgba(75, 192, 192, 0.5)' },
              { label: 'Sensor 4', data: dataset4, borderColor: 'rgb(255, 159, 64)', backgroundColor: 'rgba(255, 159, 64, 0.5)' },
              { label: 'Sensor 5', data: dataset5, borderColor: 'rgb(153, 102, 255)', backgroundColor: 'rgba(153, 102, 255, 0.5)' },
              { label: 'Sensor 6', data: dataset6, borderColor: 'rgb(255, 205, 86)', backgroundColor: 'rgba(255, 205, 86, 0.5)' },
              { label: 'Sensor 7', data: dataset7, borderColor: 'rgb(54, 162, 235)', backgroundColor: 'rgba(54, 162, 235, 0.5)' },
              { label: 'Sensor 8', data: dataset8, borderColor: 'rgb(201, 203, 207)', backgroundColor: 'rgba(201, 203, 207, 0.5)' },
            ],
          });

          setLastUpdated(lastUpdatedAt);
        })
        .catch(error => {
          console.error('Error fetching chart data: ', error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='flex flex-col items-center w-full max-h-96'>
      <Line options={options} data={chartData}/>
    </div>
  );
};

export default LiveGraph;

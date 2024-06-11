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

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
 
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
  
  // Data for the chart
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [300, 500, 100, 400, 600, 200, 700],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

const Graphcomp = () => {
  return (
    <div className='flex justify-center'>
    <Line options={options} data={data} style={{ width: "100%", height: '512px'}}/>
  </div>
  )
}

export default Graphcomp
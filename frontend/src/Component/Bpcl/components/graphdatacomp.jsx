import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

const Graphdatacomp = ({ labels, sensorData, label, fetchData, sensor }) => {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: sensorData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-8 grid grid-cols-1 gap-1 w-full max-w-4xl">
        <div className="grid grid-cols-6 gap-6 mb-2">
          {[10, 50, 100, 150, 200, 250].map((limit) => (
            <button
              key={limit}
              onClick={() => fetchData(limit, sensor)}
              className="w-full rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:text-black focus:outline-none focus:ring active:text-blue-500"
            >
              {limit}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const limit = parseInt(e.target.elements.custom.value, 10);
            fetchData(limit, sensor);
          }}
        >
          <label
            htmlFor="custom"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Custom
          </label>
          <div className="relative">
            <input
              type="text"
              id="custom"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Custom"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-4xl">
        <Line options={options} data={data} style={{ height: "512px" }} />
      </div>
    </div>
  );
};

export default Graphdatacomp;

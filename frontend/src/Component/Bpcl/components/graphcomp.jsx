import React, { useState, useRef } from "react";
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
import { Line } from "react-chartjs-2";

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
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

const Graphcomp = ({ labels, sensorData, label, fetchData, sensor }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startdate") {
      setStartDate(value);
      console.log("Start Date:", value);
    } else if (name === "enddate") {
      setEndDate(value);
      console.log("End Date:", value);
    }
  };

  const handleSubmit = () => {
    fetchData(startDate, endDate, sensor);
  };

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
      <div className="mt-8 grid grid-cols-6 gap-6 w-full max-w-4xl">
        <div className="col-span-6 sm:col-span-3 relative">
          <label
            htmlFor="startdate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startdate"
            name="startdate"
            onChange={handleDateChange}
            value={startDate}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pl-2 pr-8 py-2"
            ref={startDateInputRef}
          />
        </div>

        <div className="col-span-6 sm:col-span-3 relative">
          <label
            htmlFor="enddate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="enddate"
            name="enddate"
            onChange={handleDateChange}
            value={endDate}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pl-2 pr-8 py-2"
            ref={endDateInputRef}
          />
        </div>

        <div className="col-span-6">
          <button
            onClick={handleSubmit}
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <Line options={options} data={data} style={{ height: "512px" }} />
      </div>
    </div>
  );
};

export default Graphcomp;

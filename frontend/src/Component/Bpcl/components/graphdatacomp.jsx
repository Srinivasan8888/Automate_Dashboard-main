import React from "react";
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

const Graphdatacomp = ({ labels, sensorData, label }) => {
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
        <div className="grid grid-cols-4 gap-6">
          <button
            // onClick={handleSubmit}
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:text-black focus:outline-none focus:ring active:text-blue-500"
          >
            100
          </button>
          <button
            // onClick={handleSubmit}
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:text-black focus:outline-none focus:ring active:text-blue-500"
          >
            500
          </button>
          <button
            // onClick={handleSubmit}
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:text-black focus:outline-none focus:ring active:text-blue-500"
          >
            1000
          </button>
          <button
            // onClick={handleSubmit}
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:text-black focus:outline-none focus:ring active:text-blue-500"
          >
            1500
          </button>
          <button
            // onClick={handleSubmit}
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:text-black focus:outline-none focus:ring active:text-blue-500"
          >
            2000
          </button>
          <button
            // onClick={handleSubmit}
            className="w-full rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:text-black focus:outline-none focus:ring active:text-blue-500"
          >
            2500
          </button>
          {/* <div className="grid grid-flow-col justify-stretch space-x-4">
            <FloatingLabel variant="outlined" label="Label" />
          </div> */}

          <form>
            <label
              for="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              custom
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="custom"
                id="custom"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="custom"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full max-w-4xl">
        <Line options={options} data={data} style={{ height: "512px" }} />
      </div>
    </div>
  );
};

export default Graphdatacomp;

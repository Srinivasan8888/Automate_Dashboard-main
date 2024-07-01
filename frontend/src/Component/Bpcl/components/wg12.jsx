import React, { useEffect, useState } from "react";
import { FaTemperatureHigh } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../config";

const WG12 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${baseUrl}jsondata`)
        .then((response) => {
          setData(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      
      <div className="flex justify-between">
  <a className="flex-col mx-4 mt-3 font-medium text-black text-xl justify-between items-center">
    WaveGuide1 - 12 Pipe
  </a>

  <div>
    <a className="flex-col mb-2 text-2xl font-medium text-black text-xl  mr-3">
      Last-Updated : {data.updatedAt ? formatDate(data.updatedAt) : "Loading..."}
    </a>
  </div>
</div>




      <div className="flex flex-col mt-5 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[data.s1, data.s2, data.s3, data.s4].map((sensorValue, index) => (
            <div key={index} className="flex-grow max-w-full mb-4">
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {sensorValue} °C
                    </h5>
                    <p className="font-bold text-white">Sensor {index + 1}</p>
                  </div>
                  <FaTemperatureHigh className="text-3xl text-gray-900 dark:text-white h-12 w-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WG12;

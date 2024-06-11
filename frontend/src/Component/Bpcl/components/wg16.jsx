import React, { useEffect, useState } from "react";
import { FaTemperatureHigh } from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../config";

const WG16 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${baseUrl}jsondata`)
        .then((response) => {
          setData(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <a className="flex flex-col mx-4 mt-5 font-medium text-black text-xl">
        WaveGuide2 - 16Inch
      </a>
      <div className="flex flex-col mt-5 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[data.s5, data.s6, data.s7, data.s8].map((sensorValue, index) => (
            <div key={index} className="flex-grow max-w-full mb-4">
              <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {sensorValue} °C
                    </h5>
                    <p className="font-normal text-white">Sensor {index + 1}</p>
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

export default WG16;

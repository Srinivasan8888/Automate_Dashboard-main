import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import Graphcomp from "../components/graphcomp";

const ChartDate = () => {
  const [sensorData, setSensorData] = useState({
    labels: [],
    s1: [],
    s2: [],
    s3: [],
    s4: [],
    s5: [],
    s6: [],
    s7: [],
    s8: [],
  });

  const fetchData = (startDate, endDate, sensor) => {
    axios
      .get(`${baseUrl}limitdate?sensor=${sensor}&date1=${startDate}&date2=${endDate}`)
      .then((response) => {
        const apiData = response.data.reverse();
        const labels = apiData.map((item) =>
          new Date(item.updatedAt).toLocaleTimeString()
        );
        const newData = apiData.map((item) => parseInt(item[sensor], 10));
        setSensorData((prevData) => ({
          ...prevData,
          labels,
          [sensor]: newData,
        }));
      })
      .catch((error) => {
        console.error("Error fetching sensor data: ", error);
      });
  };

  return (
    <div className="flex-grow overflow-y-auto">
      <div>
        <div>
          <a className="flex flex-col mx-4 font-medium text-black text-xl">
            WaveGuide1 - 12Inch
          </a>
          <div className="flex flex-col px-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <Graphcomp
                labels={sensorData.labels}
                sensorData={sensorData.s1}
                label="Sensor 1"
                fetchData={fetchData}
                sensor="s1"
              />
              <Graphcomp
                labels={sensorData.labels}
                sensorData={sensorData.s2}
                label="Sensor 2"
                fetchData={fetchData}
                sensor="s2"
              />
              <Graphcomp
                labels={sensorData.labels}
                sensorData={sensorData.s3}
                label="Sensor 3"
                fetchData={fetchData}
                sensor="s3"
              />
              <Graphcomp
                labels={sensorData.labels}
                sensorData={sensorData.s4}
                label="Sensor 4"
                fetchData={fetchData}
                sensor="s4"
              />
            </div>
          </div>
        </div>
        <div>
          <a className="flex flex-col mx-4 mt-10 font-medium text-black text-xl">
            WaveGuide1 - 16Inch
          </a>
          <div className="flex flex-col px-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <Graphcomp
                labels={sensorData.labels}
                sensorData={sensorData.s5}
                label="Sensor 5"
                fetchData={fetchData}
                sensor="s5"
              />
              <Graphcomp
                labels={sensorData.labels}
                sensorData={sensorData.s6}
                label="Sensor 6"
                fetchData={fetchData}
                sensor="s6"
              />
              <Graphcomp
                labels={sensorData.labels}
                sensorData={sensorData.s7}
                label="Sensor 7"
                fetchData={fetchData}
                sensor="s7"
              />
              <Graphcomp
                labels={sensorData.labels}
                sensorData={sensorData.s8}
                label="Sensor 8"
                fetchData={fetchData}
                sensor="s8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDate;

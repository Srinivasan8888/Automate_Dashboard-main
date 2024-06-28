import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import Graphdatacomp from "../components/graphdatacomp";

const Chartpoint = () => {
  const [sensorData, setSensorData] = useState({
    s1: { labels: [], data: [] },
    s2: { labels: [], data: [] },
    s3: { labels: [], data: [] },
    s4: { labels: [], data: [] },
    s5: { labels: [], data: [] },
    s6: { labels: [], data: [] },
    s7: { labels: [], data: [] },
    s8: { labels: [], data: [] },
  });

  const fetchData = (limit, sensor) => {
    axios
      .get(`${baseUrl}limitdata?sensor=${sensor}&limits=${limit}`)
      .then((response) => {
        const apiData = response.data;
        const labels = apiData.map((item) => new Date(item.updatedAt).toLocaleTimeString());
        const newData = apiData.map((item) => parseInt(item[sensor], 10));
        setSensorData((prevData) => ({
          ...prevData,
          [sensor]: { labels, data: newData },
        }));
      })
      .catch((error) => {
        console.error("Error fetching sensor data: ", error);
      });
  };

  useEffect(() => {
    // Initial fetch for each sensor with a default limit
    fetchData(10, 's1');
    fetchData(10, 's2');
    fetchData(10, 's3');
    fetchData(10, 's4');
    fetchData(10, 's5');
    fetchData(10, 's6');
    fetchData(10, 's7');
    fetchData(10, 's8');
  }, []);

  return (
    <div className="flex-grow overflow-y-auto">
      <div>
        <div>
          <a className="flex flex-col mx-4 font-medium text-black text-xl">
            WaveGuide1 - 12Inch
          </a>
          <div className="flex flex-col px-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <Graphdatacomp
                labels={sensorData.s1.labels}
                sensorData={sensorData.s1.data}
                label="Sensor 1"
                fetchData={fetchData}
                sensor="s1"
              />
              <Graphdatacomp
                labels={sensorData.s2.labels}
                sensorData={sensorData.s2.data}
                label="Sensor 2"
                fetchData={fetchData}
                sensor="s2"
              />
              <Graphdatacomp
                labels={sensorData.s3.labels}
                sensorData={sensorData.s3.data}
                label="Sensor 3"
                fetchData={fetchData}
                sensor="s3"
              />
              <Graphdatacomp
                labels={sensorData.s4.labels}
                sensorData={sensorData.s4.data}
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
              <Graphdatacomp
                labels={sensorData.s5.labels}
                sensorData={sensorData.s5.data}
                label="Sensor 5"
                fetchData={fetchData}
                sensor="s5"
              />
              <Graphdatacomp
                labels={sensorData.s6.labels}
                sensorData={sensorData.s6.data}
                label="Sensor 6"
                fetchData={fetchData}
                sensor="s6"
              />
              <Graphdatacomp
                labels={sensorData.s7.labels}
                sensorData={sensorData.s7.data}
                label="Sensor 7"
                fetchData={fetchData}
                sensor="s7"
              />
              <Graphdatacomp
                labels={sensorData.s8.labels}
                sensorData={sensorData.s8.data}
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

export default Chartpoint;

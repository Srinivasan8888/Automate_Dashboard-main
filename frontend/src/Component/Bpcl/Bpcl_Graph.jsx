import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./config";
import Header from "./components/header";
// import Graphcomp from "./components/graphcomp";
import { Tabs } from "flowbite-react";
import { FaChartArea } from "react-icons/fa";
import Chartdate from "./components/chartdate";

import { LuScatterChart } from "react-icons/lu";
import Chartpoint from "./components/chartpoint";

const Bpcl_Graph = () => {
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

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${baseUrl}jsondata`)
        .then((response) => {
          const apiData = response.data.reverse();
          const labels = apiData.map((item) =>
            new Date(item.updatedAt).toLocaleTimeString()
          );
          const s1 = apiData.map((item) => parseInt(item.s1, 10));
          const s2 = apiData.map((item) => parseInt(item.s2, 10));
          const s3 = apiData.map((item) => parseInt(item.s3, 10));
          const s4 = apiData.map((item) => parseInt(item.s4, 10));
          const s5 = apiData.map((item) => parseInt(item.s5, 10));
          const s6 = apiData.map((item) => parseInt(item.s6, 10));
          const s7 = apiData.map((item) => parseInt(item.s7, 10));
          const s8 = apiData.map((item) => parseInt(item.s8, 10));
          setSensorData({ labels, s1, s2, s3, s4, s5, s6, s7, s8 });
        })
        .catch((error) => {
          console.error("Error fetching sensor data: ", error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (sensorData.labels.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Tabs aria-label="Default tabs" variant="default">
        <Tabs.Item active title="Date Chart" icon={FaChartArea}>
          <Chartdate />
        </Tabs.Item>
        <Tabs.Item title="Data point Chart" icon={LuScatterChart}>
          <Chartpoint />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default Bpcl_Graph;

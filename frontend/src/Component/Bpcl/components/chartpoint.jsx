import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import Graphdatacomp from "../components/graphdatacomp";

const Chartpoint = () => {
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
    <div className="flex-grow overflow-y-auto">
    <div>
        <div>
            <a className="flex flex-col mx-4 font-medium text-black text-xl">
                WaveGuide1 - 12Inch
            </a>
            <div className="flex flex-col px-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">

                    
                    <Graphdatacomp
                        labels={sensorData.labels}
                        sensorData={sensorData.s1}
                        label="Sensor 1"
                    />
                    <Graphdatacomp
                        labels={sensorData.labels}
                        sensorData={sensorData.s2}
                        label="Sensor 2"
                    />
                    <Graphdatacomp
                        labels={sensorData.labels}
                        sensorData={sensorData.s3}
                        label="Sensor 3"
                    />
                    <Graphdatacomp
                        labels={sensorData.labels}
                        sensorData={sensorData.s4}
                        label="Sensor 4"
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
                        labels={sensorData.labels}
                        sensorData={sensorData.s5}
                        label="Sensor 5"
                    />
                    <Graphdatacomp
                        labels={sensorData.labels}
                        sensorData={sensorData.s6}
                        label="Sensor 6"
                    />
                    <Graphdatacomp
                        labels={sensorData.labels}
                        sensorData={sensorData.s7}
                        label="Sensor 7"
                    />
                    <Graphdatacomp
                        labels={sensorData.labels}
                        sensorData={sensorData.s8}
                        label="Sensor 8"
                    />
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Chartpoint
import React, { useEffect, useState } from 'react';
import { CiClock1 } from "react-icons/ci";
import Gmap from './gmap';
import { Progress } from "flowbite-react";
import axios from "axios";
import { baseUrl } from "../config";

const Assets = () => {
  const [data, setData] = useState({ updatedAt: null, lastLogin: null });

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${baseUrl}jsondata`)
        .then((response) => {
          const assetData = response.data[0];
          setData({
            updatedAt: assetData.updatedAt,
            lastLogin: assetData.lastLogin,
          });
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

 
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <div className="p-4">
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {/* <div className="flex-1">
          <div className="text-lg font-semibold mb-2">Asset Locations</div>
          <div className="bg-orange-200 p-1.5 rounded-lg">
            <Gmap />
          </div> 
        </div> */}
        <div className="flex-1">
          <div className="text-lg font-semibold mb-2">Asset Details</div>
          <div className="space-y-4">
          <div className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.updatedAt ? formatDate(data.updatedAt) : 'Loading...'}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">Last Updated</p>
                </div>
                <CiClock1 className="text-3xl text-gray-900 dark:text-white h-12 w-auto" />
              </div>
            </div>
            {/* <div className="block max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.lastLogin ? formatDate(data.lastLogin) : 'Error fetching data'}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">Last Login</p>
                </div>
                <CiClock1 className="text-3xl text-gray-900 dark:text-white h-12 w-auto" />
              </div>
            </div> */}
          </div>
          <div className="flex flex-col mt-5 space-y-4">
            <div className="text-base font-medium text-white dark:text-white">
              <a className="text-black dark:text-black">Sensors</a>
              <Progress
                progress={40}
                progressLabelPosition=""
                textLabel="8/20"
                textLabelPosition="inside"
                size="lg"
                labelProgress
                labelText
                color="blue"
              />
            </div>
            <div className="text-base font-medium text-white  dark:text-white">
              <a className="text-black dark:text-black">Storage</a>
              <Progress
                progress={15}
                progressLabelPosition=""
                textLabel="22MB/1024MB"
                textLabelPosition="inside"
                size="lg"
                labelProgress
                labelText
                color="blue"
              />
            </div>
            <div className="text-md font-medium text-white dark:text-white">
              <a className="text-black dark:text-black">Device Temperature</a>
              <Progress
                progress={25}
                progressLabelPosition=""
                textLabel="25°C/100°C"
                textLabelPosition="inside"
                size="lg"
                labelProgress
                labelText
                color="blue"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assets;

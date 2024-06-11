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
    const intervalId = setInterval(fetchData,1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="flex flex-row space-x-4">
        <div className="flex-1 mt-3 mx-4">
          <div className="text-lg font-semibold mb-2">Asset Locations</div>
          <div className="bg-orange-200 p-1.5 rounded-lg">
            <Gmap />
          </div>
        </div>
        <div className="flex-1 mt-3 mx-4">
          <div className="text-lg font-semibold mb-2">Asset Details</div>
          <div className="flex flex-row space-between mt-10">
            <div className="flex-1">
              <div className="flex-grow max-w-full mb-4 md:mb-0">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.lastLogin ? new Date(data.lastLogin).toLocaleString() : 'Error fetching data'}
                      </h5>
                      <p className="font-normal text-white">Last Login</p>
                    </div>
                    <CiClock1 className="text-3xl text-gray-900 dark:text-white h-12 w-auto" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex-grow max-w-full mb-4 md:mb-0">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'Loading...'}
                      </h5>
                      <p className="font-normal text-white">Last Updated</p>
                    </div>
                    <CiClock1 className="text-3xl text-gray-900 dark:text-white h-12 w-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mr-11">
            <div className="flex-1 text-base font-medium text-white dark:text-white mt-5">
              <a className="text-black">Sensors</a>
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
            <div className="flex-1 text-base font-medium text-white dark:text-white mt-5">
              <a className="text-black">Storage</a>
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
            <div className="flex-1 text-base font-medium text-white dark:text-white mt-5">
              <a className="text-black">Device Temperature</a>
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

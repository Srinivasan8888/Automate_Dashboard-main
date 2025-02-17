import React, { useState, useRef, useEffect, Fragment } from "react";
// import Sidebars from "../components/Sidebar/Sidebars";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import "./css/Report.css";
import * as XLSX from "xlsx";
import xymaimg from "../img/logo.png";
import coverImg from "../img/pdfcover.jpg";
import disclaimerPage from "../img/disclaimerPage.jpg";
import productimg from "../img/utmaps.png"
import { baseUrl } from "../config";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Reportdatecomp = () => {
  const [selectedId, setSelectedId] = useState("XY00001");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const [infoGraph, setInfoGraph] = useState([]);
  const [selectedCylinder, setSelectedCylinder] = useState(null);

    const fetchData = async () => {
        try {
          const infoVal = [
            { device_name: 's1' },
            { device_name: 's2' },
            { device_name: 's3' },
            { device_name: 's4' },
            { device_name: 's5' },
            { device_name: 's6' },
            { device_name: 's7' },
            { device_name: 's8' },
            // { device_name: 'All' }
          ];
          
          setInfoGraph(infoVal);
          if (infoVal.length > 0) {
            setSelectedCylinder(infoVal[0].device_name);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };      


  useEffect(() => {
    fetchData();
  }, []);

  const handleCylinderChange = (cylinderId) => {
    setSelectedCylinder(cylinderId);
    setSelectedId(cylinderId);
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === "startdate") {
      setStartDate(value);
    } else if (name === "enddate") {
      setEndDate(value);
    }
  };

  const pdfSubmit = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
  
    try {
      const response = await fetch(
        `${baseUrl}limitdate?sensor=${selectedId}&date1=${startDate}&date2=${endDate}`
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data === null || data.length === 0) {
        alert("No data found.");
        return;
      }
  
      // Check if data is an array
      if (Array.isArray(data)) {
        const doc = new jsPDF();
        const logo = xymaimg;
        const cover = coverImg;
        const disclaimer = disclaimerPage;
  
        doc.addImage(cover, "JPG", 0, 0, 210, 297);
        doc.addPage();
        doc.addImage(logo, "PNG", 10, 10, 40, 20);
  
        doc.autoTable({
          head: [
            ["s.no", "device_name", "temperature", "timestamp"],
          ],
          body: data.map((item, index) => {
            // Assuming selectedId is dynamically fetched and used to determine temperature
            let device_name = selectedId;
            let temperature = item[selectedId]; // Fetch temperature based on selectedId
            
            // Handle cases where temperature might not exist for selectedId
            if (!temperature) {
              temperature = "N/A"; // Provide default value or handle accordingly
            }
    
            return [
              index + 1,
              device_name,
              temperature,
              item.createdAt, // Use the createdAt field for timestamp
            ];
          }),
          startY: 40,
          headerStyles: {
            fillColor: [222, 121, 13],
          },
        });
  
        doc.addPage();
        doc.addImage(logo, "PNG", 10, 10, 40, 20);
        doc.addImage(disclaimer, "PNG", 0, 50, 210, 250);
  
        // Save the PDF file and open it in a new tab
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        console.error("Data received is not an array:", data);
        alert("Error: Data received is not in expected format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data. Please try again later.");
    }
  };
  
  
  

  const handleSubmit = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
    } else {
      const apidate = async () => {
        if (selectedId !== null) {
          try {
            const response = await fetch(
              `${baseUrl}limitdate?sensor=${selectedId}&date1=${startDate}&date2=${endDate}`
            );
            console.log(response);
            const data = await response.json();
            console.log(response);

            if (data == null || data.length === 0 ) {
              alert("No data found.");
              return;
            }

            if (Array.isArray(data)) {
              const modifiedData = data.map((obj) => {
                const { _id, __v, updatedAt, ...rest } = obj;
                return rest;
              });

              const wb = XLSX.utils.book_new();
              const ws = XLSX.utils.json_to_sheet(modifiedData);
              XLSX.utils.book_append_sheet(wb, ws, "Data");
              XLSX.writeFile(wb, `${selectedId} report.xlsx`);
              console.log("Data:", modifiedData);
            } else {
              console.error("Data received is not an array:", data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };

      apidate();
      console.log("Start Date:", startDate);
      console.log("End Date:", endDate);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-[#F2F2F2] h-full w-full">
        <section className="">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
              <img
                alt=""
                src={productimg}
                className="absolute inset-0 h-94 object-cover -rotate-[17deg] pl-32"
              />
            </aside>

            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Reports Page 📝
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Select from two different dates!
                </p>

                <div className="relative flex justify-start  mt-24 sm:mt-0 z-20">
                  <div className="relative w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-44">
                    <Listbox
                      value={selectedCylinder}
                      onChange={handleCylinderChange}
                    >
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-center text-xs md:text-sm font-medium text-gray-700 mb-2 mt-2">
                            Select Device
                          </Listbox.Label>
                          <div className="relative">
                            <span className="inline-block w-full">
                              <Listbox.Button className="flex justify-between items-center pl-2 md:pl-3 py-1 md:py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-sm border-gray-300 rounded text-gray-800">
                                <span className="truncate">
                                  {selectedCylinder}
                                </span>
                                {open ? (
                                  <ChevronUpIcon
                                    className="h-4 md:h-5 w-4 md:w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <ChevronDownIcon
                                    className="h-4 md:h-5 w-4 md:w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                )}
                              </Listbox.Button>
                            </span>
                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 pl-0 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {infoGraph.map((cylinderItem) => (
                                  <Listbox.Option
                                    key={cylinderItem.device_name}
                                    value={cylinderItem.device_name}
                                  >
                                    {({ selected, active }) => (
                                      <div
                                        className={`${
                                          active
                                            ? "text-white bg-indigo-600"
                                            : "text-gray-900"
                                        } cursor-default select-none relative py-2 md:pl-0`}
                                      >
                                        {selected && (
                                          <span
                                            className={`${
                                              active
                                                ? "text-white"
                                                : "text-indigo-600"
                                            } absolute inset-y-0 left-0 flex items-center pl-1 text-amber-600`}
                                          >
                                            <CheckIcon
                                              className="h-4 mt-1 md:h-5 w-4 md:w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        )}
                                        <span
                                          className={`text-xs md:text-base ${
                                            active
                                              ? "font-semibold"
                                              : "font-normal"
                                          } pl-8`}
                                        >
                                          {cylinderItem.device_name}
                                        </span>
                                      </div>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 relative">
                    <label
                      htmlFor="StartDate"
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
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pl-8 p-3"
                      ref={startDateInputRef}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 relative">
                    <label
                      htmlFor="EndDate"
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
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-black shadow-sm pl-8 p-3"
                      ref={endDateInputRef}
                    />
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                      onClick={handleSubmit}
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Download The Excel
                    </button>

                    <button
                      onClick={() => pdfSubmit(infoGraph)}
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Download The PDF
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Reportdatecomp
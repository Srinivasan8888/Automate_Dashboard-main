// import React,{useState} from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import report from '../Assets/4936937.jpg'
// import Select from 'react-select';
// import { MdDownload } from "react-icons/md";
// import { FaRegFilePdf } from "react-icons/fa6";
// import { RiFileExcel2Line } from "react-icons/ri";
// import DatePicker from "react-datepicker";
// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// import "react-datepicker/dist/react-datepicker.css";
// const Reports = () => {
//   const [toDate, setToDate] = useState(null);
//   const [fromDate, setFromDate] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]); 
//   const [selectAll, setSelectAll] = useState(false);
//   const [projectData, setProjectData] = useState([]);

//         const handleFromDate = (date) => {
//           setFromDate(date);
//           console.log(date);
//         };
//         const handleToDate = (date) => {
//           setToDate(date);
//           console.log(date);
//         };
      
//         const toggleDropdown = () => {
//           setIsOpen(!isOpen);
//           setSelectedOptions([]);
//           setSelectAll(false);
//         };

//         const handleSelectAll = () => {
//           if (selectAll) {
//             setSelectedOptions([]);
//           } else {
//             setSelectedOptions(
//               Object.keys(projectData[0]).filter(
//                 (key) => key !== "_id" && key !== "__v" && key !== "Time"
//               )
//             );
//           }
//           setSelectAll(!selectAll);
//         };
//         const handleDropdownOptions = (key) => {
//             if (selectedOptions.includes(key)) {
//               setSelectedOptions(selectedOptions.filter((k) => k !== key));
//             } else {
//               setSelectedOptions([...selectedOptions, key]);
//         }

        
//           };
//             //download pdf
//   const generatePdf = () => {
//     const doc = new jsPDF();
//     const logo = xymaimg;
//     const cover = coverImg;
//     const disclaimer = disclaimerPage;
    
//     //pdf table headers
//     const headers = [
//       "S.No",
//       ...Object.keys(filteredData[0]).filter(
//         (key) =>
//           key !== "_id" &&
//           key !== "Time" &&
//           key !== "__v" &&
//           selectedOptions.includes(key)
//       ),
//       "Updated At",
//     ];

//     //pdf table data
//     const body = filteredData.map((item, index) => {
//       const stringTime = item.Time.toString();
//       const dateWithoutTimezone = stringTime.split("GMT")[0].trim();
//       const rows = [
//         index + 1,
//         ...Object.keys(item)
//           .filter(
//             (key) =>
//               key !== "_id" &&
//               key !== "Time" &&
//               key !== "__v" &&
//               selectedOptions.includes(key)
//           )
//           .map((key) => item[key]),
//         dateWithoutTimezone,
//       ];
//       return rows;
//     });

//     //cover img
//     doc.addImage(cover, "JPG", 0, 0, 210, 297);
//     doc.addPage();

//     //logo
//     doc.addImage(logo, "PNG", 10, 10, 40, 20);

//     //table
//     doc.autoTable({
//       head: [headers],
//       body: body,
//       startY: 40,
//       headerStyles: {
//         fillColor: [222, 121, 13],
//       },
//     });
//     doc.addPage();

//     //logo
//     doc.addImage(logo, "PNG", 10, 10, 40, 20);

//     //disclaimer
//     doc.addImage(disclaimer, "PNG", 0, 50, 210, 250);
//     //doc.save(`${projectName}_reports.pdf`);

//     const pdfBlob = doc.output("blob");
//     const pdfUrl = URL.createObjectURL(pdfBlob);
//     window.open(pdfUrl);
//   };



//   return (
//     <div className='flex justify-center items-center'>
//       <div className='flex flex-col items-center justify-start bg-gray-600 w-5/6 mt-2 rounded-md shadow-lg h-[95vh]'>
//         <span className='font-bold border-b font-sans mt-2 hover:font-serif text-[#fcfcfc]'>
//           XYMA Analytics Private Limited
//         </span>
//         <div className="h-[87%] flex items-center justify-center">
//             <div className=" shadow-2xl bg-white">
//               {/* top part */}
//               <div className="text-sm  font-medium flex justify-between bg-gray-500 text-white">
//                 <div className="p-2">Download Report</div>
//                 <div className="p-2 bg-amber-400">
//                   <MdDownload size={20} />
//                 </div>
//               </div>
//               {/* bottom part */}
//               <div className="flex items-center flex-col gap-4 p-6">
//                 {/* date picker */}
//                 <div className="flex flex-col gap-4">
//                   <div>
//                     <div className="mb-1 text-sm font-medium">From:</div>
//                     <DatePicker
//                       className="rounded-lg border border-black p-1"
//                       selected={fromDate}
//                       name="fromdate"
//                       onChange={handleFromDate}
//                       dateFormat={"dd/MM/yyyy"}
//                       showIcon
//                     />
//                   </div>
//                   <div className="w-full">
//                     <div className="mb-1 text-sm font-medium">To:</div>
//                     <DatePicker
//                       className="rounded-lg border border-black w-full"
//                       selected={toDate}
//                       name="todate"
//                       onChange={handleToDate}
//                       dateFormat={"dd/MM/yyyy"}
//                       showIcon
//                     />
//                   </div>
//                 </div>

//                 {/* dropdown */}

//                 <div className="bg-white border border-black rounded-md cursor-pointer w-full mt-2">
//                   <div onClick={toggleDropdown} className="flex">
//                     <div
//                       className="text-sm p-2 text-gray-500 w-[180px] h-[34px] overflow-auto"
//                       style={{ scrollbarWidth: "none" }}
//                     >
//                       {selectedOptions.length === 0
//                         ? "Select Parameters"
//                         : selectedOptions.join(", ")}
//                     </div>
//                     <div className="flex items-center justify-center w-[37px] bg-gray-300 rounded-r-md">
//                       {isOpen ? (
//                         <IoIosArrowUp size={25} />
//                       ) : (
//                         <IoIosArrowDown size={25} />
//                       )}
//                     </div>
//                   </div>
//                   {isOpen && (
//                     <div
//                       className="w-full h-24 overflow-auto bg-white"
//                       style={{ scrollbarWidth: "none" }}
//                     >
//                       <label className="flex hover:bg-gray-300 p-2 text-xs font-medium cursor-pointer gap-2 duration-200">
//                         <input
//                           type="checkbox"
//                           id="selectAll"
//                           className="cursor-pointer"
//                           checked={selectAll}
//                           onChange={handleSelectAll}
//                         />
//                         <label htmlFor="selectAll" className="cursor-pointer">
//                           Select All
//                         </label>
//                       </label>
//                       {Object.keys(projectData[0])
//                         .filter(
//                           (key) =>
//                             key !== "_id" && key !== "__v" && key !== "Time"
//                         )
//                         .map((key, index) => (
//                           <label
//                             key={key}
//                             className={`flex gap-2 text-gray-700 text-xs font-medium p-2 hover:bg-gray-300 duration-200 cursor-pointer ${
//                               selectAll
//                                 ? "opacity-50  hover:bg-white cursor-not-allowed"
//                                 : ""
//                             }`}
//                           >
//                             <input
//                               id={key}
//                               type="checkbox"
//                               className="cursor-pointer"
//                               disabled={selectAll}
//                               checked={
//                                 selectAll || selectedOptions.includes(key)
//                               }
//                               onChange={() => handleDropdownOptions(key)}
//                             />
//                             <div>{`${key}`}</div>
//                           </label>
//                         ))}
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex gap-4">
//                   {/* download pdf button */}
//                   <div
//                     className="flex items-center p-3 rounded-xl text-white bg-red-500  hover:bg-red-600 duration-200 cursor-pointer hover:scale-110"
//                     onClick={generatePdf}
//                   >
//                     <FaRegFilePdf size={25} />
//                   </div>

//                   {/* download excel button */}
//                   <div
//                     className="flex flex-col items-center p-3 rounded-xl text-white bg-green-500  hover:bg-green-600 duration-200 cursor-pointer hover:scale-110"
//                     onClick={generateExcel}
//                   >
//                     <RiFileExcel2Line size={25} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         {/* <div className='grid xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 mt-2 w-full'>
//           <div className='w-full h-full'>
//             <span className='font-Helvetica font-bold flex flex-col items-center text-[#fce565] mt-4 sm:text-sm md:text xl:text-3xl'>Download You Report</span>
//             <div className='flex items-center'>
//               <div className='font-semibold text-white'>
//                 Select Sensor Id:
//               </div>
//               <div>
//               <Select className="ml-4" options={options} styles={customStyles} onChange={handleSensorChange} />
//               </div>
//             </div>
//           </div>
//           <div className='w-full h-full'>
//             <div className='flex flex-col items-center'>
//               <img className='ml-4 mr-4 rounded-3xl' src={report}></img>
//             </div>
//           </div>
//         </div> */}
//         <span className="text-center text-gray-400 mt-2">©2024 XYMA Analytics Private Limited</span>
//       </div>

//     </div>
//   )
// }

// export default Reports
import React from 'react'

const Reports = () => {
  return (
    <div>
      
    </div>
  )
}

export default Reports

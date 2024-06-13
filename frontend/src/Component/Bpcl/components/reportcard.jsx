import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaRegFilePdf } from "react-icons/fa";
import { baseUrl } from "../config";
import * as XLSX from "xlsx";
import xymaimg from "../img/logo.png";
import coverImg from "../img/pdfcover.jpg";
import disclaimerPage from "../img/disclaimerPage.jpg";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SensorCard = ({ sensorNumber }) => {
  const handleExcelClick = async () => {
    try {
      const response = await fetch(
        `${baseUrl}reportdata?sensorid=s${sensorNumber}`
      );
      if (response.ok) {
        const json = await response.json();

        const excelData = json.map((entry) => [
          entry[`s${sensorNumber}`],
          entry.updatedAt,
        ]);

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([
          [`Sensor ${sensorNumber} Value`, "Timestamp"],
          ...excelData,
        ]);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sensor Data");

        const excelBuffer = XLSX.write(workbook, {
          type: "array",
          bookType: "xlsx",
        });

        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `sensor${sensorNumber}_report.xlsx`;
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to generate Excel file:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handlePdfClick = async () => {
    try {
      const response = await fetch(
        `${baseUrl}reportdata?sensorid=s${sensorNumber}`
      );
      if (response.ok) {
        console.log(response);
        const data = await response.json();
        console.log(response);
  
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
  
          const sensorFieldName = Object.keys(data[0]).find(key => key.startsWith('s'));
          if (!sensorFieldName) {
            console.error("No sensor data found in JSON.");
            return;
          }
  
          doc.autoTable({
            head: [["s.no",`Sensor ${sensorNumber} Value`, "Timestamp"]], // Dynamic column header
            body: data.map(({ [sensorFieldName]: sensorValue, updatedAt }, index) => {
              return [index + 1, sensorValue, updatedAt]; // Changed timestamp to use formatDate function
            }),
            startY: 40,
            headerStyles: {
              fillColor: [222, 121, 13],
            },
          });
  
          doc.addPage();
          doc.addImage(logo, "PNG", 10, 10, 40, 20);
          doc.addImage(disclaimer, "PNG", 0, 50, 210, 250);
          // doc.save("sensor_reports.pdf");
          const blob = doc.output("blob");
          const url = URL.createObjectURL(blob);
          window.open(url, "_blank");
        } else {
          console.error("Data received is not an array:", data);
        }
      } else {
        console.error("Failed to generate PDF file:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/4 m-2 flex flex-col items-center justify-center mt-8">
      <div className="text-4xl mb-2">
        <FontAwesomeIcon icon={faThermometerHalf} />
      </div>
      <div className="text-xl mb-2">Sensor-{sensorNumber}</div>
      <div className="flex justify-around w-full">
        <div className="cursor-pointer" onClick={handleExcelClick}>
          <div className="flex flex-col items-center">
            <PiMicrosoftExcelLogoFill className="text-xl mb-1 w-10 h-10" />
            <span>Excel</span>
          </div>
        </div>
        <div className="cursor-pointer" onClick={handlePdfClick}>
          <div className="flex flex-col items-center">
            <FaRegFilePdf className="text-xl mb-1 w-10 h-10" />
            <span>PDF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportCards = () => (
  <div className="flex flex-wrap justify-center">
    <SensorCard sensorNumber={1} />
    <SensorCard sensorNumber={2} />
    <SensorCard sensorNumber={3} />
    <SensorCard sensorNumber={4} />
    <SensorCard sensorNumber={5} />
    <SensorCard sensorNumber={6} />
    <SensorCard sensorNumber={7} />
    <SensorCard sensorNumber={8} />
  </div>
);

export default ReportCards;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faChartLine,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";


import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { FaRegFilePdf } from "react-icons/fa";

const SensorCard = ({ sensorNumber }) => (
  <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/4 m-2 flex flex-col items-center justify-center mt-8">
    <div className="text-4xl mb-2">
      <FontAwesomeIcon icon={faThermometerHalf} />
    </div>
    <div className="text-xl mb-2">Sensor-{sensorNumber}</div>
    <div className="flex justify-around w-full">
     <a>
     <div className="flex flex-col items-center">
        <PiMicrosoftExcelLogoFill icon={faChartLine} className="text-xl mb-1 w-10 h-10" />
        <span>Excel</span>
      </div>
     </a>
     <a>
     <div className="flex flex-col items-center">
        <FaRegFilePdf  icon={faFileAlt} className="text-xl mb-1 w-10 h-10" />
        <span>PDF</span>
      </div>
     </a>
    </div>
  </div>
);

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

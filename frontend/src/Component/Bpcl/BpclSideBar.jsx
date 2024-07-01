import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoBarChartOutline } from "react-icons/io5";
import { GrDocumentDownload } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";
import { LiaToolsSolid } from "react-icons/lia";

const BpclSideBar = () => {
  const [dashHover, setDashHover] = useState(false);
  const [graphHover, setGraphHover] = useState(false);
  const [reportHover, setReportHover] = useState(false);
  const [settingsHover, setSettingsHover] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);
  const location = useLocation();
  // const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href('/login');
  };

  return (
    <div className="flex flex-col bg-gray-600 h-screen text-gray-100">
      <Link
        to="/"
        className={`h-1/5 p-2 hover:bg-gray-800 duration-200 flex items-center ${
          location.pathname === "/displayMain" && "bg-gray-800"
        }`}
        onMouseEnter={() => setDashHover(true)}
        onMouseLeave={() => setDashHover(false)}
      >
        <div>
          <RxDashboard size={25} />
        </div>
        {dashHover && (
          <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
            Dashboard
          </div>
        )}
      </Link>

      <Link
        to="/Bpcl_Graph"
        className={`h-1/5 p-2 hover:bg-gray-800 duration-200 flex items-center ${
          location.pathname === "/displayGraph" && "bg-gray-800"
        }`}
        onMouseEnter={() => setGraphHover(true)}
        onMouseLeave={() => setGraphHover(false)}
      >
        <div>
          <IoBarChartOutline size={25} />
        </div>
        {graphHover && (
          <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
            Graphs
          </div>
        )}
      </Link>

      <Link
        to="/Bpcl_Report"
        className={`h-1/5 p-2 hover:bg-gray-800 duration-200 flex items-center ${
          location.pathname === "/displayReport" && "bg-gray-800"
        }`}
        onMouseEnter={() => setReportHover(true)}
        onMouseLeave={() => setReportHover(false)}
      >
        <div>
          <GrDocumentDownload size={25} />
        </div>
        {reportHover && (
          <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
            Reports
          </div>
        )}
      </Link>

      <Link
        to="/Bpcl_Settings"
        className={`h-1/5 p-2 hover:bg-gray-800 duration-200 flex items-center ${
          location.pathname === "/displaySettings" && "bg-gray-800"
        }`}
        onMouseEnter={() => setSettingsHover(true)}
        onMouseLeave={() => setSettingsHover(false)}
      >
        <div>
          <LiaToolsSolid size={25} />
        </div>
        {settingsHover && (
          <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
            Settings
          </div>
        )}
      </Link>

      <Link
      // to="/login"
        className={`h-1/5 p-2 hover:bg-gray-800 duration-200 flex items-center`}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
        onClick={handleLogout}
      >
        <div>
          <CiLogout size={25} />
        </div>
        {logoutHover && (
          <div className="absolute ml-9 bg-gray-600 p-1 rounded-full text-xs">
            Logout
          </div>
        )}
      </Link>
    </div>
  );
};

export default BpclSideBar;
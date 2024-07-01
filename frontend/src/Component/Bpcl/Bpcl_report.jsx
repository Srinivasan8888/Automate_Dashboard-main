import React from "react";
import Header from "./components/header";
import ReportCards from "./components/reportcard";
import { Tabs } from "flowbite-react";
import { FaChartArea } from "react-icons/fa";
import { LuScatterChart } from "react-icons/lu";
import Reportdatecomp from "./components/reportdatecomp";

const Bpcl_report = () => {
  return (
    <div>
      <Header />

      <Tabs aria-label="Default tabs" variant="default">
        <Tabs.Item active title="Date Report" icon={FaChartArea}>
          <Reportdatecomp/>
        </Tabs.Item>
        <Tabs.Item title="Report" icon={LuScatterChart}>
        <ReportCards />
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default Bpcl_report;

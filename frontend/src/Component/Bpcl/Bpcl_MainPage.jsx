import React from "react";
import Assets from "./components/assets";
import Header from "./components/header";
import WG12 from "./components/wg12";
import WG16 from "./components/wg16";
import LiveGraph from "./components/livegraph";

const Bpcl_MainPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div>
        <WG12 />
        <WG16 />
        <LiveGraph />
        <Assets />
      </div>
    </div>
  );
};

export default Bpcl_MainPage;

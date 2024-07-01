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
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-4xl mt-3">Vaccum Distillation Unit (VDU)</h1>
        </div>
        <WG12 />
        <WG16 />
        <LiveGraph />
        {/* <Assets /> */}
      </div>
    </div>
  );
};

export default Bpcl_MainPage;

import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Header from "./components/header";
import Graphcomp from "./components/graphcomp";

const Bpcl_Graph = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow overflow-y-auto">
        <div>
          <a className="flex flex-col mx-4 mt-3 font-medium text-black text-xl">
            WaveGuide1 - 12Inch
          </a>
          <div className="flex flex-col mt-5 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <Graphcomp />
              </div>
              <div>
                <Graphcomp />
              </div>
              <div>
                <Graphcomp />
              </div>
              <div>
                <Graphcomp />
              </div>
            </div>
          </div>
        </div>
        <div>
          <a className="flex flex-col mx-4 mt-3 font-medium text-black text-xl">
            WaveGuide1 - 16Inch
          </a>
          <div className="flex flex-col mt-5 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div>
                <Graphcomp />
              </div>
              <div>
                <Graphcomp />
              </div>
              <div>
                <Graphcomp />
              </div>
              <div>
                <Graphcomp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bpcl_Graph;

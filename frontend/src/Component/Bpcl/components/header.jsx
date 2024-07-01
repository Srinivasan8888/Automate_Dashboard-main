import React from "react";
import xymalogo from '../img/logo.png'
import bpcllogo from '../img/bpcl.png'


const Header = () => {
  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <img
            className="h-16 w-auto"
            src={xymalogo}
            alt="xyma logo"
          />
          {/* <a href="#" className="font-medium p-1.5 text-black">
            XYMA Analytics
          </a> */}
        </div>
        <div className="flex lg:flex-1 lg:justify-end">
        <img
            className="h-20 w-auto"
            src={bpcllogo}
            alt="bpcl logo"
          />
          {/* <a href="#" className="font-medium p-1.5 text-black">
           BPCL
          </a> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";

function CreditCard() {
  return (
    <>
      <div className=" card relative font-[2rem] w-[85%] h-[200px] p-4 flex flex-col gap-1 overflow-hidden max-xl:h-[200px] max-xl:gap-1 max-lg:w-full">
        {/* Blobs  */}
        <div className="absolute left-[10%] w-full bottom-[50%] ">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-blue-950/50"
              d="M54.3,-47.2C60.5,-35.6,48.7,-13.6,42.5,8.2C36.4,29.9,35.7,51.4,24.9,59.7C14.1,67.9,-6.9,63,-27.6,54.2C-48.3,45.5,-68.7,32.9,-77.1,12.9C-85.4,-7.2,-81.7,-34.7,-66.8,-48.2C-52,-61.8,-26,-61.5,-1,-60.7C24.1,-59.9,48.1,-58.8,54.3,-47.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        <div className="absolute left-[50%] w-full top-[9%] ">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-blue-950/50"
              d="M54.3,-47.2C60.5,-35.6,48.7,-13.6,42.5,8.2C36.4,29.9,35.7,51.4,24.9,59.7C14.1,67.9,-6.9,63,-27.6,54.2C-48.3,45.5,-68.7,32.9,-77.1,12.9C-85.4,-7.2,-81.7,-34.7,-66.8,-48.2C-52,-61.8,-26,-61.5,-1,-60.7C24.1,-59.9,48.1,-58.8,54.3,-47.2Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
        {/* Data */}
        <div className="flex flex-col gap-[1px]">
          <span className="text-md  text-slate-400">Full Name</span>
          <span className="text-xl  text-white font-bold bigText">
            Aymen Azougar
          </span>
        </div>
        <div className="flex flex-col gap-[1px]">
          <span className="text-md text-slate-400">Balance</span>
          <span className="text-2xl text-white font-bold bigText ">
            $ 5,875
          </span>
        </div>
        <div className="flex flex-col gap-[1px]">
          <span className="text-md text-slate-400">Family</span>
          <span className="text-xl text-white font-bold bigText ">
            Azougar Family
          </span>
        </div>
      </div>
    </>
  );
}

export default CreditCard;

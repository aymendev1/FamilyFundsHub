import React from "react";

function TotalBalanceCard() {
  return (
    <div className=" bg-white rounded-lg relative font-[2rem] w-full h-[250px] p-4 flex flex-col gap-4 overflow-hidden max-xl:h-[200px] max-xl:gap-1 max-lg:w-full">
      {/* Blobs  */}
      <div className="absolute left-[50%] w-full bottom-[25%] ">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            className="fill-slate-200/50"
            d="M54.3,-47.2C60.5,-35.6,48.7,-13.6,42.5,8.2C36.4,29.9,35.7,51.4,24.9,59.7C14.1,67.9,-6.9,63,-27.6,54.2C-48.3,45.5,-68.7,32.9,-77.1,12.9C-85.4,-7.2,-81.7,-34.7,-66.8,-48.2C-52,-61.8,-26,-61.5,-1,-60.7C24.1,-59.9,48.1,-58.8,54.3,-47.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div className="absolute right-[60%] w-full top-[60%] ">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            className="fill-slate-300/50"
            d="M54.3,-47.2C60.5,-35.6,48.7,-13.6,42.5,8.2C36.4,29.9,35.7,51.4,24.9,59.7C14.1,67.9,-6.9,63,-27.6,54.2C-48.3,45.5,-68.7,32.9,-77.1,12.9C-85.4,-7.2,-81.7,-34.7,-66.8,-48.2C-52,-61.8,-26,-61.5,-1,-60.7C24.1,-59.9,48.1,-58.8,54.3,-47.2Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <span className="text-xl  font-black  text-blue-950">Total Balance</span>
      <span className="text-3xl  font-black  text-blue-800 bigText">
        $ 4,567.12
      </span>
      <div className="flex flex-row gap-2 w-full justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm  text-slate-700">Income This Month</span>
          <span className="text-base text-emerald-700 font-black bigText ">
            $4,567.12
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm  text-slate-700">Spent This month</span>
          <span className="text-base text-violet-800 font-black bigText ">
            $4,000.12
          </span>
        </div>
      </div>
      <button className="bg-blue-950 hover:bg-blue-900 hover:delay-100 transition rounded-lg p-3 text-slate-200 font-medium text-base">
        View More
      </button>
    </div>
  );
}

export default TotalBalanceCard;

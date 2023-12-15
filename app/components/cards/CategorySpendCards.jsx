import React from "react";
import { FaChartPie } from "react-icons/fa6";
function CategorySpendCards() {
  return (
    <>
      {/* First Card */}
      <div className="flex flex-1 h-full w-full flex-col p-4 gap-3 rounded-lg bg-white ">
        <div className="w-[40px] h-[40px] rounded-lg bg-blue-100 flex items-center justify-center">
          <FaChartPie className="text-blue-950 h-[20px] w-[20px]" />
        </div>
        <span className="text-lg  font-black  text-blue-950">Spending 01</span>
        {/* Progress Chart */}
        <div className="flex flex-col gap-3">
          <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-100">
            <div
              class="bg-blue-950 h-2 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
          <span className="text-sm font-black text-slate-700">
            $50 from{" "}
            <span className="text-sm font-black text-blue-950">$1000</span>
          </span>
        </div>
      </div>
      {/*    Second Card */}
      <div className="flex flex-1 h-full w-full flex-col p-4 gap-3 rounded-lg bg-white ">
        <div className="w-[40px] h-[40px] rounded-lg bg-violet-100 flex items-center justify-center">
          <FaChartPie className="text-violet-950 h-[20px] w-[20px]" />
        </div>
        <span className="text-lg  font-black  text-blue-950">Spending 02</span>
        {/* Progress Chart */}
        <div className="flex flex-col gap-3">
          <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-100">
            <div
              class="bg-violet-950 h-2 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <span className="text-sm font-black text-slate-700">
            $600 from{" "}
            <span className="text-sm font-black text-violet-950">$1000</span>
          </span>
        </div>
      </div>
      {/* Third Card */}
      <div className="flex flex-1 h-full w-full flex-col p-4 gap-3 rounded-lg bg-white ">
        <div className="w-[40px] h-[40px] rounded-lg bg-emerald-100 flex items-center justify-center">
          <FaChartPie className="text-emerald-950 h-[20px] w-[20px]" />
        </div>
        <span className="text-lg  font-black  text-blue-950">Spending 03</span>
        {/* Progress Chart */}
        <div className="flex flex-col gap-3">
          <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-100">
            <div
              class="bg-emerald-950 h-2 rounded-full"
              style={{ width: "10%" }}
            ></div>
          </div>
          <span className="text-sm font-black text-slate-700">
            $200 from{" "}
            <span className="text-sm font-black text-emerald-950">$2000</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default CategorySpendCards;

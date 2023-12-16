"use client";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
function SavingsCardLastMonth() {
  return (
    <div className="flex bg-white rounded-lg p-4 flex-row items-center">
      <div className="flex flex-col flex-1 gap-3">
        <span className="text-xl  font-black  text-emerald-800">
          Congratulations !
        </span>
        <span class="text-sm font-black  text-slate-700">
          You have saved $700 last month !
        </span>
      </div>
      <button
        className="bg-blue-950 hover:bg-blue-600 ease-out duration-500 transition-all rounded-lg p-3 text-slate-200 font-medium text-base flex flex-row items-center  justify-center"
        onClick={() => {
          router.push("/");
        }}
      >
        <span className="text-sm flex-1">See Details</span>
        <FiArrowUpRight className="min-w-[20px] h-[20px] " />
      </button>
    </div>
  );
}

export default SavingsCardLastMonth;

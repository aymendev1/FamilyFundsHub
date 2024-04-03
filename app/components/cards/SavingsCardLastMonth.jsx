"use client";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
function SavingsCardLastMonth(props) {
  const { Loading, UserSavingLastMonth } = props;
  return (
    <div className="flex bg-white rounded-lg p-4 flex-row items-center">
      <div className="flex flex-col flex-1 gap-3">
        <span
          className={`text-xl  font-black ${
            !UserSavingLastMonth?.total ? "text-red-800" : "text-emerald-800"
          } `}
        >
          {!UserSavingLastMonth?.total ? "Oups :(" : "Congratulations !"}
        </span>
        <span className="text-sm font-black  text-slate-700">
          You have saved{" "}
          {Loading
            ? "..."
            : `$ ${Number(UserSavingLastMonth?.total || 0)
                .toFixed(2)
                .toLocaleString()}`}{" "}
          last month !
        </span>
      </div>
      <button
        className="bg-blue-950 hover:bg-blue-600 ease-out duration-500 transition-all rounded-lg p-3 text-slate-200 font-medium text-base flex flex-row items-center  justify-center"
        onClick={() => {
          window.location.replace("/savings/history");
        }}
      >
        <span className="text-sm flex-1">See Details</span>
        <FiArrowUpRight className="min-w-[20px] h-[20px] " />
      </button>
    </div>
  );
}

export default SavingsCardLastMonth;

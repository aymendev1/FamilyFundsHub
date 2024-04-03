"use client";
import { FiArrowUpRight } from "react-icons/fi";
import { MdSavings } from "react-icons/md";
import React from "react";
function SavingsCategories(props) {
  const { data, isFamily } = props;

  return (
    <div className="w-[40%] rounded-lg bg-white flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between gap-2 w-full">
        <div className="flex flex-col gap-2">
          <span className="text-xl  font-black  text-blue-950">
            Active Saving Goals
          </span>
        </div>
        <button
          className="bg-blue-950 hover:bg-blue-600 ease-out h-fit duration-500 transition-all rounded-lg p-3 text-slate-200 font-medium text-sm flex flex-row items-center gap-2 justify-center"
          onClick={() => {
            window.open(
              `/${isFamily ? "familySavings" : "savings"}/goals`,
              "_blank"
            );
          }}
        >
          <span className="flex-1">View all </span>
          <FiArrowUpRight className="min-w-[15px] h-[15px] " />
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full overflow-y-auto h-full">
        {data?.map((item, i) => {
          return (
            <div
              key={i}
              className="flex flex-row gap-2 justify-between items-center p-2 hover:rounded hover:cursor-pointer hover:bg-blue-50"
              onClick={() =>
                window.open(
                  `/${isFamily ? "familySavings" : "savings"}/${item.SavingID}`,
                  "_blank"
                )
              }
            >
              <div
                className={`w-[40px] h-[40px] rounded-lg bg-indigo-100 flex items-center justify-center`}
              >
                <MdSavings className={`text-indigo-950 h-[20px] w-[20px]`} />
              </div>
              <span className="text-base  font-semibold  text-blue-950 flex-1">
                {item.Description}
              </span>
              <span className="text-base  font-semibold  text-blue-950">
                $ {item.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavingsCategories;

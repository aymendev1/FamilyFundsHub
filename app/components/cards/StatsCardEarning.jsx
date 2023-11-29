import React from "react";
import { BanknotesIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/solid";
function StatsCardEarning(props) {
  return (
    <>
      {" "}
      <div className="flex flex-row gap-4 px-6 py-4 h-[90px] w-[85%] max-lg:w-full rounded-xl bg-emerald-100">
        {/* Icon */}
        <div className="bg-emerald-700 text-slate-100 p-4 w-[58px] h-[58px] flex items-center justify-center rounded-xl">
          <BanknotesIcon className="h-10 w-10 max-xl:h-8 max-xl:w-8 max-lg:h-6 max-lg:w-6" />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-1 max-xl:gap-1 justify-center">
          <span className="text-md font-semibold text-emerald-950">Income</span>
          <span className="text-2xl text-emerald-950 font-black bigText ">
            $ 11,5K
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-4 px-6 py-4 h-[90px] w-[85%] max-lg:w-full rounded-xl bg-violet-100">
        {/* Icon */}
        <div className="bg-violet-700 text-slate-100 p-4 w-[58px] h-[58px] flex items-center justify-center rounded-xl">
          <ArrowTrendingUpIcon className="h-10 w-10 max-xl:h-8 max-xl:w-8 max-lg:h-6 max-lg:w-6" />
        </div>
        {/* Text */}
        <div className="flex flex-col gap-1  xl:gap-1 justify-center">
          <span className="text-md font-semibold text-violet-950">Earning</span>
          <span className="text-2xl text-violet-950 font-black bigText ">
            $ 9,5K
          </span>
        </div>
      </div>
    </>
  );
}

export default StatsCardEarning;
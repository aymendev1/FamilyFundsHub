import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
function authLayout({ children }) {
  return (
    <div className="flex h-screen min-w-full flex-1 flex-row max-md:flex-col">
      <div className="illustration w-2/4 flex items-center justify-center max-md:w-full max-md:h-full max-md:p-10">
        <div className="flex flex-col w-3/4 h-3/4 max-md:h-fit px-14 py-14 gap-5 max-md:p-5 max-md:gap-2 ">
          <div className="flex flex-col gap-2 bigText max-md:gap-1">
            <span className="text-7xl font-bold text-slate-50 flex items-center gap-2 max-lg:text-5xl max-md:text-3xl">
              <PlayIcon className="h-14 w-14 lg:h-10 lg:w-10 md:w-8 max-md:w-8 max-md:h-8" />
              Family{" "}
            </span>
            <span className="text-7xl font-bold text-slate-50 max-lg:text-5xl max-md:text-3xl">
              Funding Hub{" "}
            </span>
            <span className="text-7xl font-bold text-slate-50 max-lg:text-5xl max-md:text-3xl">
              for money{" "}
            </span>
            <span className="text-7xl font-bold  text-blue-950 max-lg:text-5xl max-md:text-3xl">
              management .{" "}
            </span>
          </div>
          <div className="flex flex-col gap-2 bigText max-md:gap-1">
            <span className="text-lg text-slate-50 lg:text-base max-md:text-sm">
              You will never spend more than expected.
            </span>
            <span className="text-lg text-slate-50 lg:text-base max-md:text-sm">
              But you will save spend more.
            </span>
          </div>
        </div>
      </div>
      <div className="w-2/4 px-20 py-16 flex flex-col gap-5 md:px-14 md:py-18 max-md:w-full">
        {children}
      </div>
    </div>
  );
}

export default authLayout;

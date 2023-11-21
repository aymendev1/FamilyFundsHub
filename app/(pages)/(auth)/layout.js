import React from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
function authLayout({ children }) {
  return (
    <div className="flex h-full min-w-full flex-1 flex-row ms:flex-col">
      <div className="illustration w-2/4 flex items-center justify-center">
        <div className="flex flex-col w-3/4 h-3/4 px-14 py-14 gap-5 ">
          <div className="flex flex-col gap-2 bigText ">
            <span className="xl:text-7xl font-bold text-slate-50 flex items-center gap-2 lg:text-5xl md:text-3xl">
              <PlayIcon className="h-14 w-14 lg:h-10 lg:w-10 md:w-8 md:w-8" />
              Family{" "}
            </span>
            <span className="xl:text-7xl font-bold text-slate-50 lg:text-5xl md:text-3xl">
              Funding Hub{" "}
            </span>
            <span className="xl:text-7xl font-bold text-slate-50 lg:text-5xl md:text-3xl">
              for money{" "}
            </span>
            <span className="xl:text-7xl font-bold  text-blue-950 lg:text-5xl md:text-3xl">
              management .{" "}
            </span>
          </div>
          <div className="flex flex-col gap-2 bigText">
            <span className="text-lg text-slate-50 lg:text-base md:text-sm">
              You will never spend more than expected.
            </span>
            <span className="text-lg text-slate-50 lg:text-base md:text-sm">
              But you will save spend more.
            </span>
          </div>
        </div>
      </div>
      <div className="w-2/4 px-20 py-16 flex flex-col gap-5 md:px-14 md:py-18">
        {children}
      </div>
    </div>
  );
}

export default authLayout;

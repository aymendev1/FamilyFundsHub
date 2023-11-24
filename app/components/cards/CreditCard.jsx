import React from "react";
import {
  Chart,
  CurrencyDollarIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/solid";
function CreditCard() {
  return (
    <>
      <div className="relative">
        <CurrencyEuroIcon className="absolute  animate-pulse h-[200px] right-[30%] fill-rose-700" />
      </div>
      <div className=" card relative font-[2rem] w-[400px] h-[200px] p-4 flex flex-col gap-2 overflow-hidden">
        <div className="flex flex-col gap-[1px]">
          <span className="text-sm text-slate-400">Full Name</span>
          <span className="text-lg text-white font-bold bigText">
            Aymen Azougar
          </span>
        </div>
        <div className="flex flex-col gap-[1px]">
          <span className="text-sm text-slate-400">Balance</span>
          <span className="text-2xl text-white font-bold bigText ">
            $ 5,875
          </span>
        </div>
        <div className="flex flex-col gap-[1px]">
          <span className="text-sm text-slate-400">Family</span>
          <span className="text-lg text-white font-bold bigText ">
            Azougar Family
          </span>
        </div>
      </div>
    </>
  );
}

export default CreditCard;

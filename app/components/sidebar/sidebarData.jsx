import React from "react";
import Link from "next/link";
import { FaMoneyBillTransfer,FaUsers,FaArrowRightFromBracket } from "react-icons/fa6";
import { MdSavings,MdAccountBalanceWallet,MdSettings,MdHome } from "react-icons/md";
function sidebarData(props) {
  const Data = [
    { icon: MdHome, text: "Dashboard", link: "/dashboard" },
    { icon: MdAccountBalanceWallet, text: "Balance", link: "/balance" },
    { icon: MdSavings, text: "Savings", link: "/savings" },
    { icon: FaMoneyBillTransfer, text: "Expenses", link: "/expenses" },
    { icon: FaUsers, text: "Family", link: "#" },
    { icon: MdSettings, text: "Settings", link: "/settings" },
  ];
  return (
    <>
      <div className="flex-1 w-full">
        {Data.map((data, index) => {
          return (
            <div
              key={index}
              className=" flex items-center mt-2 p-4 gap-2 h-[3.5rem] rounded-lg cursor-pointer text-blue-950 hover:bg-blue-400 hover:text-white transition-all duration-300"
            >
              <data.icon className="min-w-[25px] h-[25px] " />
              <Link className={`text-[1rem] font-medium `} href={data.link}>
                {data.text}
              </Link>
            </div>
          );
        })}
      </div>
      {/* Logout button */}
      <div className=" flex items-center mt-2 p-4 gap-2 h-[3.5rem] rounded-lg cursor-pointer text-blue-950 hover:bg-blue-400 hover:text-white transition-all duration-300">
        <FaArrowRightFromBracket className="min-w-[25px] h-[25px] " />
        <Link href="/logout" className={` font-medium `}>
          Log out
        </Link>
      </div>
    </>
  );
}

export default sidebarData;

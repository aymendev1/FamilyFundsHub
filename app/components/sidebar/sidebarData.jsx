import React from "react";
import Link from "next/link";
import {
  FaMoneyBillTransfer,
  FaUsers,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import {
  MdSavings,
  MdAccountBalanceWallet,
  MdSettings,
  MdHome,
} from "react-icons/md";
function sidebarData(props) {
  const { toggle } = props;
  const Data = [
    { icon: MdHome, text: "Dashboard", link: "/dashboard" },
    { icon: MdAccountBalanceWallet, text: "Balance", link: "/balance" },
    { icon: MdSavings, text: "Savings", link: "/savings" },
    { icon: FaMoneyBillTransfer, text: "Expenses", link: "/transactions" },
    { icon: FaUsers, text: "Profile", link: "/profile" },
    { icon: MdSettings, text: "Settings", link: "/settings" },
  ];
  return (
    <>
      <div className="flex-1 w-full flex flex-col :items-center">
        {Data.map((data, index) => {
          return (
            <div
              key={index}
              className={`flex flex-row
                items-start mt-2 p-4 max-md:p-2 gap-2 h-[3.5rem] rounded-lg cursor-pointer text-blue-950 hover:bg-blue-400 hover:text-white transition-all duration-300`}
            >
              <data.icon className="min-w-[25px] h-[25px] " />
              <Link
                className={`${
                  toggle ? "max-md:hidden" : "max-md:block"
                } text-[1rem] font-medium `}
                href={data.link}
              >
                {data.text}
              </Link>
            </div>
          );
        })}
      </div>
      {/* Logout button */}
      <div className=" flex items-center mt-2 p-4 gap-2 h-[3.5rem] rounded-lg cursor-pointer text-blue-950 hover:bg-blue-400 hover:text-white transition-all duration-300">
        <FaArrowRightFromBracket className="min-w-[25px] h-[25px] " />
        <Link
          href="/logout"
          className={`${
            toggle ? "max-md:hidden" : "max-md:block"
          } font-medium `}
        >
          Log out
        </Link>
      </div>
    </>
  );
}

export default sidebarData;

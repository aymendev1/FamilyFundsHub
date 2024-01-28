import React from "react";
import { useRouter } from "next/navigation";
import {
  FaMoneyBillTransfer,
  FaUsers,
  FaArrowRightFromBracket,
} from "react-icons/fa6";
import { FaUsers as FaUsers2 } from "react-icons/fa";
import {
  MdSavings,
  MdAccountBalanceWallet,
  MdSettings,
  MdHome,
} from "react-icons/md";
import { signOut } from "next-auth/react";
function sidebarData(props) {
  const { toggle, username } = props;
  const router = useRouter();
  const Data = [
    { icon: MdHome, text: "Dashboard", link: "/dashboard" },
    { icon: MdAccountBalanceWallet, text: "Balance", link: "/balance" },
    { icon: MdSavings, text: "Savings", link: "/savings" },
    { icon: FaUsers2, text: "Family Savings", link: "/familySavings" },
    { icon: FaMoneyBillTransfer, text: "Expenses", link: "/transactions" },
    { icon: FaUsers, text: "Profile", link: `/profile/${username}` },
    { icon: MdSettings, text: "Settings", link: "/settings" },
  ];
  const handleLogout = () => {
    signOut();
  };
  return (
    <>
      <div className="flex-1 w-full flex flex-col :items-center">
        {Data.map((data, index) => {
          return (
            <div
              key={index}
              onClick={() => router.push(data.link)}
              className={`flex flex-row
                items-start mt-2 p-4 max-md:p-2 gap-2 h-[3.5rem] rounded-lg cursor-pointer text-blue-950 hover:bg-blue-400 hover:text-white transition-all duration-300`}
            >
              <data.icon className="min-w-[25px] h-[25px] " />
              <span
                className={`${
                  toggle ? "max-md:hidden" : "max-md:block"
                } text-[1rem] font-medium `}
              >
                {data.text}
              </span>
            </div>
          );
        })}
      </div>
      {/* Logout button */}
      <div
        onClick={handleLogout}
        className=" flex items-center mt-2 p-4 gap-2 h-[3.5rem] rounded-lg cursor-pointer text-blue-950 hover:bg-blue-400 hover:text-white transition-all duration-300"
      >
        <FaArrowRightFromBracket className="min-w-[25px] h-[25px] " />
        <span
          className={`${
            toggle ? "max-md:hidden" : "max-md:block"
          } font-medium `}
        >
          Log out
        </span>
      </div>
    </>
  );
}

export default sidebarData;

import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
function sidebarData(props) {
  const Data = [
    { icon: HomeIcon, text: "Dashboard", link: "/dashboard" },
    { icon: CreditCardIcon, text: "To decide", link: "#" },
    { icon: CreditCardIcon, text: "To decide", link: "#" },
    { icon: CreditCardIcon, text: "To decide", link: "#" },
    { icon: CreditCardIcon, text: "To decide", link: "#" },
    { icon: Cog6ToothIcon, text: "Settings", link: "/settings" },
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
        <ArrowRightOnRectangleIcon className="min-w-[25px] h-[25px] " />
        <Link href="/logout" className={` font-medium `}>
          Log out
        </Link>
      </div>
    </>
  );
}

export default sidebarData;

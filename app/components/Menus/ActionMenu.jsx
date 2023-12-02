"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
function ActionMenu() {
  const router = useRouter();
  const MenuList = [
    { title: "View 01", link: "/link01" },
    { title: "View 02", link: "/link02" },
    { title: "View 03", link: "/link02" },
    { title: "View 04", link: "/link02" },
    { title: "View 05", link: "/link02" },
    { title: "View 06", link: "/link02" },
  ];
  return (
    <div className="flex flex-col gap-4 w-[30%] h-[631px] max-lg:w-full  bg-white rounded-lg p-4">
      <span class="text-xl  font-black  text-blue-950">Quick Links</span>
      {MenuList.map((item, i) => {
        return (
          <button
            key={i}
            className="bg-blue-950 hover:bg-blue-600 ease-out duration-500 transition-all rounded-lg p-3 text-slate-200 font-medium text-base flex flex-row items-center  justify-center"
            onClick={() => {
              router.push(item.link);
            }}
          >
            <span className="flex-1">{item.title}</span>
            <FiArrowUpRight className="min-w-[25px] h-[25px] " />
          </button>
        );
      })}
    </div>
  );
}

export default ActionMenu;

"use client";
import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import UserProfile from "./UserProfile";
import SidebarData from "./sidebarData";
function sidebar() {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    console.log(!toggle);
  };
  return (
    <div
      className={`${
        toggle ? "w-[5.8rem] " : "w-[20rem] "
      } flex flex-col justify-between bg-white h-[96%] rounded-3xl ml-6 p-4 border transition-all duration-500 border-solid border-white relative`}
    >
      <UserProfile toggle={toggle} />
      <SidebarData toggle={toggle} />
      <button
        className={`${
          toggle ? "left-[4.5rem] " : "left-[18.7rem] "
        } absolute top-[40%]  transition-all duration-500 flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer`}
        onClick={handleToggle}
      >
        <ChevronLeftIcon
          className={`${
            toggle ? "rotate-180" : ""
          } text-3xl text-blue-950 transition-all duration-300 `}
        />
      </button>
    </div>
  );
}

export default sidebar;

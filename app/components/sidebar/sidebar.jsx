"use client";
import UserProfile from "./UserProfile";
import SidebarData from "./sidebarData";
function sidebar() {
  return (
    <div
      className={`
        w-[20rem] 
      flex flex-col justify-between bg-white h-[96%] rounded-3xl ml-6 p-4 border transition-all duration-500 border-solid border-white relative`}
    >
      <UserProfile />
      <SidebarData />
    </div>
  );
}

export default sidebar;

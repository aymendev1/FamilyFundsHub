import React from "react";
import ProfileComponent from "@/app/components/profile/ProfileComponent";
import LatestFamilySpend from "@/app/components/cards/LatestFamilySpend";
function page() {
  return (
    <>
      <div className="pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">Profile</span>
      </div>
      <div className="flex flex-row gap-10 max-lg:gap-6 max-sm:gap-4">
        <ProfileComponent />
        <LatestFamilySpend />
      </div>
    </>
  );
}

export default page;

import React from "react";
import ProfileComponent from "@/app/components/profile/ProfileComponent";
function page({ params }) {
  const { username } = params;
  return (
    <>
      <div className="pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">Profile</span>
      </div>
      <div className="flex flex-row max-md:flex-col gap-10 max-lg:gap-6 max-sm:gap-4">
        <ProfileComponent username={username} />
      </div>
    </>
  );
}

export default page;

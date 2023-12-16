"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
} from "react-icons/md";
function ProfileComponent() {
  const router = useRouter();
  const PathName = usePathname();
  const FamilyMembers = [
    {
      userID: 1,
      role: "Child",
      fullName: "Random Name",
      ProfilePicture: "/boyDefaultPP.jpg",
    },
    {
      userID: 2,
      role: "Parent",
      fullName: "Random Name",
      ProfilePicture: "/fatherDefaultPP.jpg",
    },
    {
      userID: 3,
      role: "Parent",
      fullName: "Random Name",
      ProfilePicture: "/womenDefaultPP.jpg",
    },
    {
      userID: 4,
      role: "Child",
      fullName: "Random Name",
      ProfilePicture: "/userProfileTest.jpg",
    },
    {
      userID: 5,
      role: "Child",
      fullName: "Random Name",
      ProfilePicture: "/boyDefaultPP.jpg",
    },
    {
      userID: 6,
      role: "Child",
      fullName: "Random Name",
      ProfilePicture: "/fatherDefaultPP.jpg",
    },
    {
      userID: 7,
      role: "Child",
      fullName: "Random Name",
      ProfilePicture: "/womenDefaultPP.jpg",
    },
    {
      userID: 8,
      role: "Child",
      fullName: "Random Name",
      ProfilePicture: "/userProfileTest.jpg",
    },
  ];
  const handleClickProfile = () => {
    router.push(`${PathName}/edit`);
  };
  return (
    <div className="w-[70%] max-md:w-full flex flex-col gap-3 rounded-lg">
      {/* Cover Image */}
      <img
        src="/defaultCoverImage.jpg"
        className="object-cover w-full h-[200px] overflow-hidden rounded-t-xl rou"
      />
      <div className="flex flex-row gap-5 relative">
        <div>
          <img
            src="/userProfileTest.jpg"
            alt="Profile Picture"
            className="rounded-full object-cover h-[160px] w-[160px] max-lg:w-[130px] max-lg:h-[130px] absolute bottom-0 max-lg:bottom-10 left-[10px]"
          />
        </div>
        <div className="flex flex-col gap-3 w-full  pl-[160px] max-lg:pl-[0px] pr-4 max-lg:pr-2">
          {/* Profile Name */}
          <div className="flex flex-row justify-between items-center w-full max-lg:pl-[130px]">
            <div className="flex flex-col gap-2  ">
              <span className="text-2xl  font-black bigText text-blue-950 ">
                Aymen Azougar
              </span>
              <span className="text-base max-lg:text-sm font-black text-slate-500">
                Member in Azougar's Family
              </span>
            </div>
            <button
              onClick={handleClickProfile}
              className="bg-blue-950/80 hover:bg-blue-950 h-10 ease-out duration-500 transition-all rounded-lg p-3 text-slate-200 font-medium text-base max-lg:text-sm flex flex-row items-center  justify-center"
            >
              Edit Profile
            </button>
          </div>
          {/* Profile Details */}
          <div className="flex flex-row justify-between w-full gap-2 ">
            <div className="flex flex-row gap-2 max-lg:gap-1 items-center">
              <MdOutlineLocationOn className="min-w-[20px] h-[20px] text-blue-900 " />
              <span className="text-sm font-black text-blue-950">
                Warsaw,Poland
              </span>
            </div>
            <div className="flex flex-row gap-2 max-lg:gap-1 items-center">
              <MdOutlineEmail className="min-w-[20px] h-[20px] text-blue-900 " />
              <span className="text-sm font-black text-blue-950">
                test@gmail.com
              </span>
            </div>
            <div className="flex flex-row gap-2 max-lg:gap-1 items-center">
              <MdOutlineLocalPhone className="min-w-[20px] h-[20px] text-blue-900 " />
              <span className="text-sm font-black text-blue-950">
                +48 XXX XXX XXX
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Family Members */}
      <div className="bg-white flex flex-col rounded-xl p-4 gap-7 mt-3">
        <span className="text-xl  font-black  text-blue-950">
          Family Members
        </span>
        <div className="flex flex-col  gap-3">
          {FamilyMembers.map((member, i) => {
            return (
              <div key={i} className="flex flex-row gap-2 items-center">
                <img
                  src={member.ProfilePicture}
                  alt={member.fullName}
                  className="h-[50px] w-[50px] object-cover rounded-lg"
                />
                <span className="text-base font-black text-blue-950">
                  {member.fullName}
                </span>
                <span className="text-right flex-1 text-base text-slate-500">
                  {member.role}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;

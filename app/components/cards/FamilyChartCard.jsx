import React from "react";
import Image from "next/image";
function FamilyChartCard() {
  return (
    <div className="flex flex-col gap-4 w-[30%] h-[631px] max-lg:w-full  bg-white rounded-lg p-4">
      <div>
        <span className="text-xl  font-black  text-blue-950">
          Family Members
        </span>
      </div>
      <div className="flex justify-between flex-row items-center w-full">
        <span className="text-md  text-slate-700">Parents : </span>
        <div className="flex flex-col items-center gap-2 justify-center">
          <Image
            src="/fatherDefaultPP.jpg"
            alt="Profile Picture"
            width="70"
            height="70"
            className=" rounded-full object-cover"
          />
          <span>Father's Name</span>
        </div>
        <div className="flex flex-col items-center gap-2 justify-center">
          {" "}
          <Image
            src="/womenDefaultPP.jpg"
            alt="Profile Picture"
            width="70"
            height="70"
            className=" rounded-full object-cover"
          />
          <span>Mother's Name</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 overflow-scroll overflow-x-hidden scroll-smooth familyChartCard">
        <span className="text-md  text-slate-700">Children : </span>
        <div className="flex flex-row gap-4 items-center ">
          <Image
            src="/boyDefaultPP.jpg"
            width="60"
            height="60"
            className="rounded-full object-cover"
            alt="Child Profile"
          />
          <span>Child'Name</span>
        </div>
        <div className="flex flex-row gap-4 items-center ">
          <Image
            src="/boyDefaultPP.jpg"
            width="60"
            height="60"
            className="rounded-full object-cover"
            alt="Child Profile"
          />
          <span>Child'Name</span>
        </div>
        <div className="flex flex-row gap-4 items-center ">
          <Image
            src="/boyDefaultPP.jpg"
            width="60"
            height="60"
            className="rounded-full object-cover"
            alt="Child Profile"
          />
          <span>Child'Name</span>
        </div>
        <div className="flex flex-row gap-4 items-center ">
          <Image
            src="/boyDefaultPP.jpg"
            width="60"
            height="60"
            className="rounded-full object-cover"
            alt="Child Profile"
          />
          <span>Child'Name</span>
        </div>
        <div className="flex flex-row gap-4 items-center ">
          <Image
            src="/boyDefaultPP.jpg"
            width="60"
            height="60"
            className="rounded-full object-cover"
            alt="Child Profile"
          />
          <span>Child'Name</span>
        </div>
        <div className="flex flex-row gap-4 items-center ">
          <Image
            src="/boyDefaultPP.jpg"
            width="60"
            height="60"
            className="rounded-full object-cover"
            alt="Child Profile"
          />
          <span>Child'Name</span>
        </div>
        <div className="flex flex-row gap-4 items-center ">
          <Image
            src="/boyDefaultPP.jpg"
            width="60"
            height="60"
            className="rounded-full object-cover"
            alt="Child Profile"
          />
          <span>Child'Name</span>
        </div>
      </div>
    </div>
  );
}

export default FamilyChartCard;

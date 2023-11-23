import React from "react";
import Image from "next/image";
function UserProfile(props) {
  const { toggle } = props;
  return (
    <div
      className={`flex gap-5 items-center ${
        toggle
          ? " bg-none transition-all duration-300 delay-200"
          : " bg-white rounded-xl p-2"
      }`}
    >
      {/*    Profile Picture */}
      <div className="min-w-[3.5rem] h-[3.5rem]">
        <Image
          src="/userProfileTest.jpg"
          alt="Profile Picture"
          width="60"
          height="60"
          className="w-full h-full rounded-full object-cover"
        />{" "}
      </div>
      {/* Profile Name */}
      <div className={`flex flex-col ${toggle ? " opacity-0" : " delay-100"}`}>
        <span className="text-xl  font-black  text-blue-950 ">
          {" "}
          Aymen Azougar
        </span>
        <span className="text-[0.75rem] text-slate-500">test@gmail.com</span>
      </div>
    </div>
  );
}

export default UserProfile;
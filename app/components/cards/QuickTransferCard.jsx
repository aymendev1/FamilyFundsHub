"use client";
import { useState } from "react";
import Image from "next/image";
function QuickTransferCard() {
  const [selectedUser, setSelectedUser] = useState("");
  const [AmountToSent, setAmountToSent] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const FamilyMembers = [
    { userID: 1, ProfilePicture: "/boyDefaultPP.jpg" },
    { userID: 2, ProfilePicture: "/fatherDefaultPP.jpg" },
    { userID: 3, ProfilePicture: "/womenDefaultPP.jpg" },
    { userID: 4, ProfilePicture: "/userProfileTest.jpg" },
    { userID: 5, ProfilePicture: "/boyDefaultPP.jpg" },
    { userID: 6, ProfilePicture: "/fatherDefaultPP.jpg" },
    { userID: 7, ProfilePicture: "/womenDefaultPP.jpg" },
    { userID: 8, ProfilePicture: "/userProfileTest.jpg" },
  ];
  const handleImageClick = (event, member) => {
    const image = event.target;
    if (!isSelected) {
      image.classList.add("opacity-75");
      setSelectedUser(member.userID);
      setIsSelected(true);
    } else {
      if (selectedUser === member.userID) {
        image.classList.remove("opacity-75");
        setSelectedUser("");
        setIsSelected(false);
      }
    }
  };
  const handleSubmitCard = (event) => {
    event.preventDefault();
    console.log({ userID: selectedUser, AmountToSent: AmountToSent });
  };
  return (
    <div className=" bg-white rounded-lg relative font-[2rem] w-[85%] h-[250px] p-4 flex flex-col gap-3 overflow-hidden max-xl:h-[200px] max-xl:gap-1 max-lg:w-full">
      <span className="text-xl  font-black  text-blue-950">Quick Transfer</span>
      <div className="flex flex-row gap-1 overflow-scroll overflow-y-hidden scroll-smooth quickTransferImages h-[50px]">
        {FamilyMembers.map((member, index) => {
          return (
            <Image
              src={member.ProfilePicture}
              width="40"
              key={index}
              height="70"
              alt="Profile Picture"
              className="object-cover w-auto h-auto rounded-full cursor-pointer"
              onClick={(e) => {
                handleImageClick(e, member);
              }}
            />
          );
        })}
      </div>
      <div className="flex flex-row gap-2 w-full justify-between">
        <div className="flex flex-col gap-2 w-full">
          <span className="text-sm  text-slate-700">Amount to send</span>
          <input
            type="number"
            step="0.01"
            placeholder="$ 0.00"
            required
            onChange={(e) => setAmountToSent(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-100 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-950 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button
        className="bg-blue-950 hover:bg-blue-900 hover:delay-100 transition rounded-lg p-3 text-slate-200 font-medium text-base"
        onClick={handleSubmitCard}
      >
        Send Money
      </button>
    </div>
  );
}

export default QuickTransferCard;

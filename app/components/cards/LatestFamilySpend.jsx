import React from "react";

function LatestFamilySpend() {
  const data = [
    {
      userID: 1,
      ProfilePicture: "/boyDefaultPP.jpg",
      description: "Food",
      total: "50",
      date: "02 March 2023 18:03",
      isTransfer: false,
    },
    {
      userID: 2,
      description: "Bills",
      date: "02 March 2023 18:03",
      total: "80",
      isTransfer: false,
      ProfilePicture: "/fatherDefaultPP.jpg",
    },
    {
      userID: 3,
      description: "Transfer",
      isTransfer: true,
      date: "02 March 2023 18:03",
      total: "55",
      ProfilePicture: "/womenDefaultPP.jpg",
    },
    {
      userID: 4,
      description: "Transfer",
      date: "02 March 2023 18:03",
      isTransfer: true,
      total: "100",
      ProfilePicture: "/userProfileTest.jpg",
    },
    {
      userID: 5,
      description: "Food",
      total: "130",
      date: "02 March 2023 18:03",
      ProfilePicture: "/boyDefaultPP.jpg",
      isTransfer: false,
    },
    {
      userID: 6,
      description: "Food",
      date: "02 March 2023 18:03",
      isTransfer: false,
      total: "130",

      ProfilePicture: "/fatherDefaultPP.jpg",
    },
    {
      userID: 7,
      description: "Food",
      date: "02 March 2023 18:03",
      isTransfer: false,
      total: "50",

      ProfilePicture: "/womenDefaultPP.jpg",
    },
    {
      userID: 8,
      description: "Food",
      date: "02 March 2023 18:03",
      total: "50",
      isTransfer: false,
      ProfilePicture: "/userProfileTest.jpg",
    },
  ];
  return (
    <div className="flex flex-col gap-4 w-[30%] h-fit max-lg:w-full  bg-white rounded-lg p-4">
      <div>
        {" "}
        <span className="text-xl  font-black  text-blue-950">
          Latest Activity
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {data.map((item, i) => {
          return (
            <div
              key={i}
              className="flex flex-row justify-start gap-5 items-center"
            >
              <img
                src={item.ProfilePicture}
                className="rounded-full object-cover h-[50px] w-[50px]"
              />
              <div className="flex flex-1 flex-col gap-1 ">
                <span className="text-base font-black text-blue-950">
                  {item.description}
                </span>
                <span className="text-sm font-black text-slate-500">
                  {item.date}
                </span>
              </div>
              <span
                className={`text-base self font-black ${
                  item.isTransfer ? " text-emerald-950" : " text-red-950"
                }`}
              >
                $ {item.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestFamilySpend;

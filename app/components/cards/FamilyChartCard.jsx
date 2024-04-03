import React from "react";
function FamilyChartCard(props) {
  const { data } = props;
  return (
    <div className="flex flex-col gap-4 w-[30%]  max-md:w-full h-[631px]   bg-white rounded-lg p-4">
      <div>
        <span className="text-xl  font-black  text-blue-950">
          Family Members
        </span>
      </div>
      <span className="text-md  text-slate-700">Parents : </span>
      <div className="flex justify-between flex-row items-center w-full ">
        {data?.map((item, i) => {
          if (item.role === 0) {
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2 justify-center"
              >
                <img
                  className="rounded-full object-cover w-[4.5rem] h-[4.5rem] max-lg:w-[4rem] max-lg:h-[4rem]"
                  src={item?.profilePicture || "/fatherDefaultPP.jpg"}
                  alt={`Profile Picture of ${item.name}`}
                />
                <span className="text-base max-lg:text-sm text-center">
                  {item.name}
                </span>
              </div>
            );
          }
        })}
      </div>
      <span className="text-md  text-slate-700">Children : </span>
      <div className="flex flex-col gap-2 overflow-scroll overflow-x-hidden scroll-smooth familyChartCard">
        {data?.map((item, i) => {
          if (item.role === 1) {
            return (
              <div key={i} className="flex flex-row gap-4 items-center ">
                <img
                  className="rounded-full object-cover w-[4rem] h-[4rem] max-lg:w-[3.5rem] max-lg:h-[3.5rem]"
                  src={item?.profilePicture || "/boyDefaultPP.jpg"}
                  alt={`Profile Picture of ${item.name}`}
                />
                <span className="text-base max-lg:text-sm">{item.name}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default FamilyChartCard;

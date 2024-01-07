import React from "react";
import { MdSavings } from "react-icons/md";
function RecentSavings(props) {
  const { data } = props;

  return (
    <div className="flex flex-col gap-4 w-full h-full max-lg:w-full  bg-white rounded-lg p-4">
      <div>
        <span className="text-xl  font-black  text-blue-950">
          Recent Savings Contribution
        </span>
      </div>
      <div className="flex flex-col gap-2 overflow-scroll overflow-x-hidden scroll-smooth familyChartCard">
        {/* Max 8 items */}
        {data?.map((item, i) => {
          return (
            <div key={i} className="flex flex-row gap-4 items-center ">
              <div className="w-[40px] h-[40px] rounded-lg bg-blue-100 flex items-center justify-center">
                <MdSavings className="text-blue-950 h-[20px] w-[20px]" />
              </div>
              <div className="flex flex-1 w-fit flex-row gap-2 justify-between">
                <span className="text-base ">{item.Description}</span>
                <span className="text-base font-black text-blue-950">
                  ${item.total}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentSavings;

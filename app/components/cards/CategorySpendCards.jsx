"use client";
import { FaChartPie } from "react-icons/fa6";
function CategorySpendCards(props) {
  const { data, userSpend } = props;
  const CalculatePercentage = (spent, userBudget) => {
    const percentage = (spent / userBudget) * 100;
    return percentage.toFixed(2) + "%";
  };
  const Colors = ["blue", "violet", "emerald"]; // Tailwind CSS colors Palletes
  return (
    <>
      {data?.map((item, i) => {
        return (
          <div
            key={i}
            className="flex flex-1 h-full w-full flex-col p-4 gap-3 rounded-lg bg-white "
          >
            <div
              className={`w-[40px] h-[40px] rounded-lg bg-${Colors[i]}-100 flex items-center justify-center`}
            >
              <FaChartPie
                className={`text-${Colors[i]}-950 h-[20px] w-[20px]`}
              />
            </div>
            <span className="text-lg  font-black  text-blue-950">
              {item.CategoryName}
            </span>
            {/* Progress Chart */}
            <div className="flex flex-col gap-3">
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-100">
                <div
                  className={`bg-${Colors[i]}-950 h-2 rounded-full `}
                  style={{
                    width: `${CalculatePercentage(item.TotalSpent, userSpend)}`,
                  }}
                ></div>
              </div>
              <span className="text-sm font-black text-slate-700">
                ${item.TotalSpent} from{" "}
                <span className={`text-sm font-black text-${Colors[i]}-950`}>
                  ${userSpend}
                </span>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CategorySpendCards;

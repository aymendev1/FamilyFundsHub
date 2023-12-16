import React from "react";
import SavingsCardLastMonth from "@/app/components/cards/SavingsCardLastMonth";
import OverviewChartDashboard from "@/app/components/charts/overviewChartDashboard";
import LatestTransactionsTable from "@/app/components/tables/LatestTransactionsTable";
import SavingsCategories from "@/app/components/cards/SavingsCategories";
function page() {
  return (
    <>
      <div className=" pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">Savings</span>
      </div>
      <div className="flex  flex-row  gap-10 w-full max-lg:flex-col">
        <div className="flex flex-col gap-10 w-[60%] px-2 max-lg:w-full">
          <SavingsCardLastMonth />
          <div className="w-full max-h-[400px] bg-white rounded-lg flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl  font-black  text-blue-950">
                Overview
              </span>
              <span className="text-md  text-slate-700">Monthly Savings</span>
            </div>
            <div className="w-[full] h-[300px] ">
              <OverviewChartDashboard />
            </div>
          </div>
        </div>
        <SavingsCategories />
      </div>
      <div className="flex bg-white rounded-lg mt-8 flex-col p-4 gap-2  max-lg:flex-col">
        <span className="text-xl  font-black  text-blue-950">
          Latest Savings
        </span>
        <span className="text-md text-slate-700">Your Savings History</span>
        {/*        Table To Be Edited after Fetching Data from Server */}
        <LatestTransactionsTable />
      </div>
    </>
  );
}

export default page;

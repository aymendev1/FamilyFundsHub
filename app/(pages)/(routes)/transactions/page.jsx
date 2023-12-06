import React from "react";
import OverviewChartDashboard from "@/app/components/charts/overviewChartDashboard";
import LatestTransactionsTable from "@/app/components/tables/LatestTransactionsTable";
function page() {
  return (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">
          Transaction
        </span>
      </div>
      {/* Overview Chart */}
      <div className="w-full max-h-[400px] bg-white rounded-lg flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl  font-black  text-blue-950">Overview</span>
          <span className="text-md  text-slate-700">Monthly Expense</span>
        </div>
        <div className="w-[full] h-[300px] ">
          <OverviewChartDashboard />
        </div>
      </div>
      <div className="flex bg-white rounded-lg mt-8 flex-col p-4 gap-2  max-lg:flex-col">
        <span className="text-xl  font-black  text-blue-950">
          Latest transactions
        </span>
        <span className="text-md text-slate-700">
          Your latest transactions{" "}
        </span>
        <LatestTransactionsTable />
      </div>
    </>
  );
}

export default page;

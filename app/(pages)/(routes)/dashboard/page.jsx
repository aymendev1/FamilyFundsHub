"use client";

import { useEffect } from "react";
import CreditCard from "@/app/components/cards/CreditCard";
import StatsCardEarning from "@/app/components/cards/StatsCardEarning";
import OverviewChartDashboard from "@/app/components/charts/overviewChartDashboard";
import FamilyChartCard from "@/app/components/cards/FamilyChartCard";
import LatestTransactionsTable from "@/app/components/tables/LatestTransactionsTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";
function page() {
  const data = useSelector((state) => state.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  return (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">Dashboard</span>
      </div>
      <div className="flex  flex-row  w-full max-md:flex-col gap-8 max-lg:gap-5 ">
        <div className="flex-1 flex flex-col gap-8 max-lg:gap-5 w-[60%] max-lg:w-[70%] max-md:w-full px-2">
          {/* Cards Shows Balance */}
          <div className="flex flex-row w-full gap-2 max-sm:flex-col max-sm:gap-5">
            <div className="flex-1">
              <CreditCard />
            </div>
            <div className="flex-1 flex gap-2 justify-between max-xl:h-[200px] max-lg:w-full flex-col">
              <StatsCardEarning />
            </div>
          </div>
          {/* Overview Chart */}
          <div className="w-[92.5%] max-lg:w-full  max-h-[400px] bg-white rounded-lg flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl  font-black  text-blue-950">
                Overview
              </span>
              <span className="text-md  text-slate-700">Monthly Earning</span>
            </div>
            <div className="w-[full] h-[300px] ">
              <OverviewChartDashboard />
            </div>
          </div>
        </div>
        {/* FamilyChart */}
        <FamilyChartCard />
      </div>
      <div className="flex bg-white rounded-lg mt-8 max-lg:mt-5 flex-col p-4 gap-2  max-lg:flex-col">
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

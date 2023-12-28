"use client";
import { useEffect, useState } from "react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";

import TotalBalanceCard from "@/app/components/cards/TotalBalanceCard";
import QuickTransferCard from "@/app/components/cards/QuickTransferCard";
import CategorySpendCards from "@/app/components/cards/CategorySpendCards";
import ActionMenu from "@/app/components/Menus/ActionMenu";
import LatestTransactionsTable from "@/app/components/tables/LatestTransactionsTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";

function page() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.userData);
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  return loading ? (
    <ComponentLoader />
  ) : (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">Balance</span>
      </div>
      <div className="flex  flex-row  w-full gap-8 max-lg:gap-6 max-md:gap-5 max-lg:flex-col">
        <div className="flex-1 flex flex-col gap-8 max-lg:gap-6 max-md:gap-5 w-full px-2 max-lg:w-full">
          {/* Cards Shows Balance */}
          <div className="flex flex-row w-full gap-8 max-lg:gap-6 max-md:gap-5 ">
            <div className="flex-1">
              <TotalBalanceCard data={items.userBudget} />
            </div>
            <div className="flex-1 flex gap-2 justify-between max-xl:h-[200px] max-lg:w-full flex-col">
              <QuickTransferCard />
            </div>
          </div>
          <div className="w-full max-h-[400px] flex flex-row gap-8 max-lg:gap-6 max-md:gap-5 ">
            <CategorySpendCards />
          </div>
        </div>
        {/* FamilyChart */}
        <ActionMenu />
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

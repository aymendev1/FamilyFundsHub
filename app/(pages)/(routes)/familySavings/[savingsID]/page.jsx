"use client";
import { useEffect } from "react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";

import QuickTransferCard from "@/app/components/cards/QuickTransferCard";
import SavingsDetailsCard from "@/app/components/cards/SavingsDetailsCard";
import TotalBalanceCard from "@/app/components/cards/TotalBalanceCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";
function page({ params }) {
  const { savingsID } = params;
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.userData);
  useEffect(() => {
    dispatch(fetchDataFromDB());
    document.title = `Family Saving Goal #${savingsID}`;
  }, [dispatch]);
  return loading ? (
    <ComponentLoader />
  ) : (
    <>
      {/* Page Title */}
      <span className="text-3xl  font-black  text-blue-950 ">Saving Goals</span>
      <div className="flex flex-row gap-10 max-lg:gap-8 max-md:gap-6 max-sm:gap-4 w-full mt-5 max-md:flex-col-reverse">
        <SavingsDetailsCard
          id={savingsID}
          userDetails={items?.user}
          isFamily={true}
        />
        <div className="flex flex-col gap-10 w-[30%]  max-md:gap-6 max-sm:gap-4 max-md:flex-row max-md:w-full">
          <TotalBalanceCard data={items?.userBudget} />
          <QuickTransferCard
            FamilyMembers={items?.familyMembers}
            userBudget={items?.user?.balance}
          />
        </div>
      </div>
    </>
  );
}

export default page;

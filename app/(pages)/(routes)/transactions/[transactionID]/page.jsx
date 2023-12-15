import QuickTransferCard from "@/app/components/cards/QuickTransferCard";
import TransactionDetailsCard from "@/app/components/cards/TransactionDetailsCard";
import TotalBalanceCard from "@/app/components/cards/TotalBalanceCard";
import React from "react";

function page({ params }) {
  const { transactionID } = params;
  return (
    <>
      {/* Page Title */}{" "}
      <span className="text-3xl  font-black  text-blue-950 ">
        Transaction Details
      </span>
      <div className="flex flex-row gap-10 max-lg:gap-8 max-md:gap-6 max-sm:gap-4 max-md:flex-col w-full mt-5 max-md:flex-col-reverse">
        <TransactionDetailsCard />
        <div className="flex flex-col gap-10 w-[30%]  max-md:gap-6 max-sm:gap-4 max-md:flex-row max-md:w-full">
          <TotalBalanceCard />
          <QuickTransferCard />
        </div>
      </div>
    </>
  );
}

export default page;

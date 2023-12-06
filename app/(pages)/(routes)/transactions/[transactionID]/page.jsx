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
      <div className="flex flex-row gap-10 w-full mt-5 ">
        <TransactionDetailsCard />
        <div className="flex flex-col gap-10 w-[30%]">
          <TotalBalanceCard />
          <QuickTransferCard />
        </div>
      </div>
    </>
  );
}

export default page;
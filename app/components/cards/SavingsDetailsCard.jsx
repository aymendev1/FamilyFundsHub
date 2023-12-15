import React from "react";
import Image from "next/image";
import LatestTransactionsTable from "../tables/LatestTransactionsTable";
function TransactionDetailsCard() {
  const isTransfer = true;
  return (
    <div className="bg-white rounded-lg p-4 w-full flex flex-col gap-2">
      <span className="text-xl  font-black  text-blue-950">Saving Details</span>
      <span className="text-md text-slate-600 border-b border-gray-900/10 pb-1.5">
        Reference #1
      </span>
      {/* Header of Card */}
      <div className="flex flex-row justify-between pt-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm  text-slate-700">Date Created</span>
          <span className="text-sm text-emerald-700 font-black bigText ">
            Sunday 04th November 2023
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm  text-slate-700">Status</span>
          <span className="text-sm text-emerald-700 font-black bigText ">
            Completed
          </span>
        </div>
      </div>
      <div className="pt-5">
        <span className="text-blue-950 font-black text-xl pb-4"> History</span>
        {/*Table component to be edited when data is ready  */}
        <LatestTransactionsTable />
      </div>
      <div className="bg-slate-200 rounded-lg w-full p-4 self-end mt-5">
        <span className="text-sm  text-slate-700 font-black">
          Note : This transfer is only virtual and not yet supported in real
          life
        </span>
      </div>
    </div>
  );
}

export default TransactionDetailsCard;

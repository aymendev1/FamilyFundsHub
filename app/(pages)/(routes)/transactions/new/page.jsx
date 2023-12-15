import React from "react";
import RecentExpenses from "@/app/components/cards/RecentExpenses";
import NewExpenseForm from "@/app/components/forms/NewExpenseForm";
function page() {
  return (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl font-black  text-blue-950 ">Transaction</span>
      </div>
      <div className="w-full flex flex-row gap-10 ">
        <NewExpenseForm />
        <div className="w-[30%]">
          <RecentExpenses />
        </div>
      </div>
    </>
  );
}

export default page;

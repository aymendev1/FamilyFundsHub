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
      <div className="w-full flex flex-row max-md:flex-col gap-10 max-lg:gap-8 max-md:gap-6 max-sm:gap-4 ">
        <NewExpenseForm />
        <div className="w-[30%] max-md:w-full">
          <RecentExpenses />
        </div>
      </div>
    </>
  );
}

export default page;

import React from "react";
import RecentExpenses from "@/app/components/cards/RecentExpenses";
import NewSavingsForm from "@/app/components/forms/NewSavingsForm";
function page() {
  return (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl font-black  text-blue-950 ">Savings</span>
      </div>
      <div className="w-full flex flex-row gap-10 ">
        <NewSavingsForm />
        <div className="w-[30%]">
          <RecentExpenses />
        </div>
      </div>
    </>
  );
}

export default page;

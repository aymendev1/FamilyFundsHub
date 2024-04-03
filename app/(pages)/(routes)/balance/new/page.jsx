"use client";
import { useState, useEffect } from "react";
import RecentSavings from "@/app/components/cards/RecentSavings";
import NewContributionForm from "@/app/components/forms/newIncomeForm";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
function page() {
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Add Income  ";
  }, []);
  return Loading ? (
    <ComponentLoader />
  ) : (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl font-black  text-blue-950 ">Add income</span>
      </div>
      <div className="w-full flex flex-row gap-10 ">
        <NewContributionForm />
      </div>
    </>
  );
}

export default page;

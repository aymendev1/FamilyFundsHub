"use client";
import { useState, useEffect } from "react";
import RecentExpenses from "@/app/components/cards/RecentExpenses";
import NewExpenseForm from "@/app/components/forms/NewExpenseForm";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { ToastContainer } from "react-toastify";

function page() {
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Monthly Stats
      await fetch(`/api/userData/lastTransactions`, {
        method: "GET",
      }).then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setLoading(false);
          setData(data.latestExpenses);
        } else if (res.status === 401) {
          setError(res.statusText);
          setLoading(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return Loading ? (
    <ComponentLoader />
  ) : (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl font-black  text-blue-950 ">Transaction</span>
      </div>
      <div className="w-full flex flex-row max-md:flex-col gap-10 max-lg:gap-8 max-md:gap-6 max-sm:gap-4 ">
        <NewExpenseForm />
        <div className="w-[30%] max-md:w-full">
          <RecentExpenses data={data} />
        </div>
      </div>
    </>
  );
}

export default page;

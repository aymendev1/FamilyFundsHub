"use client";
import { useState, useEffect } from "react";
import RecentSavings from "@/app/components/cards/RecentSavings";
import NewSavingsForm from "@/app/components/forms/NewSavingsForm";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { ToastContainer } from "react-toastify";
function page() {
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [error, setError] = useState([]);
  const fetchData = async () => {
    try {
      setLoading(true);
      // Monthly Stats
      await fetch(`/api/savings/`, {
        method: "GET",
      }).then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setLoading(false);
          setData(data?.Savings.slice(0, 7));
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
        <span className="text-3xl font-black  text-blue-950 ">Savings</span>
      </div>
      <div className="w-full flex flex-row gap-10 ">
        <NewSavingsForm />
        <div className="w-[30%]">
          <RecentSavings data={Data} />
        </div>
      </div>
    </>
  );
}

export default page;

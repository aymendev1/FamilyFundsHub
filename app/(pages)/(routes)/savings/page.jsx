"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";
import SavingsCardLastMonth from "@/app/components/cards/SavingsCardLastMonth";
import OverviewChartDashboard from "@/app/components/charts/overviewChartDashboard";
import LatestTransactionsTable from "@/app/components/tables/LatestTransactionsTable";
import SavingsCategories from "@/app/components/cards/SavingsCategories";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { BsBoxArrowUpRight } from "react-icons/bs";
function page() {
  const [Loading, setLoading] = useState();

  const { items, loading, error } = useSelector((state) => state.userData);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [LatestSavings, setLatestSavings] = useState([]);
  const dispatch = useDispatch();
  // Table's Column
  const columns = [
    {
      name: "Member",
      selector: (row) => (
        <div className="flex flex-row gap-2 items-center">
          <img
            src={row.profilePicture || "/fatherDefaultPP.jpg"}
            className="rounded-lg h-10 w-10
             object-cover"
            alt={`${row.name} Profile Picture`}
          />
          <span className="font-black">{row.name}</span>
        </div>
      ),
    },
    {
      name: "Description",
      selector: (row) => row.Description,
    },
    {
      name: "Status",
      selector: (row) => row.Status,
    },
    {
      name: "Total",
      selector: (row) => "$ " + String(row.total),
    },
    {
      name: "Date Start",
      selector: (row) =>
        new Date(row.date_start).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
          day: "2-digit",
        }),
    },
    {
      name: "Date End",
      selector: (row) =>
        new Date(row.date_end).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
          day: "2-digit",
        }),
    },
    {
      name: "Last Update",
      selector: (row) =>
        new Date(row.date_updated).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
          day: "2-digit",
        }),
    },
    {
      name: "",
      selector: (row) => (
        <button
          className="bg-blue-950 hover:bg-blue-600 ease-out duration-500 transition-all rounded-lg p-3 text-slate-200 font-medium text-sm flex flex-row items-center gap-2 justify-center"
          onClick={() => {
            window.open(`/savings/${row.SavingID}`, "_blank");
          }}
        >
          <span className="flex-1">View More</span>
          <BsBoxArrowUpRight className="min-w-[15px] h-[15px] " />
        </button>
      ),
    },
  ];
  // We import Monthly Stats and Latest Items From API
  const fetchData = async () => {
    try {
      setLoading(true);
      // Monthly Stats
      await fetch("/api/savings/stats", { method: "GET" }).then(async (res) => {
        const data = await res.json();
        setMonthlyStats(data);
      });
      await fetch("/api/savings/", { method: "GET" }).then(async (res) => {
        const data = await res.json();
        setLatestSavings(data.Savings);
      });

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  return Loading ? (
    <ComponentLoader />
  ) : (
    <>
      <div className=" pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">Savings</span>
      </div>
      <div className="flex  flex-row  gap-10 w-full max-lg:flex-col">
        <div className="flex flex-col gap-10 w-[60%] px-2 max-lg:w-full">
          <SavingsCardLastMonth
            Loading={loading}
            UserSavingLastMonth={items?.userBudget?.UserSavingLastMonth}
          />
          <div className="w-full max-h-[400px] bg-white rounded-lg flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl  font-black  text-blue-950">
                Overview
              </span>
              <span className="text-md  text-slate-700">Monthly Savings</span>
            </div>
            <div className="w-[full] h-[300px] ">
              <OverviewChartDashboard data={monthlyStats} />
            </div>
          </div>
        </div>
        <SavingsCategories />
      </div>
      <div className="flex bg-white rounded-lg mt-8 flex-col p-4 gap-2  max-lg:flex-col">
        <span className="text-xl  font-black  text-blue-950">
          Latest Savings
        </span>
        <span className="text-md text-slate-700">Your Savings History</span>
        {/*        Table To Be Edited after Fetching Data from Server */}
        <LatestTransactionsTable data={LatestSavings} columns={columns} />
      </div>
    </>
  );
}

export default page;

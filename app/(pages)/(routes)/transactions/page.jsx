"use client";
import { useEffect, useState } from "react";
import OverviewChartDashboard from "@/app/components/charts/overviewChartDashboard";
import LatestTransactionsTable from "@/app/components/tables/CustomTable";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { BsBoxArrowUpRight } from "react-icons/bs";

function page() {
  const [Loading, setLoading] = useState();
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [LatestTransactions, setLatestTransactions] = useState([]);
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
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Total",
      selector: (row) => "$ " + String(row.Total.toFixed(2)),
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.Date_created).toLocaleDateString("default", {
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
            window.open(`/transactions/${row.ExpenseID}`, "_blank");
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
      await fetch("/api/expenses/stats", { method: "GET" }).then(
        async (res) => {
          const data = await res.json();
          setMonthlyStats(data);
        }
      );
      await fetch("/api/expenses/", { method: "GET" }).then(async (res) => {
        const data = await res.json();
        setLatestTransactions(data);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
    document.title = "Expenses";
  }, []);
  return Loading ? (
    <ComponentLoader />
  ) : (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">
          Transaction
        </span>
      </div>
      {/* Overview Chart */}
      <div className="w-full max-h-[400px] bg-white rounded-lg flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <span className="text-xl  font-black  text-blue-950">Overview</span>
          <span className="text-md  text-slate-700">Monthly Expense</span>
        </div>
        <div className="w-[full] h-[300px] ">
          <OverviewChartDashboard data={monthlyStats} />
        </div>
      </div>
      <div className="flex bg-white rounded-lg mt-8 flex-col p-4 gap-2  max-lg:flex-col">
        <span className="text-xl  font-black  text-blue-950">
          Latest transactions
        </span>
        <span className="text-md text-slate-700">
          Your latest transactions{" "}
        </span>
        <LatestTransactionsTable
          columns={columns}
          data={LatestTransactions?.Expenses}
        />
      </div>
    </>
  );
}

export default page;

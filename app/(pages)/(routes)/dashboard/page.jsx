"use client";
import { useEffect, useState } from "react";
import CreditCard from "@/app/components/cards/CreditCard";
import StatsCardEarning from "@/app/components/cards/StatsCardEarning";
import OverviewChartDashboard from "@/app/components/charts/overviewChartDashboard";
import FamilyChartCard from "@/app/components/cards/FamilyChartCard";
import LatestTransactionsTable from "@/app/components/tables/CustomTable";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";
import { BsBoxArrowUpRight } from "react-icons/bs";
function page() {
  const { items, loading, error } = useSelector((state) => state.userData);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [LatestTransactions, setLatestTransactions] = useState([]);
  const [Loading, setLoading] = useState(false);
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
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Total",
      selector: (row) =>
        "$ " + parseFloat(row.Total).toFixed(2).toLocaleString(),
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
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  // We import Monthly Stats and Latest Items From API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Monthly Stats
      await fetch("/api/income/stats", { method: "GET" }).then(async (res) => {
        const data = await res.json();
        setMonthlyStats(data);
      });
      await fetch("/api/expenses/", { method: "GET" }).then(async (res) => {
        const data = await res.json();
        setLatestTransactions(data);
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
    document.title = "Dashboard";
  }, []);
  return loading || Loading ? (
    <ComponentLoader />
  ) : (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">Dashboard</span>
      </div>
      <div className="flex  flex-row  w-full max-md:flex-col gap-8 max-lg:gap-5 ">
        <div className="flex-1 flex flex-col gap-8 max-lg:gap-5 w-[60%] max-lg:w-[70%] max-md:w-full px-2">
          {/* Cards Shows Balance */}
          <div className="flex flex-row w-full gap-2 max-sm:flex-col max-sm:gap-5">
            <div className="flex-1">
              <CreditCard
                data={{
                  userDetails: items?.user,
                  familyDetails: items?.familyDetails,
                }}
              />
            </div>
            <div className="flex-1 flex gap-2 justify-between max-xl:h-[200px] max-lg:w-full flex-col">
              <StatsCardEarning data={items?.userBudget} />
            </div>
          </div>
          {/* Overview Chart */}
          <div className="w-[92.5%] max-lg:w-full  max-h-[400px] bg-white rounded-lg flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl  font-black  text-blue-950">
                Overview
              </span>
              <span className="text-md  text-slate-700">Monthly Earning</span>
            </div>
            <div className="w-[full] h-[300px] ">
              <OverviewChartDashboard data={monthlyStats} />
            </div>
          </div>
        </div>
        {/* FamilyChart */}
        <FamilyChartCard data={items?.familyMembers} />
      </div>
      <div className="flex bg-white rounded-lg mt-8 max-lg:mt-5 flex-col p-4 gap-2  max-lg:flex-col">
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

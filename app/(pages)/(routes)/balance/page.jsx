"use client";
import { useEffect, useState } from "react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import TotalBalanceCard from "@/app/components/cards/TotalBalanceCard";
import QuickTransferCard from "@/app/components/cards/QuickTransferCard";
import CategorySpendCards from "@/app/components/cards/CategorySpendCards";
import ActionMenu from "@/app/components/Menus/ActionMenu";
import LatestTransactionsTable from "@/app/components/tables/LatestTransactionsTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";
import { BsBoxArrowUpRight } from "react-icons/bs";

function page() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.userData);
  const [spendCategories, setSpendCategories] = useState([]);
  const [LatestTransactions, setLatestTransactions] = useState([]);
  const [Loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      // Monthly Stats
      await fetch("/api/expenses/categories", { method: "GET" }).then(
        async (res) => {
          const data = await res.json();
          setSpendCategories(data.Categories);
        }
      );
      await fetch("/api/expenses/", { method: "GET" }).then(async (res) => {
        const data = await res.json();
        setLatestTransactions(data);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

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
  useEffect(() => {
    fetchData();
    document.title = "Balance";
  }, []);
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  return loading || Loading ? (
    <ComponentLoader />
  ) : (
    <>
      {/* Page Title */}
      <div className=" pb-5">
        <span className="text-3xl  font-black  text-blue-950 ">Balance</span>
      </div>
      <div className="flex  flex-row  w-full gap-8 max-lg:gap-6 max-md:gap-5 max-lg:flex-col">
        <div className="flex-1 flex flex-col gap-8 max-lg:gap-6 max-md:gap-5 w-full px-2 max-lg:w-full">
          {/* Cards Shows Balance */}
          <div className="flex flex-row w-full gap-8 max-lg:gap-6 max-md:gap-5 ">
            <div className="flex-1">
              <TotalBalanceCard data={items?.userBudget} />
            </div>
            <div className="flex-1 flex gap-2 justify-between max-xl:h-[200px] max-lg:w-full flex-col">
              <QuickTransferCard
                FamilyMembers={items?.familyMembers}
                userBudget={items?.user?.balance}
              />
            </div>
          </div>
          <div className="w-full max-h-[400px] flex flex-row gap-8 max-lg:gap-6 max-md:gap-5 ">
            <CategorySpendCards
              data={spendCategories}
              userSpend={items?.userBudget?.ExpenseThisMonth}
            />
          </div>
        </div>
        {/* FamilyChart */}
        <ActionMenu />
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

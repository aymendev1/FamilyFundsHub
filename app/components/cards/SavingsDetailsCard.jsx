"use client";
import { useState, useEffect } from "react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import LatestTransactionsTable from "../tables/LatestTransactionsTable";
import { BsShieldLockFill } from "react-icons/bs";

function TransactionDetailsCard(props) {
  const { id } = props;
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [SavingInfo, setSavingInfo] = useState([]);
  const [SavingHistory, setSavingHistory] = useState([]);
  // Table's Column
  const columns = [
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
      selector: (row) => "$ " + String(row.total.toFixed(2)),
    },
    {
      name: "Date",
      selector: (row) =>
        new Date(row.date_created).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
          day: "2-digit",
        }),
    },
  ];
  // We import Monthly Stats and Latest Items From API
  const fetchData = async () => {
    try {
      setLoading(true);
      // Monthly Stats
      await fetch(`/api/savings/goal/${id}`, {
        method: "GET",
      }).then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setLoading(false);
          setSavingInfo(data.SavingDetails);
          setSavingHistory(data.SavingHistory);
        } else {
          setError(res.statusText);
          setLoading(false);
        }
      });
    } catch (e) {
      console.log(e);
      setError(e);
      setLoading(false);
    }
  };
  const CalculateTotal = (SavingHistory) => {
    let total = 0;
    SavingHistory.map((item) => {
      total += parseFloat(item.total);
    });
    return total;
  };
  useEffect(() => {
    fetchData();
  }, []);
  return Loading ? (
    <ComponentLoader />
  ) : (
    <div className="bg-white rounded-lg p-4 w-full flex flex-col gap-2">
      <span className="text-xl  font-black  text-blue-950">Saving Details</span>
      <span className="text-md text-slate-600 border-b border-gray-900/10 pb-1.5">
        Reference # {id}
      </span>

      {error ? (
        <div className="flex flex-col justify-center items-center pt-5 gap-3 h-full">
          <BsShieldLockFill className="w-[50px] h-[50px] text-blue-950 " />
          <span className="text-xl max-sm:text-lg font-black  text-blue-950">
            Access Denied !
          </span>
          <span className="text-sm  text-slate-700">
            Please make sure that you are accessing the correct transaction
            details !{" "}
          </span>
        </div>
      ) : (
        <>
          {/* Header of Card */}
          <div className="flex flex-row justify-between pt-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm  text-slate-700">Date Created</span>
              <span className="text-sm text-emerald-700 font-black bigText ">
                {new Date(SavingInfo?.date_created).toLocaleDateString(
                  "default",
                  {
                    month: "long",
                    year: "numeric",
                    day: "2-digit",
                  }
                )}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm  text-slate-700">Status</span>
              <span className="text-sm text-emerald-700 font-black bigText ">
                {SavingInfo?.Status}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-10 pt-5">
            <img
              src={SavingInfo?.users?.profilePicture || "/boyDefaultPP.jpg"}
              alt="Profile Picture"
              className="object-cover h-[120px] w-[120px] rounded-lg"
            />
            <div className="grid grid-rows-2 grid-cols-4 max-lg:grid-cols-3 max-lg:grid-rows-3 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Description :</span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  {SavingInfo?.Description}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Date Start </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  {new Date(SavingInfo?.date_start).toLocaleDateString(
                    "default",
                    {
                      month: "long",
                      year: "numeric",
                      day: "2-digit",
                    }
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Date End </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  {new Date(SavingInfo?.date_end).toLocaleDateString(
                    "default",
                    {
                      month: "long",
                      year: "numeric",
                      day: "2-digit",
                    }
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">
                  Total To be saved:{" "}
                </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  $ {parseFloat(SavingInfo?.total).toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">
                  Total saved till now:{" "}
                </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  $ {CalculateTotal(SavingHistory)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">
                  Last Time Updated{" "}
                </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  {new Date(SavingInfo?.date_updated).toLocaleDateString(
                    "default",
                    {
                      month: "long",
                      year: "numeric",
                      day: "2-digit",
                    }
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Preformed by :</span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  {SavingInfo?.users?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <span className="text-blue-950 font-black text-xl pb-4">
              {" "}
              History
            </span>
            {/*Table component to be edited when data is ready  */}
            <LatestTransactionsTable data={SavingHistory} columns={columns} />
          </div>
          <div className="bg-slate-200 rounded-lg w-full p-4 self-end mt-5">
            <span className="text-sm  text-slate-700 font-black">
              Note : This transfer is only virtual and not yet supported in real
              life
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default TransactionDetailsCard;

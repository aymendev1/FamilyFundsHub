"use client";
import { useState, useEffect } from "react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { BsShieldLockFill } from "react-icons/bs";
function TransactionDetailsCard(props) {
  const { id, userDetails } = props;
  const [data, setData] = useState([]);
  const [isTransfer, setIsTransfer] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // We import Monthly Stats and Latest Items From API
  const fetchData = async () => {
    try {
      setLoading(true);
      // Monthly Stats
      await fetch(`/api/expenses/${id}`, {
        method: "GET",
      }).then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setLoading(false);
          setData(data[0]);
          if (data[0].isTransfer === 1) {
            setIsTransfer(true);
          }
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
    <div className="bg-white rounded-lg p-4 w-full flex flex-col gap-2">
      <span className="text-xl  font-black  text-blue-950">
        Expense Details
      </span>
      <span className="text-md text-slate-600 border-b border-gray-900/10 pb-1.5">
        Reference # {id}
      </span>
      {/* Header of Card */}
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
          <div className="flex flex-row justify-between pt-5">
            <div className="flex flex-col gap-2">
              <span className="text-sm  text-slate-700">Date Created</span>
              <span className="text-sm text-emerald-700 font-black bigText ">
                {new Date(data?.Date_created).toLocaleDateString("default", {
                  month: "long",
                  year: "numeric",
                  day: "2-digit",
                })}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm  text-slate-700">Status</span>
              <span className="text-sm text-emerald-700 font-black bigText ">
                Completed
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-10 pt-5">
            <img
              src={
                isTransfer
                  ? data?.transferUserProfilePicture
                  : userDetails?.profilePicture
              }
              alt="Profile Picture"
              className="object-cover h-[120px] w-[120px] rounded-lg"
            />
            <div className="grid grid-rows-2 grid-cols-3 max-lg:grid-cols-2 max-lg:grid-rows-3 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">
                  {!isTransfer ? "Preformed by :" : "Sender :"}
                </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  {userDetails?.name}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm  text-slate-700">Date Executed </span>
                <span className="text-sm text-slate-950 font-black bigText ">
                  {new Date(data?.Date_created).toLocaleDateString("default", {
                    month: "long",
                    year: "numeric",
                    day: "2-digit",
                  })}
                </span>
              </div>
              {isTransfer ? (
                <>
                  {" "}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm  text-slate-700">Recipient :</span>
                    <span className="text-sm text-slate-950 font-black bigText ">
                      {data?.transferUserName}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="flex flex-col gap-2">
                    <span className="text-sm  text-slate-700">Category </span>
                    <span className="text-sm text-slate-950 font-black bigText ">
                      {data?.category}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="pt-5">
            <table class="table-auto w-full">
              <thead>
                <tr className="text-slate-700 text-left pb-4">
                  <th>Description</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-[50px]">
                  <td>{data?.Description}</td>
                  <td className=" text-emerald-700 font-black bigText ">
                    $ {data?.Total?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
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

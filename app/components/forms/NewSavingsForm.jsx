"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
export default function NewSavingsForm(props) {
  const { isFamily } = props;
  const [Description, setDescription] = useState("");
  const [Total, setTotal] = useState("");
  const [Status, setStatus] = useState("");
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  const [Loading, setLoading] = useState(false);
  const CreateSavings = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/${isFamily ? "familySavings" : "savings"}/goal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Description: Description,
        Total: Total,
        Status: Status,
        StartDate: StartDate,
        EndDate: EndDate,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        const data = await res.json();
        toast.success("Saving Goal Created successfully !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.replace(
          `/${isFamily ? "familySavings" : "savings"}/${
            data.SavingGoal.SavingID
          }`
        );
      } else {
        setLoading(false);
        const error = await res.json();
        console.log(error);
        return toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  return (
    <form
      action="POST"
      onSubmit={CreateSavings}
      className="bg-white rounded-lg p-4 w-full flex flex-col gap-3"
    >
      <span class="text-xl  font-black  text-blue-950">
        Create a new saving goal
      </span>
      <span class="text-md text-slate-700 border-b border-gray-900/10 pb-4">
        Fill in the bellow formulary :
      </span>
      {Loading ? (
        <SyncLoader
          color="#172554"
          cssOverride={{
            alignItems: "center",
            alignSelf: "center",
            height: "100%",
          }}
        />
      ) : (
        <>
          <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="SavingDescription"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="SavingDescription"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoComplete="SavingDescription"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="SavingTotal"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount to be saved :
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="SavingTotal"
                  value={Total}
                  onChange={(e) => setTotal(e.target.value)}
                  autoComplete="SavingTotal"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="SavingStatus"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Saving Status
              </label>
              <div className="mt-2">
                <select
                  name="SavingStatus"
                  id="SavingStatus"
                  autoComplete="SavingStatus"
                  value={Status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                >
                  <option value={"Completed"}>Completed</option>
                  <option value={"Active"}>Active</option>
                  <option value={"Not Started"}>Not Started Yet</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="SavingStartDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Start Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="SavingStartDate"
                  value={StartDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  autoComplete="SavingStartDate"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="SavingEndDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                End Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="SavingEndDate"
                  value={EndDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  autoComplete="SavingEndDate"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 hover:delay-100 transition rounded-lg p-3 text-slate-200 font-medium text-base w-[40%] self-center mt-4"
          >
            Create
          </button>
        </>
      )}
    </form>
  );
}

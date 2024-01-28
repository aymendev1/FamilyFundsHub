"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SyncLoader } from "react-spinners";

export default function NewContributionForm(props) {
  const { userIncomeGoal, isFamily } = props;
  const [Description, setDescription] = useState("");
  const [Total, setTotal] = useState("");
  const [Loading, setLoading] = useState(false);
  const CreateIncome = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/income/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Description: Description,
        Total: Total,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        const data = await res.json();
        toast.success("Income Added successfully !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.reload();
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
      onSubmit={CreateIncome}
      className="bg-white rounded-lg p-4 w-full flex flex-col gap-3"
    >
      <span class="text-xl  font-black  text-blue-950">Add new income</span>
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
          <div className=" flex flex-row  w-full justify-between gap-5">
            <div className="w-full">
              <label
                htmlFor="IncomeDescription"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="IncomeDescription"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoComplete="IncomeDescription"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="IncomeTotal"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount to be add :
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="IncomeTotal"
                  value={Total}
                  onChange={(e) => setTotal(e.target.value)}
                  autoComplete="IncomeTotal"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

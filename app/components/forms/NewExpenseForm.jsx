"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromDB } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
function NewExpenseForm() {
  const [description, setDescription] = useState("");
  const [Total, setTotal] = useState("");
  const [CategoryID, setCategoryID] = useState(3);
  const [ExpenseDate, setExpenseDate] = useState(new Date());
  const [Loading, setLoading] = useState(false);
  const { items, loading, error } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const CreateExpense = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CategoryID: CategoryID,
        Total: Total,
        Description: description,
        ExpenseDate: ExpenseDate,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        const data = await res.json();

        toast.success("Expense added successfully !", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.replace(`/transactions/${data.expense.ExpenseID}`);
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
  useEffect(() => {
    dispatch(fetchDataFromDB());
  }, [dispatch]);
  return (
    <form
      action="POST"
      className="bg-white rounded-lg p-4 w-full flex flex-col gap-3"
      onSubmit={CreateExpense}
    >
      <span class="text-xl  font-black  text-blue-950">Add your expense</span>
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
                htmlFor="ExpenseDescription"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name="ExpenseDescription"
                  autoComplete="ExpenseDescription"
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="ExpenseTotal"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Total amount
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  value={Total}
                  onChange={(e) => setTotal(e.target.value)}
                  name="ExpenseTotal"
                  autoComplete="ExpenseTotal"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="ExpenseCategory"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  name="ExpenseCategory"
                  autoComplete="ExpenseCategory"
                  value={CategoryID}
                  onChange={(e) => setCategoryID(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                >
                  {items?.ExpensesCategories?.map((item, i) => {
                    if (item.CategoryID === 5) {
                      return <></>;
                    } else {
                      return (
                        <option key={i} value={item.CategoryID}>
                          {item.CategoryName}
                        </option>
                      );
                    }
                  })}
                </select>
                <span className=" mt-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                  In case you didn't find the desired category, you can add a
                  category in the settings section
                </span>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="ExpenseDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Expense Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="ExpenseDate"
                  value={ExpenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  autoComplete="ExpenseDate"
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 hover:delay-100 transition rounded-lg p-3 text-slate-200 font-medium text-base w-[40%] self-center mt-4"
          >
            Save
          </button>
        </>
      )}
    </form>
  );
}

export default NewExpenseForm;

import React from "react";

function NewExpenseForm() {
  return (
    <form
      action="POST"
      className="bg-white rounded-lg p-4 w-full flex flex-col gap-3"
    >
      <span class="text-xl  font-black  text-blue-950">Add your expense</span>
      <span class="text-md text-slate-700 border-b border-gray-900/10 pb-4">
        Fill in the bellow formulary :
      </span>
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
              name="ExpenseDescription"
              autoComplete="ExpenseDescription"
              className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              name="ExpenseTotal"
              autoComplete="ExpenseTotal"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="ExpenseStatus"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Payment Status
          </label>
          <div className="mt-2">
            <select
              name="ExpenseStatus"
              id="ExpenseStatus"
              autoComplete="ExpenseStatus"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2 md:col-start-1">
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
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option>Food</option>
              <option>Entertaiment</option>
              <option>bla bla</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="ExpensePaymentDate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Payment Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="ExpensePaymentDate"
              autoComplete="ExpensePaymentDate"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="md:col-span-2">
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
              autoComplete="ExpenseDate"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
    </form>
  );
}

export default NewExpenseForm;

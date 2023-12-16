export default function Example() {
  return (
    <>
      <div class="pb-5">
        <span class="text-3xl  font-black  text-blue-950 ">
          Account Settings
        </span>
      </div>
      <form className=" ">
        <div className=" flex flex-row gap-10 justify-between">
          <div className="p-4 bg-white rounded-lg w-full">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Login Credentials
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your email and password here
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="OldPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Old Password
                </label>
                <div className="mt-2">
                  <input
                    id="OldPassword"
                    name="OldPassword"
                    type="password"
                    autoComplete="password"
                    className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="NewPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="NewPassword"
                    name="NewPassword"
                    type="password"
                    autoComplete="Newpassword"
                    className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <label
                  htmlFor="RepeatedPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Repeat your Password
                </label>
                <div className="mt-2">
                  <input
                    id="RepeatedPassword"
                    name="RepeatedPassword"
                    type="password"
                    autoComplete="RepeatedPassword"
                    className="block w-full rounded-md border-0 py-1.5  px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

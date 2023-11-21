import React from "react";
import Image from "next/image";

function page() {
  return (
    <>
      {/* Header */}
      <div className="pb-6">
        <Image src="/logo.png" alt="Aymen's Projects" width="130" height="60" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-2xl bigText font-black  text-blue-950  lg:text-l md:text-l ">
          Hey, hello 👋
        </span>
        <span className="text-base text-slate-500">
          Enter your login credentials you created while registering .
        </span>
      </div>
      {/* Form */}
      <form
        className="space-y-6 xl:w-9/12 py-6 lg:w-full md:w-full ms:w-full "
        action="#"
        method="POST"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold leading-6 text-blue-950"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-bold leading-6 text-blue-950"
            >
              Password
            </label>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-blue-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gradient-to-r from-purple-500 from-10% via-30% to-90% to-sky-500 via-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
          <div className="py-6 flex flex-row items-center w-full justify-between ">
            <hr className="w-2/5" />
            <span className="text-base text-gray-600"> or</span>
            <hr className="w-2/5" />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center gap-2 items-center rounded-md ring-1 ring-inset ring-gray-300 bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-blue-950 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Image
              src="/google.png"
              alt="Aymen's Projects"
              width="20"
              height="20"
            />
            Sign in with Google
          </button>
        </div>
      </form>
    </>
  );
}

export default page;

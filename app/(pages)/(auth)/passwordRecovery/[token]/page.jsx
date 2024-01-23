"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
function page({ params }) {
  const { token } = params;
  const [error, setError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [RepeatedPasswordMatch, setRepeatedPasswordMatch] = useState(true);
  const handleTokenChecking = async () => {
    setLoading(true);
    await fetch(`/api/passwordRecovery/${token}`, { method: "GET" }).then(
      async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          setLoading(false);
          setError(false);
        } else {
          setError(true);
          setLoading(false);
          toast.error(data.error || "Token is Invalid", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return setTimeout(
            () => window.location.replace(`/passwordRecovery/`),
            5000
          );
        }
      }
    );
  };
  const handlePassReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    await fetch(`/api/passwordRecovery/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPass: password,
      }),
    }).then(async (res) => {
      setLoading(false);
      setError(false);

      if (res.status === 200) {
        toast.success("Password Updated successfully !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return setTimeout(() => window.location.replace(`/login/`), 3000);
      } else {
        setError(true);
        setLoading(false);
        const error = await res.json();
        toast.error(error.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  useEffect(() => {
    handleTokenChecking();
  }, []);
  return Loading || error ? (
    <div className="static">
      <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center">
        <ScaleLoader color="#172554" />
      </div>
    </div>
  ) : (
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
          Enter your new password .
        </span>
      </div>
      {/* Form */}
      <form
        className="space-y-6  py-6 lg:w-full md:w-full ms:w-full "
        onSubmit={handlePassReset}
        method="POST"
      >
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-bold leading-6 text-blue-950"
          >
            New password
          </label>
          <div className="mt-2">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="repeatedPassword"
            className="block text-sm font-bold leading-6 text-blue-950"
          >
            Repeat your password
          </label>
          <div className="mt-2">
            <input
              id="repeatedPassword"
              name="repeatedPassword"
              type="password"
              autoComplete="repeated-password"
              onBlur={(e) => {
                if (e.target.value !== password) {
                  return setRepeatedPasswordMatch(false);
                } else {
                  return setRepeatedPasswordMatch(true);
                }
              }}
              required
              className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <span
            className={`${
              RepeatedPasswordMatch ? "hidden " : "inline-flex "
            } items-center rounded-md bg-red-50 px-2 mt-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10`}
          >
            Repeated Password doesn't match the entered password !
          </span>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gradient-to-r from-purple-500 from-10% via-30% to-90% to-sky-500 via-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset Password
          </button>
        </div>
      </form>
      <div className=" flex flex-row items-center w-full justify-between ">
        <hr className="w-2/5" />
        <span className="text-base text-gray-600"> or</span>
        <hr className="w-2/5" />
      </div>
      <div className=" flex flex-col items-center w-full justify-between ">
        <span className="text-base text-slate-500">
          You don't have an account yet ?{" "}
        </span>
        <a
          href="/register"
          className="text-base font-semibold text-blue-600 hover:text-indigo-500"
        >
          Register now
        </a>
      </div>
    </>
  );
}

export default page;

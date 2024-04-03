"use client";
import { useState } from "react";
import Image from "next/image";
import { TbFaceIdError } from "react-icons/tb";
import { ScaleLoader } from "react-spinners";
import { toast } from "react-toastify";
function page() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleEmailSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    await fetch("/api/passwordRecovery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        toast.success("Email sent successfully !", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setError(true);
        setLoading(false);
        const error = await res.json();
        toast.error(error.error, {
          position: "top-center",
          autoClose: 5000,
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
          Enter your email to proceed with your password recovery.
        </span>
      </div>
      {/* Form */}
      <form
        className="space-y-6  py-6 lg:w-full md:w-full ms:w-full "
        onSubmit={handleEmailSend}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {/* In Case the login Failed */}
        <span
          className={`${
            error ? "inline-flex" : "hidden"
          }  items-center rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10`}
        >
          <TbFaceIdError className="h-10 w-10 mr-2 " /> The email and password
          combination provided does match, please enter a valid email address
          and password
        </span>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gradient-to-r from-purple-500 from-10% via-30% to-90% to-sky-500 via-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send Email
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
      {loading ? (
        <div className="static">
          <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center">
            <ScaleLoader color="#172554" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default page;

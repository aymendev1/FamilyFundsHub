"use client";
import { useState } from "react";
import Image from "next/image";
import { TbFaceIdError } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

function page() {
  const [FullName, setFullName] = useState("");
  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [RepeatedPasswordMatch, setRepeatedPasswordMatch] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: FullName,
        email: email,
        password: password,
        username: UserName,
        role: 1,
      }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        // If registered correctly , we sign the user in
        const login = await signIn("credentials", {
          ...{ email: email, password: password },
          redirect: false,
        });
      } else {
        setError(true);
        const error = await res.json();
        setErrorMessage(error.error);
      }
    });
  };
  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const login = await signIn("google", { redirect: false });
      if (login.status !== 200) {
        setLoading(false);
        setError(true);
      }
    } catch (e) {
      console.log(e);
    }
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
          Please fill in the form below .
        </span>
      </div>
      {/* Form */}
      <form
        className="space-y-6  py-3 lg:w-full md:w-full ms:w-full "
        onSubmit={handleRegister}
        method="POST"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="Fullname"
              className="block text-sm font-bold leading-6 text-blue-950"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="fullName"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-bold leading-6 text-blue-950"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="userName"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold leading-6 text-blue-950"
            >
              Password
            </label>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        </div>
        <span
          className={`${
            error ? "inline-flex" : "hidden"
          }  items-center rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10`}
        >
          <TbFaceIdError className="h-10 w-10 mr-2 " /> {errorMessage}
        </span>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gradient-to-r from-purple-500 from-10% via-30% to-90% to-sky-500 via-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
        <div className=" flex flex-row items-center w-full justify-between ">
          <hr className="w-2/5" />
          <span className="text-base text-gray-600"> or</span>
          <hr className="w-2/5" />
        </div>
        <button
          onClick={handleGoogleAuth}
          className="flex w-full justify-center gap-2 items-center rounded-md ring-1 ring-inset ring-gray-300 bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-blue-950 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FcGoogle className="h-7 w-7" />
          Register with Google
        </button>
      </form>
      <div className=" flex flex-col items-center w-full justify-between ">
        <span className="text-base text-slate-500">
          You already have an account yet ?{" "}
        </span>
        <a
          href="/login"
          className="text-base font-semibold text-blue-600 hover:text-indigo-500"
        >
          Login now
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

"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
function layout({ params }) {
  const { token } = params;
  const [Loading, setLoading] = useState(false);
  const [role, setRole] = useState(0);
  const [data, setData] = useState(false);

  const { data: session, update } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.replace("/login");
    },
  });

  const handleTokenChecking = async () => {
    setLoading(true);
    if (session?.user?.familyId) {
      window.location.replace("/dashboard");
    }
    await fetch(`/api/invite/${token}`, { method: "GET" }).then(async (res) => {
      const data = await res.json();
      if (res.status === 200) {
        setData(data);
        setLoading(false);
      } else if (res.status === 404) {
        return window.location.replace("/404");
      } else {
        setLoading(false);
        toast.error(data.error || "Invite is Invalid", {
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
  const handleAcceptInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/invite/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
      }),
    }).then(async (res) => {
      const msg = await res.json();

      if (res.status === 200) {
        await update({ session, user: { ...session?.user, familyId: msg.id } });
        toast.success(msg.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.replace("/dashboard");
      } else {
        setLoading(false);
        return toast.error(msg, {
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
    handleTokenChecking();
    document.title = "Invite ";
  }, []);
  return !session || Loading ? (
    <ComponentLoader />
  ) : (
    <div className="bg-white h-screen overflow-hidden">
      {" "}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Family Funds Hub
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              You have been invited to join the <b> {data.name}</b> group
            </p>
            <div className="mt-8 flex flex-col gap-2 items-center justify-center gap-x-6">
              <label
                htmlFor="role"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select your role in the family :
              </label>

              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                autoComplete="role-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="0">Parent</option>
                <option value="1">Child</option>
              </select>
            </div>
            <div className="mt-8 flex flex-col gap-8 items-center justify-center">
              <button
                type="submit"
                onClick={handleAcceptInvite}
                className="flex-none rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Accept Invite
              </button>{" "}
              <a
                href="#"
                onClick={signOut}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log Out <span aria-hidden="true"> → </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}

export default layout;

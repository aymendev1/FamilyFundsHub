"use client";
import { useSession } from "next-auth/react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { BsShieldLockFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
function layout({ children }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.replace("/login");
    },
  });
  return !session ? (
    <ComponentLoader />
  ) : session?.user?.role === 0 ? (
    <>{children}</>
  ) : (
    <>
      {" "}
      <div className="flex flex-col justify-center items-center pt-5 gap-3 h-full">
        <BsShieldLockFill className="w-[50px] h-[50px] text-blue-950 " />
        <span className="text-xl max-sm:text-lg font-black  text-blue-950">
          Access Denied !
        </span>
        <span className="text-sm  text-slate-700">
          Please make sure that you are accessing the correct transaction
          details !
        </span>
        <span className="text-sm  text-slate-700">
          Only Family Admins [ Parents ] can access the following resources
        </span>
      </div>
    </>
  );
}

export default layout;

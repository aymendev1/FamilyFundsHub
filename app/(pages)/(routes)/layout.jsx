"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
function layout({ children }) {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.replace("/login");
    },
  });
  useEffect(() => {
    console.log(session);
  });
  return !session ? (
    <ComponentLoader />
  ) : (
    <div className="w-full h-screen flex bg-blue-50 ">
      <Sidebar />
      <section className=" w-full min-h-full py-6 px-10 max-lg:px-8 max-md:px-5 overflow-scroll overflow-x-hidden scroll-smooth">
        {children}
      </section>
    </div>
  );
}

export default layout;

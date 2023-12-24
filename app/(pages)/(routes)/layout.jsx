"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
function layout({ children }) {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.replace("/login");
    },
  });
  return !session ? (
    <ComponentLoader />
  ) : (
    <Provider store={store}>
      <div className="w-full h-screen flex bg-blue-50 ">
        <Sidebar />
        <section className=" w-full min-h-full py-6 px-10 max-lg:px-8 max-md:px-5 overflow-scroll overflow-x-hidden scroll-smooth">
          {children}
        </section>
      </div>
    </Provider>
  );
}

export default layout;

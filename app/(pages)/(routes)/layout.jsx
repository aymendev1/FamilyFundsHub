"use client";
import Sidebar from "../../components/sidebar/sidebar";
import { useSession } from "next-auth/react";
import ComponentLoader from "@/app/components/loadings/ComponentLoader";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
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
  ) : (
    <>
      <Provider store={store}>
        <div className="w-full h-screen flex bg-blue-50 ">
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
          <Sidebar />
          <section className=" w-full min-h-full py-6 px-10 max-lg:px-8 max-md:px-5 overflow-scroll overflow-x-hidden scroll-smooth">
            {children}
          </section>
        </div>
      </Provider>
    </>
  );
}

export default layout;

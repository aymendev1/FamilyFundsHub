import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
function layout({ children }) {
  return (
    <div className="w-full h-screen flex bg-blue-50 ">
      <Sidebar />
      <section className=" w-full min-h-full py-6 px-10 max-lg:px-8 max-md:px-5 overflow-scroll overflow-x-hidden scroll-smooth">
        {children}
      </section>
    </div>
  );
}

export default layout;

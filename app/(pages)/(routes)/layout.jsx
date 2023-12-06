import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
function layout({ children }) {
  return (
    <div className="w-full h-screen flex bg-blue-50 ">
      <Sidebar />
      <section className=" w-full min-h-full py-6 max-xl:px-5 px-10 overflow-scroll overflow-x-hidden scroll-smooth">
        {children}
      </section>
    </div>
  );
}

export default layout;

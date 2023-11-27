import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
function layout({ children }) {
  return (
    <div className="w-full h-screen flex bg-blue-50 ">
      <Sidebar />
      <section className=" w-full min-h-full py-6 px-10">{children}</section>
    </div>
  );
}

export default layout;

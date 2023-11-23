import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
function layout({ children }) {
  return (
    <div className="w-full h-screen flex bg-blue-50 ">
      <Sidebar />
    </div>
  );
}

export default layout;

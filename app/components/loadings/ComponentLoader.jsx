import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-blue-50">
      <ScaleLoader color="#172554" />
    </div>
  );
};

export default Loader;

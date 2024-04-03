import React from "react";
import { ScaleLoader } from "react-spinners";

export default function ComponentLoader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-blue-50">
      <ScaleLoader color="#172554" />
    </div>
  );
}

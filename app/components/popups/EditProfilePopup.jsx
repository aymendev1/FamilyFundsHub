"use client";
import React from "react";

export default function EditProfilePopup() {
  return (
    <div className="bg-slate-100/50 h-[100vh] w-[100vw] fixed  top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div className="bg-white h-[50%] w-[50%] rounded-lg p-4">
        {/* Header */}
        <div>
          <span class="text-xl  font-black  text-blue-950">Edt Profile</span>
        </div>
      </div>
    </div>
  );
}

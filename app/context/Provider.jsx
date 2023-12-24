"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

function CustomizedProvider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default CustomizedProvider;

import React from "react";
import Navbar from "@/components/Navbar";

const accountLayout = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
};

export default accountLayout;

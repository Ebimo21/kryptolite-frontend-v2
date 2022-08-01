import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navbar />
      {/* Fixed navbar space */}
      <div className="h-[56px] invisible" />
      <main>{props.children}</main>
      <Footer />
    </React.Fragment>
  );
}

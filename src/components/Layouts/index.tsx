import React from "react";
import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </Fragment>
  );
}

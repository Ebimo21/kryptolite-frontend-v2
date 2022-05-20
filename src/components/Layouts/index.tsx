import React from "react";
import { Fragment } from "react";
import Navbar from "./Navbar";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Navbar />
      {props.children}
    </Fragment>
  );
}

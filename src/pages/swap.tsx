import React, { Fragment } from "react";
import SEO from "../components/SEO";
import Swap from "../views/Swap";

export default function SwapPage() {
  return (
    <Fragment>
      <SEO title="Swap" description="Trade tokens in an instant" />
      <Swap />
    </Fragment>
  );
}

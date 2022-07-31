import React, { Fragment } from "react";
import SEO from "../components/SEO";
import Swap from "../views/Swap";
import previewImages from "../images/kryptolite-swap-preview-image.jpg";

export default function SwapPage() {
  return (
    <Fragment>
      <SEO title="Swap" description="Trade tokens in an instant" image={previewImages} />
      <Swap />
    </Fragment>
  );
}

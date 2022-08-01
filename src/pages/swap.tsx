import React, { Fragment } from "react";
import SEO from "../components/SEO";
import Swap from "../views/Swap";
import previewOgImags from "../../static/images/kryptolite-swap-og-image.jpg";
import previewTwitterImags from "../../static/images/kryptolite-swap-twitter-preview-image.jpg";

export default function SwapPage() {
  return (
    <Fragment>
      <SEO
        title="Swap"
        description="Trade tokens in an instant"
        image={{ og: previewOgImags, twitter: previewTwitterImags }}
      />
      <Swap />
    </Fragment>
  );
}

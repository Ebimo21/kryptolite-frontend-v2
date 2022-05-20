import React from "react";
import { StaticImage } from "gatsby-plugin-image";

export default function Logo() {
  return (
    <StaticImage
      src="../images/icon.png"
      alt="Tteb Logo"
      width={50}
      placeholder="blurred"
    />
  );
}

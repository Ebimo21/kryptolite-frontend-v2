import React from "react";
import useHttpLocations from "../../hooks/useHttpLocations";
import Logo from "./";

export default function ListLogo({
  logoURI,
  style,
  alt,
}: {
  logoURI: string;
  size?: string;
  style?: React.CSSProperties;
  alt?: string;
}) {
  const srcs: string[] = useHttpLocations(logoURI);

  return <Logo alt={alt} width={24} height={24} srcs={srcs} style={style} />;
}

import React from "react";
import Button from "../../Buttons/Button";
import { ButtonProps, PolymorphicComponent } from "../../Buttons/types";

import { ButtonMenuItemProps } from "./types";

interface InactiveButtonProps extends ButtonProps {
  forwardedAs: ButtonProps["as"];
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, "button"> = (props) => <Button {...props} />;

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, "button"> = ({
  isActive = false,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButton forwardedAs={as} {...props} />;
  }

  return <Button as={as} {...props} />;
};

export default ButtonMenuItem;

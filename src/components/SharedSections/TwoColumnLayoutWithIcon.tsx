import React from "react";
import cls from "classnames";

interface ComponentProps {
  left?: boolean;
  heading: string;
  body: React.ReactNode;
  image: JSX.Element;
}
export default function TwoColumnLayoutWithIcon({
  left = false,
  heading,
  body,
  image,
}: ComponentProps) {
  const position = left
    ? "flex-row text-left md:flex-row-reverse md:text-right"
    : "flex-row text-left";
  return (
    <div
      className={cls(
        "flex justify-between items-center p-2 bg-white gap-3 w-full",
        position
      )}
    >
      <div>{image}</div>
      <div>
        <div className="font-bold my-2">{heading}</div>
        <p className="text-sm">{body}</p>
      </div>
    </div>
  );
}
